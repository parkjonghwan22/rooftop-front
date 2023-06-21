import { ethers } from 'ethers'
import TokenABI from '@contracts/RTToken.json'
import { useMarket } from '@utils/hooks/useMarket'
import { useState, useEffect } from 'react'
import { useEthers } from '@utils/hooks/useEthers'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface MintProps {
    tokenURI: string
    collectionAddress: string
    royalty: string
    tokenPrice: number | string
}

export const useMint = ({ collectionAddress, royalty, tokenURI, tokenPrice }: MintProps) => {
    const { market } = useMarket()
    const { signer } = useEthers()
    const [latestTokenId, setLatestTokenId] = useState<number>()
    const [metaData, setMetaData] = useState<string>('')
    const [newToken, setNewToken] = useState<string>('')

    const minting = async (tokenMetadata: string) => {
        if (!signer) return

        try {
            const instance = await new ethers.Contract(collectionAddress, TokenABI.abi, signer)
            const mintPrice = await instance.mint_price()
            const account = await signer.address

            const mintTx = await instance._minting(tokenMetadata, {
                value: mintPrice,
                from: account,
            })

            const receipt = await mintTx.wait()
            const newTokenId = await instance.getLatestTokenId()
            if (newTokenId) setLatestTokenId(newTokenId.toNumber())

            const tokenURI = await instance.tokenURI(newTokenId)
            setMetaData(tokenURI)
        } catch (e: unknown) {
            console.log(e as Error)
        }
    }

    const tokenOnMarket = async (price: number | string) => {
        if (!latestTokenId) return

        try {
            // const gasPrice = ethers.parseUnits('20000', 'gwei');
            const creatorFee = parseFloat(royalty.replace('%', '')) * 10
            const addOnMarket = await market.addNftToMarket(
                collectionAddress,
                latestTokenId,
                price,
                metaData,
                creatorFee
            )

            if (addOnMarket.hash) setNewToken(addOnMarket.hash)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (!market || !signer) return
        market.lowestPriceByCollection(collectionAddress).then(console.log).catch(console.log)
        minting(tokenURI)
    }, [market, signer])

    useEffect(() => {
        if (metaData && latestTokenId && tokenPrice) {
            tokenOnMarket(tokenPrice)
        }
    }, [metaData, latestTokenId, tokenPrice])

    return { newToken }
}
