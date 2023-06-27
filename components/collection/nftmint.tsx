import { ethers } from 'ethers'
import TokenABI from '@contracts/RTToken.json'
import { useMarket } from '@utils/hooks/useMarket'
import { useState, useEffect } from 'react'
import { useEthers } from '@utils/hooks/useEthers'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '@components/common/button'
import { LoadingSpinner } from '@components/common/loading/loading'
import request from '@utils/request'





interface MintProps {
    metaData: string
    collectionAddress: string
    royalty: string
    price: number | string
    children: string | React.ReactNode
}

export const NFTMint = ({ collectionAddress, royalty, metaData, price, children }: MintProps) => {
    const { market, decodeEvent, getLowestPrice } = useMarket()
    const { signer } = useEthers()
    const [latestTokenId, setLatestTokenId] = useState<number>()
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

            // const receipt = await mintTx.wait()
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
            const receipt = await addOnMarket.wait()
            if (receipt.logs) {
                const data = decodeEvent(receipt.logs[0].topics[0], receipt.logs[0].data);
                if (data) {
                    const decodedData = {
                        id: Number(data[0]),
                        from: receipt.from,
                        to: receipt.to,
                        NFTaddress: collectionAddress,
                        tokenId: Number(data[3]),
                        price: Number(data[4]),
                        event: "minted"
                    };
                    console.log(decodedData)

                    const response = await request.post("event/minted", {
                        ...decodedData,
                    });
                    if (response.statusText === "Created")
                        alert("성공적으로 등록되었습니다") // alert 필요
                    setIsLoading(false)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const updateFloorPrice = async (address: string) => {

        const currentFloor = await getLowestPrice(address)
        if (!currentFloor || currentFloor <= Number(price)) return
        console.log(currentFloor)
    
        const { data } = await request.put("collection/update", {
            address,
            floorPrice: Number(price),
        })
        console.log(data)
    }

    useEffect(() => {
        if (latestTokenId) {
            tokenOnMarket(price)
            updateFloorPrice(collectionAddress)
        }
    }, [latestTokenId])

    return (
        <Button color="green" onClick={handleMint}>
            {isLoading ? <LoadingSpinner /> : null}
            {isLoading ? 'Pending...' : children}
        </Button>
    )
}
