import { CollectionData } from '@utils/types/nft.interface'
import request from '@utils/request'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import {
    RankingCollectionWrapper,
    TitleCollectionDiv,
    TitleCollectionDiv2,
    TitleCollectionH2,
} from './styled/stats.styled'
import { Icon } from '@iconify/react'
import { useQuery } from 'react-query'
import { LoadingSpinner } from '@components/common/loading'
import { useEvent } from '@utils/hooks/useEvent'

interface CollectionsProps {
    collectionDatas: CollectionData[]
}

interface CollectionChangeProps {
    collection: CollectionData
    index: number
    sortColumn: string
    setSortColumn: React.Dispatch<React.SetStateAction<string>>
}

const ChartItem = ({ collection, index, sortColumn, setSortColumn }: CollectionChangeProps) => {
    const { address } = useAccount()
    const { getTradeSummary } = useEvent()
    const [isCollectionLoading, setIsCollectionLoading] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    const followHandler = async (index: number) => {
        if (!address) return
        try {
            setIsCollectionLoading(true)

            const { data } = await request.post(`collection/follow`, {
                address,
                collection_address: collection.address,
            })

            if (data) {
                setIsFavorite((prevState) => !prevState);
                setIsCollectionLoading(false)
            }
        } catch (e) {
            console.error(e)
        }
    }


    const { data: summary, isLoading: summaryLoading } = useQuery(
        ['activity', collection.address],
        () => getTradeSummary(collection.address, 48),
        {
            enabled: !!collection,
        }
    )

    useEffect(() => {
        if (collection.favorite.includes(`${address}`)) {
            setIsFavorite(true)
        }
    }, [address, collection])

    if (summary === undefined) return null
    return (
        <tr className="h-24 text-lg md:text-xl">
            <td className="p-2 whitespace-nowrap">
                <Link href={`/collections/${collection.address}`}>
                    <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                            {collection.logo && (
                                <img
                                    className="rounded-full"
                                    src={collection.logo}
                                    width="40"
                                    height="40"
                                />
                            )}
                        </div>
                        <div className="font-bold">{collection.name}</div>
                    </div>
                </Link>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="flex items-center lg:pl-4">
                    <div className="text-center flex items-center">
                        <Icon icon="cryptocurrency-color:matic" />
                        <span className="ml-1">{collection.totalVolume}</span>
                    </div>
                </div>
            </td>
            <td className="py-4 whitespace-nowrap">
                <div className="flex items-center lg:pl-6">
                    <div className="text-center flex items-center">
                        <Icon icon="cryptocurrency-color:matic" />
                        <span className="ml-1">{collection.floorPrice}</span>
                    </div>
                </div>
            </td>
            <td className="py-4 whitespace-nowrap">
                <div className="flex items-center justify-center">
                    <div className="text-left">
                        {Number(summary.percentage) === 0 ? (
                            <div className="px-2 inline-flex leading-7 black:text-white white:text-black">
                                <Icon icon="carbon:undefined-filled" />
                            </div>
                        ) : Number(summary.percentage) > 0 ? (
                            <div className="px-2 inline-flex leading-7 font-semibold rounded-full text-green-600">
                                {`+` + Number(summary.percentage) + `%`}
                            </div>
                        ) : (
                            <div className="px-2 inline-flex leading-7 font-semibold rounded-full text-red-600">
                                {Number(summary.percentage) + `%`}
                            </div>
                        )}
                    </div>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                {isCollectionLoading ?
                    <LoadingSpinner /> :
                    <div className="flex justify-center text-center">
                        <div onClick={() => followHandler(index)}>
                            <Icon
                                icon={isFavorite ? "noto-v1:star" : "fluent:star-add-24-regular"}
                                className="text-gray-600 dark:text-gray-300 cursor-pointer text-[30px]"
                            />
                        </div>
                    </div>}
            </td>
        </tr>
    )
}

// ===========================================================================

