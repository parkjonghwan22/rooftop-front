import { ethers } from 'ethers'
import TokenABI from '@contracts/RTToken.json'
import { useMarket } from '@utils/hooks/useMarket'
import { useEthers } from '@utils/hooks/useEthers'
import 'react-toastify/dist/ReactToastify.css'
import request from '@utils/request'
import { useDecode } from '@utils/hooks/useDecode'



export const useMint = (collectionAddress: string) => {
    const { signer } = useEthers()
    const { market } = useMarket()
    const { decodeMinted } = useDecode()


    const mintNFT = async (tokenURI: string) => {
        if (!signer || !tokenURI) return

        try {
            const instance = await new ethers.Contract(collectionAddress, TokenABI.abi, signer)
            const mintPrice = await instance.mint_price()
            const account = await signer.address

            const mintTx = await instance._minting(tokenURI, {
                value: mintPrice,
                from: account,
            })
            const receipt = await mintTx.wait()
            const latestTokenId = await instance.getLatestTokenId()
            return latestTokenId
        } catch (e: unknown) {
            console.log(e as Error)
        }
    }

    interface NFTProps {
        collectionAddress : string
        latestTokenId : number
        price : number | string
        metaData: string
        royalty: string
    }

    const listNFT = async ({ collectionAddress, latestTokenId, price, metaData, royalty }: NFTProps) => {
        if (!market) return
        const priceInWei = ethers.parseEther(price.toString()); // 10 ** 18

        try {
            // const gasPrice = ethers.parseUnits('20000', 'gwei');
            const creatorFee = parseFloat(royalty.replace('%', '')) * 10
            const addOnMarket = await market.addNftToMarket(
                collectionAddress,
                latestTokenId,
                priceInWei,
                metaData,
                creatorFee
            )
            const receipt = await addOnMarket.wait()
            if (receipt.logs) {
                const decodedData = decodeMinted(receipt, collectionAddress)
                const response = await request.post("event/minted", {
                    ...decodedData,
                });
                return response
            }
        } catch (e) {
            console.log(e)
        }
    }


    return { mintNFT, listNFT }
}
