import { CollectionData, TokenData } from '@utils/types/nft.interface'
import { NFTCard } from './nftcard'
import { CollectionStat } from './styled/collection.styled'
import { VerifiedMarker } from '@components/common/marker/verify'
import { CollectionSweeper } from './collectionsweeper'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Icon } from '@iconify/react'
import request from '@utils/request'
import { useQueryClient } from 'react-query'
import { LoadingSpinner } from '@components/common/loading'
import { AirdropSweeper } from '@components/airdrop/airdropsweeper'

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
            {collectionData && address &&  (
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
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)

    const followHandler = async () => {
        if (!address) return

        try {
            setIsLoading(true)
            const response = await request.post(`collection/follow`, {
                address,
                collection_address: collectionData.address,
            })

            if (response) {
                queryClient.invalidateQueries('collection', { refetchInactive: true })
                const foundFavorite =
                    queryClient.getQueryData<CollectionData[] | undefined>('collection')
                        ?.find((collection: CollectionData) => {
                            return collection.favorite.includes(address)
                        })
                
            }
            setIsLoading(false)
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative flex flex-col mb-8 items-center rounded-[20px] w-10/12 mx-auto p-4 bg-white dark:bg-gray-900 bg-clip-border shadow-lg dark:!bg-navy-800 dark:text-white">
            <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                <img
                    src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                    className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
                />
                <div className="absolute -bottom-12 flex h-[120px] w-[120px] items-center justify-center rounded-full border-[4px] border-white bg-red-400 dark:!border-navy-700">
                    <img src={collectionData.logo} alt="" className="h-full w-full rounded-full" />
                </div>
            </div>
            <div className="mt-16 flex flex-col items-center">
                <div className="flex items-center mb-1 ml-4">
                    <h4 className="text-xl font-bold text-navy-700 dark:text-white mr-1">
                        {collectionData.name}
                    </h4>
                    {collectionData.verified && <VerifiedMarker />}
                    {!isCreator &&
                        <div className="flex justify-center text-lg text-center ml-2">
                            {isLoading ?
                                <LoadingSpinner /> : (
                                    <div className="flex justify-center text-lg text-center">
                                        {collectionData.favorite.includes(`${address}`) ? (
                                            <div onClick={() => followHandler()}>
                                                <Icon
                                                    icon="noto-v1:star"
                                                    className="text-3xl text-gray-600 dark:text-gray-300 cursor-pointer"
                                                />
                                            </div>
                                        ) : (
                                            <div onClick={() => followHandler()}>
                                                <Icon
                                                    icon="fluent:star-add-24-regular"
                                                    className="text-3xl text-gray-600 dark:text-gray-300 cursor-pointer"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                        </div>
                    }
                </div>
                <p className="text-base font-normal text-gray-500">{collectionData.description}</p>
            </div>
            <div className="mt-5 mb-3 flex gap-14 md:!gap-14">
                <CollectionStat value={totalItems} label="작품 수" />
                <CollectionStat value={collectionData.floorPrice} label="최저 거래가" />
                <CollectionStat value={collectionData.totalVolume} label="총 거래량" />
                <CollectionStat value={collectionData.creatorFee} label="작가 로열티" />
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
