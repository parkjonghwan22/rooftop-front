import { useState } from 'react'
import tw from 'tailwind-styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { CollectionData, ActivityData, SummaryData } from '@utils/types/nft.interface'
import { VerifiedMarker } from '@components/common/marker/verify'
import { useEvent } from '@utils/hooks/useEvent'
import { useQuery, useQueryClient } from 'react-query'
import { Icon } from '@iconify/react'

interface CollectionProps {
    collectionDatas: CollectionData[]
    activityDatas: ActivityData[]
}

const ChartItem = ({ collection, index }: { collection: CollectionData; index: number }) => {
    const { getTradeSummary } = useEvent()
    
    const { data: summary, isLoading: summaryLoading } = useQuery(
        ['activity', collection.address],
        () => getTradeSummary(collection.address, 48),
        {
            enabled: !!collection,
        }
    )
    if(summary === undefined) return
    
    const TdStyled = tw.td`
    py-4 whitespace-no-wrap dark:bg-gray-700
`
    return (
        <tr className="w-full flex items-center justify-between border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center">
                <TdStyled className="px-4">
                    <div className="text-center text-gray-700 dark:text-gray-400">#{index + 1}</div>
                </TdStyled>
                <TdStyled>
                    <Link href={`collections/${collection.address}`}>
                        <div className="w-20 h-20 ml-2">
                            <Image
                                src={
                                    collection.logo
                                        ? collection.logo
                                        : 'https://dummyimage.com/480x480/ccc/000'
                                }
                                alt="test"
                                width={1000}
                                height={1000}
                                className="object-fill w-20 h-20 border-2 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
                            />
                        </div>
                    </Link>
                </TdStyled>
                <TdStyled className="px-6">
                    <div className="text-lg leading-5 font-medium text-gray-900 dark:text-gray-200 mb-3 flex items-center">
                        {collection.name}
                        {collection.verified && (
                            <div className="ml-1">
                                <VerifiedMarker />
                            </div>
                        )}
                    </div>
                    <div className="text-sm leading-5 text-gray-900 dark:text-gray-200">
                        Floor : {collection.floorPrice}
                    </div>
                    <div className="text-sm leading-5 text-gray-400">
                        Volume : {collection.totalVolume}
                    </div>
                </TdStyled>
            </div>
            <TdStyled className="px-6 lg:visible invisible">
              { Number(summary.percentage) === 0 ?
                <div className="px-2 inline-flex text-3xl leading-7 black:text-white white:text-black">
                    <Icon icon="carbon:undefined-filled" />
                </div>
              : Number(summary.percentage) > 0 ? 
              <div className="px-2 inline-flex text-xl leading-7 font-semibold rounded-full text-green-600">
                {`+` + Number(summary.percentage) + `%`}
              </div>
              :
              <div className="px-2 inline-flex text-xl leading-7 font-semibold rounded-full text-red-600">
                { Number(summary.percentage) + `%`}
              </div>
              }
            </TdStyled>
        </tr>
    )
}

export const RankingChart = ({ collectionDatas, activityDatas }: CollectionProps) => {
    const [selectedSort, setSelectedSort] = useState('trending')

    // trendig 정렬
    const sortedByTrending = [...collectionDatas]
        .sort((a, b) => {
            const countA = activityDatas.filter(
                (activity) => activity.NFTaddress === a.address
            ).length
            const countB = activityDatas.filter(
                (activity) => activity.NFTaddress === b.address
            ).length
            return countB - countA
        })
        .slice(0, 10)

    // top 정렬
    const sortedByTop = [...collectionDatas]
        .sort((a, b) => {
            return b.totalVolume - a.totalVolume
        })
        .slice(0, 10)

    const selectedDatas = selectedSort === 'trending' ? sortedByTrending : sortedByTop

    return (
        <div className="flex flex-col w-3/4 mt-20 mb-10">
            <header className="border-b border-gray-100 dark:bg-gray-800 dark:border-gray-500 rounded-t-lg text-gray-700 dark:text-gray-100">
                <div className="px-5 py-4 flex">
                    <div
                        className={`font-semibold text-3xl mr-10 cursor-pointer ${
                            selectedSort === 'trending'
                                ? 'text-red-500 dark:text-yellow-400'
                                : 'text-gray-500 dark:text-gray-100'
                        }`}
                        onClick={() => setSelectedSort('trending')}
                    >
                        Trending
                    </div>
                    <div
                        className={`font-semibold text-3xl cursor-pointer ${
                            selectedSort === 'top'
                                ? 'text-red-500 dark:text-yellow-400'
                                : 'text-gray-500 dark:text-gray-100'
                        }`}
                        onClick={() => setSelectedSort('top')}
                    >
                        Top
                    </div>
                </div>
            </header>
            <table className="min-w-full lg:w-full">
                <tbody className="lg:grid grid-cols-2 gap-1">
                    {selectedDatas.map((collection, index) => (
                        <ChartItem key={collection._id} collection={collection} index={index} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
