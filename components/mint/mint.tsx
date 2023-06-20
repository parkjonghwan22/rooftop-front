import { ethers } from 'ethers'
import TokenABI from '@contracts/RTToken.json';
import { useMarket } from '@utils/hooks/useMarket'
import { useState, useEffect } from 'react'
import { useEthers } from '@utils/hooks/useEthers';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface MintProps {
    collectionAddress: string
    royalty: string
}

export const Mint = ({ collectionAddress, royalty }: MintProps) => {

    const { market } = useMarket()
    const { signer } = useEthers()
    const [latestTokenId, setLatestTokenId] = useState()
    const [metaData, setMetaData] = useState('')

    const pending = () => toast.info('Image Uploading...')
    const success = () => toast.success('Image Uploaded!')

    const handleClick = async () => {
        if (!signer) return

        const instance = await new ethers.Contract(collectionAddress, TokenABI.abi, signer)
        console.log(instance)
        const mintPrice = await instance.mint_price()
        const account = await signer.address

        const mintTx = await instance._minting(
            'http://127.0.0.1:3005/profile-picture_1686726038443.gif',
            {
                value: mintPrice,
                from: account,
            }
        )
        console.log(mintTx)
        const receipt = await mintTx.wait()
        console.log(receipt)

        const newTokenId = await instance.getLatestTokenId()
        console.log(`lastTokenId::`, newTokenId)

        if (newTokenId) setLatestTokenId(newTokenId)

        const tokenURI = await instance.tokenURI(newTokenId)
        setMetaData(tokenURI)

        const ownerOf = await instance.ownerOf(newTokenId)
        console.log(`ownerOf::`, ownerOf)
        console.log(`mintPrice`, mintPrice)

        // const approval = await instance.setApprovalForAll(marketAddress, true)
        // console.log(`approval::`, approval)
    }

    const handleClick2 = async () => {
        if (!latestTokenId) return

        try {
            // const gasPrice = ethers.parseUnits('20000', 'gwei');
            const creatorFee = parseFloat(royalty.replace('%', '')) * 10
            const addOnMarket = await market.addNftToMarket(
                collectionAddress,
                latestTokenId,
                4,
                metaData,
                creatorFee
            )
            console.log(`addOnMarket::`, addOnMarket)

            const getNFTs = await market.getAllTokensInCollection(collectionAddress)
            console.log(`getNFTs::`, getNFTs)
            for (const id in getNFTs) console.log(getNFTs[id])

            const testMarket2 = await market.lowestPriceByCollection(collectionAddress)
            console.log(`test2::`, testMarket2)

            const testMarket3 = await market.totalSalesByCollection(collectionAddress)
            console.log(`test3::`, testMarket3)
            console.log(`collectionAddress::`, collectionAddress)

            const testMarket1 = await market.marketAddress()
            console.log(`test1::`, testMarket1)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(()=> {
        if (!market) return
        market.lowestPriceByCollection(collectionAddress).then(console.log).catch(console.log)

        // market.TokenOnSale(1).then(console.log).catch((err : Error)=> console.log(`err:::`, err))
    }, [market])

    return (
        <>
            <button onClick={handleClick}>minting</button>
            <button onClick={handleClick2}>handler2</button>
        </>
    )
}
