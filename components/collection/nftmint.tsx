import { ethers } from 'ethers'
import TokenABI from '@contracts/RTToken.json'
import { useMarket } from '@utils/hooks/useMarket'
import { useState, useEffect } from 'react'
import { useEthers } from '@utils/hooks/useEthers'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '@components/common/button'
import { LoadingSpinner } from '@components/common/loading/loading'

interface MintProps {
    metaData: string
    collectionAddress: string
    royalty: string
    price: number | string
    children: string | React.ReactNode
}

export const NFTMint = ({ collectionAddress, royalty, metaData, price, children }: MintProps) => {
    const { market } = useMarket()
    const { signer } = useEthers()
    const [latestTokenId, setLatestTokenId] = useState<number>()
    const [isLoading, setIsLoading] = useState(false)

    const handleMint = async () => {
        if (!signer) return

        try {
            const instance = await new ethers.Contract(collectionAddress, TokenABI.abi, signer)
            const mintPrice = await instance.mint_price()
            const account = await signer.address

            const mintTx = await instance._minting(metaData, {
                value: mintPrice,
                from: account,
            })

            const receipt = await mintTx.wait()
            const newTokenId = await instance.getLatestTokenId()
            if (newTokenId) setLatestTokenId(newTokenId)
        } catch (e: unknown) {
            console.log(e as Error)
        }
    }

    const tokenOnMarket = async (price: string | number) => {
        if (!latestTokenId) return
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
            console.log(addOnMarket)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (!market || !signer) return
    }, [market, signer])

    useEffect(() => {
        if (latestTokenId) {
            tokenOnMarket(price)
        }
    }, [latestTokenId])

    return (
        <Button color="green" onClick={handleMint}>
            {isLoading ? <LoadingSpinner /> : null}
            {isLoading ? 'Pending...' : children}
        </Button>
    )
}
