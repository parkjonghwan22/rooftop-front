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
    RankingFollowSvg,
} from './styled/stats.styled'
import { Icon } from '@iconify/react'
import { useQueryClient, useQuery } from 'react-query'
import { LoadingSpinner, LoadingSpinner2 } from '@components/common/loading'
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

const CollectionChange = ({
    collection,
    index,
    sortColumn,
    setSortColumn,
}: CollectionChangeProps) => {
    const { address } = useAccount()
    const queryClient = useQueryClient()

    const [isLoading, setIsLoading] = useState<boolean[]>(
        new Array(collection.address.length).fill(false)
    )
    const { getTradeSummary } = useEvent()

    const { data: summary, isLoading: summaryLoading } = useQuery(
        ['activity', collection.address],
        () => getTradeSummary(collection.address, 48),
        {
            enabled: !!collection,
        }
    )

    if (summary === undefined) return null

    const followHandler = async (index: number) => {
        if (!address) return
        try {
            setIsLoading((prevLoading) => {
                const newLoading = [...prevLoading]
                newLoading[index] = true
                return newLoading
            })

            const response = await request.post(`collection/follow`, {
                address,
                collection_address: collection.address,
            })

            if (response) {
                const foundFavorite = queryClient
                    .getQueryData<CollectionData[] | undefined>('allCollection')
                    ?.find((collection: CollectionData) => {
                        return collection.favorite.includes(address)
                })
                queryClient.invalidateQueries('allCollection', { refetchInactive: true })
                setIsLoading((prevLoading) => {
                    const newLoading = [...prevLoading]
                    newLoading[index] = false
                    return newLoading
                })
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
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
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="font-medium text-2xl">{collection.name}</div>
                    </div>
                </Link>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="text-center font-normal pl-5 w-16 text-2xl">
                        {collection.totalVolume}
                    </div>
                    <div className="text-left font-normal pl-7 w-16 text-2xl">MATIC</div>
                </div>
            </td>
            <td className="py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="text-center font-normal pl-5 w-1/4 text-2xl">
                        {collection.floorPrice}
                    </div>

                    <div className="text-left font-normal pl-7 w-1/4 text-2xl">MATIC</div>
                </div>
            </td>
            <td className="py-4 whitespace-nowrap">
                <div className="flex items-center ml-7">
                    <div className="text-center font-normal pl-5 w-1/4 text-2xl">
                        {Number(summary.percentage) === 0 ? (
                            <div className="px-2 inline-flex text-3xl leading-7 black:text-white white:text-black">
                                <Icon icon="carbon:undefined-filled" />
                            </div>
                        ) : Number(summary.percentage) > 0 ? (
                            <div className="px-2 inline-flex text-xl leading-7 font-semibold rounded-full text-green-600">
                                {`+` + Number(summary.percentage) + `%`}
                            </div>
                        ) : (
                            <div className="px-2 inline-flex text-xl leading-7 font-semibold rounded-full text-red-600">
                                {Number(summary.percentage) + `%`}
                            </div>
                        )}
                    </div>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                {isLoading[index] ? (
                    <LoadingSpinner />
                ) : collection.favorite.includes(`${address}`) ? (
                    <div className="flex justify-center text-lg text-center">
                        <div onClick={() => followHandler(index)}>
                            <Icon
                                icon="noto-v1:star"
                                className="text-3xl text-gray-600 dark:text-gray-300 cursor-pointer"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center text-lg text-center">
                        <div onClick={() => followHandler(index)}>
                            <Icon
                                icon="fluent:star-add-24-regular"
                                className="text-3xl text-gray-600 dark:text-gray-300 cursor-pointer"
                            />
                        </div>
                    </div>
                )}
            </td>
        </tr>
    )
}

// ===========================================================================

const Stats = ({ collectionDatas }: CollectionsProps) => {
    const [sortColumn, setSortColumn] = useState('Volume');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [sortedCollectionDatas, setSortedCollectionDatas] = useState<CollectionData[]>([]);
    

    useEffect(() => {
      const sortedByVolume = [...collectionDatas].sort((a, b) => {
        if (a.totalVolume < b.totalVolume) {
          return sortDirection === 'asc' ? -1 : 1;
        } else if (a.totalVolume > b.totalVolume) {
          return sortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
  
      const sortedByFloorPrice = [...collectionDatas].sort((a, b) => {
        if (a.floorPrice < b.floorPrice) {
          return sortDirection === 'asc' ? -1 : 1;
        } else if (a.floorPrice > b.floorPrice) {
          return sortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
      const selectedSortData = sortColumn === 'Volume' ? sortedByVolume : sortedByFloorPrice;
  
      setSortedCollectionDatas(selectedSortData);
    }, [sortColumn, sortDirection]);
  

    const handleSortColumn = (column: string) => {
      if (column === sortColumn) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('desc');
      }
    };
  
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
                                <th
                                    className="p-2 whitespace-nowrap"
                                    onClick={() => handleSortColumn('Volume')}
                                >
                                    <div className="flex justify-evenly items-center font-semibold text-left pl-5 text-3xl">
                                        Volume
                                        {sortColumn === 'Volume' && (
                                            <>
                                                {sortDirection === 'desc' ? (
                                                    <Icon icon="fluent-mdl2:sort-down" style={{ fontSize: '1.5rem' }} />
                                                ) : (
                                                    <Icon icon="fluent-mdl2:sort-up" style={{ fontSize: '1.5rem' }} />
                                                )}
                                            </>
                                        )}
                                        {sortColumn !== 'Volume' && (
                                            <Icon icon="radix-icons:caret-sort"/>
                                        )}
                                    </div>

                                </th>
                                <th
                                    className="p-2 whitespace-nowrap"
                                    onClick={() => handleSortColumn('FloorPrice')}
                                >
                                    <div className="flex justify-evenly items-center font-semibold text-left pl-5 text-3xl">
                                        Floor Price
                                        {sortColumn === 'FloorPrice' && (
                                            <>
                                                {sortDirection === 'desc' ? (
                                                    <Icon icon="fluent-mdl2:sort-down" style={{ fontSize: '1.5rem' }} />
                                                ) : (
                                                    <Icon icon="fluent-mdl2:sort-up" style={{ fontSize: '1.5rem' }}/>
                                                )}
                                            </>
                                        )}
                                        {sortColumn !== 'FloorPrice' && (
                                            <Icon icon="radix-icons:caret-sort" />
                                        )}
                                    </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="flex justify-evenly items-center font-semibold text-left text-3xl">
                                        % Change
                                    </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="flex justify-evenly items-center font-semibold text-center text-3xl">
                                        Follow
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        {sortedCollectionDatas.map((collection, index) => (
                            <tbody className="text-sm divide-y divide-gray-100" key={index}>
                                <CollectionChange
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

export default Stats
