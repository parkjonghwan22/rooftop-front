import { ActivityData, CollectionData, TokenData } from '@utils/types/nft.interface'
import { useIpfs } from '@utils/hooks/useIpfs'
import { MynftsWrap } from './styled/Mynfts.styled'
import Image from 'next/image'
import Link from 'next/link'
import { LoadingSpinner } from '@components/common/loading'
import { useCoinGecko } from '@utils/hooks/useCoingecko'
import { Icon } from '@iconify/react'

const NFTItem = ({ token ,activity }: { token: TokenData,activity: ActivityData[] }) => {
    const { metaData, imageUrl, isLoading } = useIpfs(token)
    const { convertKRW } = useCoinGecko()
    let filterActivity;
    if (activity && activity.length > 0) {
      filterActivity = activity.find((item) => item.to === token.seller && item.id === token.id);
    }
    const filterPrice = filterActivity?.price || 0
    const todayKrwPrice = convertKRW(filterPrice) // 오늘 환율계산가격
    const lossAmount = (Number(todayKrwPrice) - Number(filterActivity?.krwPrice))
    const lossRate = (lossAmount / (Number(filterActivity?.krwPrice))) * 100
    /*
    손실액 = (판매 시점 단가 - 구매 시점 단가) * 수량
    손실율 = (손실액 / (구매 시점 단가 * 수량)) * 100
    - 손실액 (todayKrwPrice - filterActivity.krwPrice)
    - 손실율 : (손실액 / filterActivity.krwPrice) * 100
    손실액 = (13.147 - 13.069) * 1 = 0.078
    손실율 = (0.078 / (13.069 * 1)) * 100 = 0.596%
    */
    if (isLoading) return <LoadingSpinner />
    return (
        <>
            {/* relative 없앴음 */}
            <div className="group cursor-pointer mt-3 border-b-2 dark:border-gray-500">
                <Link
                    href={`/collections/${token.NFTaddress}/nft?id=${token.id}`}
                    className="flex justify-between w-full ml-2"
                >
                    <div className="flex flex-wrap w-1/5">
                        <Image
                            src={imageUrl ? imageUrl : 'https://dummyimage.com/480x480/ccc/000'}
                            alt="nft image"
                            width={1000}
                            height={1000}
                            className="hover:animate-[wiggle_1s_ease-in-out_infinite] object-fill w-16 h-16 mx-auto rounded-full border-2 dark:border-white mb-2"
                        />
                    </div>
                    <div className="w-1/5 flex flex-col items-center justify-center">
                        <p className="text-md lg:text-md font-semibold text-green-600 dark:text-cyan-500">{todayKrwPrice}￦</p>
                        <p className="text-md lg:text-md font-semibold flex items-center"><Icon icon="cryptocurrency-color:matic" className="mr-1" />{(token.price) / 10 ** 18}</p>
                    </div>

                    <div className="w-3/5 flex flex-col justify-center">
                        <div className="flex justify-center items-center">
                            <progress
                                max={100}
                                value={50 + lossRate}
                                className={
                                    `w-3/4 
                                [&::-webkit-progress-bar]:rounded-lg 
                                [&::-webkit-progress-value]:rounded-lg
                                [&::-webkit-progress-bar]:bg-slate-300
                                [&::-webkit-progress-value]:${lossRate >= 0 ? `bg-green-500` : `bg-violet-400`}
                                [&::-moz-progress-bar]:bg-violet-400
                                `
                                }
                            />
                        </div>
                        <span className="text-md lg:text-md font-semibold ml-2 text-center mt-2">
                            {Number(lossRate.toFixed(2))} %
                        </span>
                    </div>
                </Link>
                <div className="group-hover:opacity-100 transition-opacity opacity-0  absolute z-10 inline-block px-3 py-2 text-md text-gray-900 dark:text-green-500 bg-white dark:bg-gray-900 rounded-lg shadow-lg tooltip">
                    <span className="mr-2">#{token.tokenId}</span>
                    <span>{metaData.name}</span>
                </div>
            </div>
        </>
    )
}

export const MyNFT = ({ tokenData, activity }: { tokenData: TokenData[]; activity: ActivityData[] }) => {
    const sortedData = tokenData ? tokenData.sort((a, b) => b.id - a.id) : []
    // console.log("tokenData MyNFT :: " , tokenData )
    return (
        <>
            <MynftsWrap>
                <div className="flex flex-col justify-center mt-2 w-full">
                    {sortedData.map((token) => (
                        <NFTItem key={token.id} token={token} activity={activity}/>
                    ))}
                </div>
            </MynftsWrap>
        </>
    )
}
