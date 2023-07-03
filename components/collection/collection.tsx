import { CollectionData, TokenData } from '@utils/types/nft.interface'
import { NFTCard } from './nftcard'
import { CollectionStat } from './styled/collection.styled'
import { VerifiedMarker } from '@components/common/marker/verify'
import { RangeSlider } from '@components/common/range/rangeslider'
import { useState } from 'react'

interface CollectionProps {
    collectionData: CollectionData
    tokenData: TokenData[]
}

export const Collection = ({ collectionData, tokenData }: CollectionProps) => {
    return (
        <>
            {collectionData && (
                <CollectionBanner
                    collectionData={collectionData}
                    totalItems={tokenData ? tokenData.length : 0}
                />
            )}
            {tokenData && <NFTList tokenData={tokenData} />}
        </>
    )
}

export const CollectionBanner = ({
    collectionData,
    totalItems,
}: {
    collectionData: CollectionData
    totalItems: number
}) => {
    return (
        <div className="relative flex flex-col mb-10 items-center rounded-[20px] w-10/12 mx-auto p-4 bg-white dark:bg-gray-900 bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
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


export const CollectionSweeper = ({ tokenData }: { tokenData: TokenData[] }) => {
    const [selectedCount, setSelectedCount] = useState(0);
    const filterdTokenData = tokenData.filter(token => !token.sold)
  
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const count = parseInt(e.target.value);
      setSelectedCount(count);
    };

    const calculateTotalPrice = (tokenData: TokenData[], selectedCount: number): number => {
        const selectedTokens = tokenData.slice(0, selectedCount);
        return selectedTokens.reduce((totalPrice, token) => totalPrice + token.price, 0);
    };

  
    return (
      <div className="w-10/12 mx-auto mb-10 flex items-center">
        <RangeSlider
          tokenData={filterdTokenData}
          selectedCount={selectedCount}
          onSliderChange={handleSliderChange}
        />
        <div>SWEEP {calculateTotalPrice(filterdTokenData, selectedCount) / (10 ** 18)} MATIC</div>
      </div>
    );
  };

export const NFTList = ({ tokenData }: { tokenData: TokenData[] }) => {
    const sortedData = tokenData ? tokenData.sort((a, b) => b.id - a.id) : []

    return (
        <>
            <CollectionSweeper tokenData={tokenData} />
            <div className="flex flex-wrap justify-center">
                {sortedData.map((token) => (
                    <NFTCard key={token.id} token={token} />
                ))}
            </div>
        </>
    )
}
