import { ethers } from 'ethers'
import TokenABI from '@contracts/RTToken.json'
import { useMarket } from '@utils/hooks/useMarket'
import { useState, useEffect } from 'react'
import { useEthers } from '@utils/hooks/useEthers'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '@components/common/button'
import { LoadingSpinner } from '@components/common/loading'
import request from '@utils/request'
import { useDecode } from '@utils/hooks/useDecode'


interface MintProps {
    metaData: string
    collectionAddress: string
    royalty: string
    price: number | string
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    children: string | React.ReactNode
}

export const NFTMint = ({ collectionAddress, royalty, metaData, price, setIsOpenModal, children }: MintProps) => {
    const { market } = useMarket()
    const { decodeMinted } = useDecode()
    const { signer } = useEthers()
    const [isLoading, setIsLoading] = useState(false)

    const handleMint = async () => {
        if (!signer) return

        try {
            setIsLoading(true)
            const instance = await new ethers.Contract(collectionAddress, TokenABI.abi, signer)
            const mintPrice = await instance.mint_price()
            const account = await signer.address

            const mintTx = await instance._minting(metaData, {
                value: mintPrice,
                from: account,
            })
            const receipt = await mintTx.wait()
            const latestTokenId = await instance.getLatestTokenId()
            if (latestTokenId) {
                toast.success("NFT Minted Successfully")
            }
            await tokenOnMarket(price, latestTokenId)
        } catch (e: unknown) {
            console.log(e as Error)
        }
    }

    const tokenOnMarket = async (price: string | number, latestTokenId: number) => {
        if (!latestTokenId || !market) return
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
                if (response.statusText === "Created") {
                    toast.success("Your NFT Listed on Market")
                    setIsOpenModal(false)
                }
                setIsLoading(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Button color="green" onClick={handleMint}>
            {isLoading ? <LoadingSpinner /> : null}
            {isLoading ? 'Pending...' : children}
        </Button>
    )
}
