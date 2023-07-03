import { CollectionData } from '@utils/types/nft.interface'
import request from '@utils/request'
import Link from 'next/link'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import {
    RankingCollectionWrapper,
    TitleCollectionDiv,
    TitleCollectionDiv2,
    TitleCollectionH2,
    RankingFollowSvg,
} from './styled/stats.styled'
import { Icon } from '@iconify/react'
import { useQueryClient } from 'react-query'
import { LoadingSpinner, LoadingSpinner2 } from '@components/common/loading'

interface CollectionsProps {
    collectionDatas: CollectionData[]
}

const Stats = ({ collectionDatas }: CollectionsProps) => {
    const { address } = useAccount()
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState<boolean[]>(
        new Array(collectionDatas.length).fill(false)
    )

    const followHandler = async (index: number) => {
        if (!address) return

        try {
            setIsLoading((prevLoading) => {
                const newLoading = Array.isArray(prevLoading) ? [...prevLoading] : [];
                newLoading[index] = true
                return newLoading
            })

            const response = await request.post(`collection/follow`, {
                address,
                collection_address: collectionDatas[index].address,
            })

            if (response) {
                const foundFavorite = queryClient
                    .getQueryData<CollectionData[] | undefined>('allCollection')
                    ?.find((collection: CollectionData) => {
                        return collection.favorite.includes(address)
                    })
                queryClient.invalidateQueries('allCollection',{ refetchInactive: true })
                setIsLoading(false)
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <TitleCollectionDiv>
                <TitleCollectionDiv2>
                    <TitleCollectionH2>Collection stats</TitleCollectionH2>
                </TitleCollectionDiv2>
            </TitleCollectionDiv>
            <RankingCollectionWrapper>
                <div className="w-full overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xl font-semibold uppercase">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left pl-8 text-3xl">
                                        Collection
                                    </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left pl-8 text-3xl">
                                        Volume
                                    </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left text-3xl">
                                        Floor Price
                                    </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center text-3xl">Follow</div>
                                </th>
                            </tr>
                        </thead>
                        {collectionDatas.map((collection, index) => (
                            <tbody className="text-sm divide-y divide-gray-100" key={index}>
                                <tr className="h-24">
                                    <td className="p-2 whitespace-nowrap">
                                        <Link href={`/collections/${collection.address}`}>
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                    {collection.logo ? (
                                                        <img
                                                            className="rounded-full"
                                                            src={collection.logo}
                                                            width="40"
                                                            height="40"
                                                            alt="Alex Shatov"
                                                        />
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <div className="font-medium text-2xl">
                                                    {collection.name}
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="p-2 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="text-center font-normal pl-5 w-16 text-2xl">
                                                {collection.totalVolume}
                                            </div>

                                            <div className="text-left font-normal pl-5 w-16 text-2xl">
                                                MATIC
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="text-center font-normal pl-5 w-1/4 text-2xl">
                                                {collection.floorPrice}
                                            </div>

                                            <div className="text-left font-normal pl-5 w-1/4 text-2xl">
                                                MATIC
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-2 whitespace-nowrap">
                                        {isLoading[index] ? (
                                            <LoadingSpinner />
                                        ) : (
                                            <div className="flex justify-center text-lg text-center">
                                                {collection.favorite.includes(`${address}`) ? (
                                                    <div onClick={() => followHandler(index)}>
                                                        <Icon
                                                            icon="noto-v1:star"
                                                            className="text-3xl text-gray-600 dark:text-gray-300 cursor-pointer"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div onClick={() => followHandler(index)}>
                                                        <Icon
                                                            icon="fluent:star-add-24-regular"
                                                            className="text-3xl text-gray-600 dark:text-gray-300 cursor-pointer"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </RankingCollectionWrapper>
        </>
    )
}

export default Stats