const ChartList = ({ collectionDatas }: CollectionsProps) => {
    const [sortColumn, setSortColumn] = useState('Volume')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
    const [sortedCollectionDatas, setSortedCollectionDatas] = useState<CollectionData[]>([])

    const handleSortColumn = (column: string) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('desc')
        }
    }

    useEffect(() => {
        const sortedByVolume = [...collectionDatas].sort((a, b) => {
            if (a.totalVolume < b.totalVolume) {
                return sortDirection === 'asc' ? -1 : 1
            } else if (a.totalVolume > b.totalVolume) {
                return sortDirection === 'asc' ? 1 : -1
            } else {
                return 0
            }
        })

        const sortedByFloorPrice = [...collectionDatas].sort((a, b) => {
            if (a.floorPrice < b.floorPrice) {
                return sortDirection === 'asc' ? -1 : 1
            } else if (a.floorPrice > b.floorPrice) {
                return sortDirection === 'asc' ? 1 : -1
            } else {
                return 0
            }
        })
        const selectedSortData = sortColumn === 'Volume' ? sortedByVolume : sortedByFloorPrice

        setSortedCollectionDatas(selectedSortData)
    }, [sortColumn, sortDirection])


    return (
        <>
            <TitleCollectionDiv>
                <TitleCollectionDiv2>
                    <TitleCollectionH2>Collection stats</TitleCollectionH2>
                </TitleCollectionDiv2>
            </TitleCollectionDiv>
            <RankingCollectionWrapper>
                <div className="w-full overflow-x-auto">
                    <table className="table-auto w-3/4 lg:w-full">
                        <thead className="text-sm font-semibold uppercase">
                            <tr>
                                <th className="p-2 whitespace-nowrap lg:w-1/3">
                                    <div className="font-semibold pl-10 text-left">
                                        Collection
                                    </div>
                                </th>
                                <th
                                    className="p-2 whitespace-nowrap lg:w-1/5"
                                    onClick={() => handleSortColumn('Volume')}
                                >
                                    <div className="flex justify-center items-center font-semibold text-center">
                                        Volume
                                        {sortColumn === 'Volume' && (
                                            <>
                                                {sortDirection === 'desc' ? (
                                                    <Icon
                                                        icon="fa6-solid:sort-down"
                                                        className="ml-2"
                                                    />
                                                ) : (
                                                    <Icon
                                                        icon="fa6-solid:sort-up"
                                                        className="ml-2"
                                                    />
                                                )}
                                            </>
                                        )}
                                        {sortColumn !== 'Volume' && (
                                            <Icon icon="bxs:sort-alt" className="ml-2" />
                                        )}
                                    </div>
                                </th>
                                <th
                                    className="p-2 whitespace-nowrap lg:w-1/5"
                                    onClick={() => handleSortColumn('FloorPrice')}
                                >
                                    <div className="flex justify-center items-center font-semibold text-center">
                                        Floor Price
                                        {sortColumn === 'FloorPrice' && (
                                            <>
                                                {sortDirection === 'desc' ? (
                                                    <Icon
                                                        icon="fa6-solid:sort-down"
                                                        className="ml-2"
                                                    />
                                                ) : (
                                                    <Icon
                                                        icon="fa6-solid:sort-up"
                                                        className="ml-2"
                                                    />
                                                )}
                                            </>
                                        )}
                                        {sortColumn !== 'FloorPrice' && (
                                            <Icon icon="bxs:sort-alt" className="ml-2" />
                                        )}
                                    </div>
                                </th>
                                <th className="p-2 whitespace-nowrap lg:w-1/8">
                                    <div className="flex justify-evenly items-center font-semibold text-left">
                                        % Change
                                    </div>
                                </th>
                                <th className="p-2 whitespace-nowrap lg:w-1/8">
                                    <div className="flex justify-evenly items-center font-semibold text-center">
                                        Follow
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        {sortedCollectionDatas.map((collection, index) => (
                            <tbody className="text-sm divide-y divide-gray-100" key={index}>
                                <ChartItem
                                    collection={collection}
                                    index={index}
                                    sortColumn={sortColumn}
                                    setSortColumn={setSortColumn}
                                />
                            </tbody>
                        ))}
                    </table>
                </div>
            </RankingCollectionWrapper>
        </>
    )
}

export default ChartList
