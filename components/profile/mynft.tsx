import { CollectionData, TokenData } from '@utils/types/nft.interface'
import { useIpfs } from '@utils/hooks/useIpfs'
import { MynftsWrap } from './styled/Mynfts.styled'
import Image from 'next/image'
import Link from 'next/link'
import { LoadingSpinner } from '@components/common/loading'
import { useCoinGecko } from '@utils/hooks/useCoingecko'

const NFTItem = ({ token }: { token: TokenData }) => {
    const { metaData, imageUrl, isLoading } = useIpfs(token)
    const {getHistoricalPrice} = useCoinGecko()


    if (isLoading) return <LoadingSpinner />
    return (
        <>
            {/* relative 없앴음 */}
            <div className="group cursor-pointer mt-3 border-b-2 dark:border-gray-500">
                <Link
                    href={`/collections/${token.NFTaddress}/nft?id=${token.id}`}
                    className="flex justify-between w-full"
                >
                    <div className="flex flex-wrap w-1/5">
                        <Image
                            src={imageUrl ? imageUrl : 'https://dummyimage.com/480x480/ccc/000'}
                            alt="nft image"
                            width={1000}
                            height={1000}
                            className="hover:animate-[wiggle_1s_ease-in-out_infinite] object-fill w-20 h-20 mx-auto rounded-full border-2 dark:border-white mb-2"
                        />
                    </div>
                    <div className="w-1/5 flex items-center justify-between">
                        <span className="text-md lg:text-md font-semibold">NFT 수익률</span>
                    </div>

                    <div className="w-3/5 flex flex-col justify-center">
                        <div className="flex justify-center items-center">
                            <progress
                                max={100}
                                value={50 - 3}
                                className="w-3/4 
                                [&::-webkit-progress-bar]:rounded-lg 
                                [&::-webkit-progress-value]:rounded-lg
                                [&::-webkit-progress-bar]:bg-slate-300
                                [&::-webkit-progress-value]:bg-violet-400
                                [&::-moz-progress-bar]:bg-violet-400
                                "
                            />
                        </div>
                        <span className="text-md lg:text-md font-semibold ml-2 text-center mt-2">
                            - 3%
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

export const MyNFT = ({ tokenData }: { tokenData: TokenData[] }) => {
    const sortedData = tokenData ? tokenData.sort((a, b) => b.id - a.id) : []

    return (
        <>
            <MynftsWrap>
                <div className="flex flex-col justify-center mt-2 w-full">
                    {sortedData.map((token) => (
                        <NFTItem key={token.id} token={token} />
                    ))}
                </div>
            </MynftsWrap>
        </>
    )
}
