import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TokenData } from "@utils/types/nft.interface"
import { Icon } from '@iconify/react';
import { useIpfs } from '@utils/hooks/useIpfs';
import request from '@utils/request';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { useQueryClient } from "react-query";
import { LoadingSpinner } from '@components/common/loading';
import { CartType } from '@utils/types/user.interface';

interface NFTCardProps {
    token: TokenData,
    isSelected: boolean
}

export const NFTCard = ({ token, isSelected }: NFTCardProps) => {
    const { address } = useAccount()
    const queryClient = useQueryClient();
    const router = useRouter();
    const { _id } = router.query;
    const { metaData, imageUrl, isLoading } = useIpfs(token)
    const [isCartLoading, setIsCartLoading] = useState(false)
    const [remainingTime, setRemainingTime] = useState(0)
    
    const handleAddToCart = async () => {
        try {
            if (!address) return
            setIsCartLoading(true)
            const checkResponse = await request.post('cart/checkDuplicate', {
                shopper: address,
                id: token.id
            });
            if (checkResponse.data.id) {
                alert("이미 해당 NFT를 장바구니에 담았습니다.") // alert 필요
                setIsCartLoading(false)
                return;
            }

            const { data } = await request.post('cart/add', {
                shopper: address,
                seller: token.seller,
                id: token.id,
                NFTaddress: token.NFTaddress,
                tokenId: token.tokenId,
                price: token.price,
                metadata: token.metadata
            })
            if (data) {
                queryClient.setQueryData('cart', (prevData: CartType[] | undefined) => {
                    if (prevData) {
                        return [...prevData, data];
                    }
                    return [data];
                });
                setIsCartLoading(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const endTime = token.auctionEndTime * 1000
        // console.log(endTime)
        const currentTime = new Date().getTime()
        // console.log(currentTime)
        if(endTime > currentTime) {
            const AuctionTime = Math.floor((endTime-currentTime) / (1000))
            const Time = Math.floor(AuctionTime / 60)
            setRemainingTime(Time)
        }
    }, [token])

    if (isLoading) return <LoadingSpinner />
    return (
        <div className={`w-64 mb-10 mx-5 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 relative 
            ${isSelected && "border-4 border-green-500"}`}>
            <div className="px-3 py-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">#{token.tokenId}</p>
                <h1 className="text-xl font-bold text-gray-800 uppercase whitespace-nowrap overflow-hidden text-ellipsis dark:text-white pl-4 py-1">
                    {metaData?.name}
                </h1>
            </div>
            {token.openingPrice !== 0 && (
                <div className="absolute top-2 right-2 text-white bg-purple-600 px-2 py-1 rounded-lg text-xs font-semibold">
                    {remainingTime} 분 후 경매종료
                </div>
            )}
            <Link href={`/collections/${_id}/nft?id=${token.id}`}>
                <Image
                    src={metaData ? imageUrl : 'https://dummyimage.com/480x480/ccc/000'}
                    alt="nft image"
                    width={480}
                    height={480}
                    className="object-cover w-full h-48 hover:scale-105 transition-transform duration-300"
                />
            </Link>
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                <h1 className="text-lg font-bold text-white flex items-center">
                    <Icon icon="cryptocurrency-color:matic" className="mr-1" />
                    {token.price / 10 ** 18}
                </h1>
                {!token.sold && address !== token.seller &&
                    <button onClick={handleAddToCart} className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-150 transform bg-red-500 rounded hover:bg-gray-600 focus:bg-gray-700 focus:outline-none">
                        {isCartLoading ? <LoadingSpinner /> : `Add to cart`}
                    </button>}
                {token.sold && <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-150 transform bg-gray-500 rounded focus:outline-none disabled">Sold Out</button>}
            </div>
        </div>
    )
}
