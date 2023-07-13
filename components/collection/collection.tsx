import Image from 'next/image'
import { CollectionData, TokenData } from '@utils/types/nft.interface'
import { NFTCard } from './nftcard'
import { CollectionStat } from './styled/collection.styled'
import { VerifiedMarker } from '@components/common/marker/verify'
import { CollectionSweeper } from './collectionsweeper'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { Icon } from '@iconify/react'
import request from '@utils/request'
import { useQueryClient } from 'react-query'
import { LoadingSpinner } from '@components/common/loading'
import { AirdropSweeper } from '@components/airdrop/airdropsweeper'
import { Button } from '@components/common/button'

interface CollectionProps {
    collectionData: CollectionData
    tokenData: TokenData[]
}
interface BannerProps {
    collectionData: CollectionData
    totalItems: number
    isCreator: boolean
}

export const Collection = ({ collectionData, tokenData }: CollectionProps) => {
    const { address } = useAccount()
    const isCreator = address === collectionData?.creator

    return (
        <>
            {collectionData && address && (
                <CollectionBanner
                    collectionData={collectionData}
                    totalItems={tokenData ? tokenData.length : 0}
                    isCreator={isCreator}
                />
            )}
            {tokenData && <NFTList tokenData={tokenData} isCreator={isCreator} />}
        </>
    )
}

export const CollectionBanner = ({ collectionData, totalItems, isCreator }: BannerProps) => {
    const { address } = useAccount()
    const [isCollectionLoading, setIsCollectionLoading] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const followHandler = async () => {
        if (!address) return

        try {
            setIsCollectionLoading(true)
            const { data } = await request.post(`collection/follow`, {
                address,
                collection_address: collectionData.address,
            })

            if (data) {
                setIsFavorite((prevState) => !prevState);
                setIsCollectionLoading(false)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (collectionData.favorite.includes(`${address}`)) {
            setIsFavorite(true)
        }
    }, [address, collectionData])

    return (
        <div className="relative flex flex-col mb-8 items-center rounded-[20px] w-10/12 mx-auto p-4 bg-white dark:bg-gray-900 bg-clip-border shadow-lg dark:!bg-navy-800 dark:text-white">
            <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                <img
                    src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                    className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
                />
                {!isCreator &&
                    <div className="absolute w-[44px] h-[44px] bg-white dark:bg-gray-800 rounded-full right-[2%] top-[10%]">
                        <div className="pt-1.5">
                            {isCollectionLoading ?
                                <div className="flex text-center justify-center pt-1.5 pl-3.5">
                                    <LoadingSpinner />
                                </div> :
                                <div className="flex items-center justify-center text-center">
                                    <div onClick={() => followHandler()}>
                                        <Icon
                                            icon={isFavorite ? "noto-v1:star" : "fluent:star-add-24-regular"}
                                            className="text-gray-700 dark:text-gray-200 cursor-pointer text-[30px]"
                                        />
                                    </div>
                                </div>}
                        </div>
                    </div>
                }
                <div className="absolute -bottom-12 flex h-[120px] w-[120px] items-center justify-center rounded-full border-[4px] border-white bg-red-400 dark:!border-navy-700">
                    <Image src={collectionData.logo} alt="logo" width={1000} height={1000} className="h-full w-full rounded-full" />
                </div>
            </div>

            <div className="mt-16 flex flex-col items-center">
                <div className="flex items-center mb-1 ml-4">
                    <h4 className="text-xl font-bold text-navy-700 dark:text-white mr-1">
                        {collectionData.name}
                    </h4>
                    {collectionData.verified && <VerifiedMarker />}
                </div>
                <p className="text-base font-normal text-gray-500">{collectionData.description}</p>
            </div>
            <div className="mt-5 mb-3 flex gap-14 md:!gap-14">
                <CollectionStat value={collectionData.floorPrice} label="최저 거래가" />
                <CollectionStat value={collectionData.totalVolume} label="총 거래량" />
                <CollectionStat value={collectionData.creatorFee} label="작가 로열티" />
                <CollectionStat value={collectionData.favorite.length} label="팔로워 수" />
            </div>
        </div>
    )
}

export const NFTList = ({ tokenData, isCreator }: { tokenData: TokenData[], isCreator: boolean }) => {
    const [selectedItems, setSelectedItems] = useState<TokenData[]>([]);
    const sortedData = tokenData ? tokenData.sort((a, b) => b.id - a.id) : []

    return (
        <>
            <div className="w-10/12 mx-auto mb-10">
                {isCreator
                    ? <AirdropSweeper tokenData={tokenData} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
                    : <CollectionSweeper tokenData={tokenData} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
                }
            </div>
            <div className="flex flex-wrap justify-center">
                {sortedData.map((token) => (
                    <NFTCard
                        key={token.id}
                        token={token}
                        isSelected={selectedItems.some((item) => item.id === token.id)}
                    />
                ))}
            </div>
        </>
    )
}
