import { ethers } from 'ethers'
import MarketABI from '@contracts/Marketplace.json';
import TokenABI from '@contracts/LTToken.json';
import { useMarket } from '@utils/hooks/useMarket';
import { useState } from 'react';


interface MintProps {
    collectionAddress: string
    royalty: string
}

export const Mint = ({ collectionAddress, royalty }: MintProps) => {
    const network = 'http://localhost:8545';
    const provider = new ethers.JsonRpcProvider(network);
    const { market, marketAddress } = useMarket()
    const [latestTokenId, setLatestTokenId] = useState()
    const [metaData, setMetaData] = useState("")



    const handleClick = async () => {
        const signer = await provider.getSigner();
        const instance = await new ethers.Contract(collectionAddress, TokenABI.abi, signer);
        console.log(instance)
        const mintPrice = await instance.mint_price();
        const account = await signer.address;

        const mintTx = await instance._minting("http://127.0.0.1:3005/profile-picture_1686726038443.gif", {
            value: mintPrice,
            from: account,
        });
        console.log(mintTx)
        const receipt = await mintTx.wait();
        console.log(receipt)

        const lastTokenId = await instance.getLatestTokenId()
        console.log(`lastTokenId::`, lastTokenId)
        if (lastTokenId) setLatestTokenId(lastTokenId)

        const tokenURI = await instance.tokenURI(lastTokenId)
        setMetaData(tokenURI)


        const ownerOf = await instance.ownerOf(lastTokenId)
        console.log(`ownerOf::`, ownerOf)
        console.log(`mintPrice`, mintPrice)

        const approval = await instance.setApprovalForAll(marketAddress, true)
        console.log(`approval::`, approval)


    }

    const handleClick2 = async () => {
        try {


            // const gasPrice = ethers.parseUnits('20000', 'gwei');
            const creatorFee = parseFloat(royalty.replace("%", "")) * 10;
            const addOnMarket = await market.addNftToMarket(collectionAddress, latestTokenId, 5, metaData, creatorFee)
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
        } catch (e) { console.log(e) }
    }

    return (
        <>
            <button onClick={handleClick}>
                minting
            </button>
            <button onClick={handleClick2}>
                handler2
            </button>
        </>
    )
}
