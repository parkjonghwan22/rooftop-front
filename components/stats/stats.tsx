import { CollectionData } from '@utils/types/nft.interface'
import request from '@utils/request'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { RankingCollectionWrapper, TitleCollectionDiv, TitleCollectionDiv2, TitleCollectionH2 } from './styled/stats.styled'
import { Icon } from '@iconify/react'
import { useQuery } from 'react-query'
import { LoadingSpinner } from '@components/common/loading'
import { useEvent } from '@utils/hooks/useEvent'
import { VerifiedMarker } from '@components/common/marker/verify'

interface CollectionsProps {
  collectionDatas: CollectionData[];
}

interface CollectionChangeProps {
  collection: CollectionData;
  index: number;
}

const ChartItem = ({ collection, index }: CollectionChangeProps) => {
  const { address } = useAccount();
  const { getTradeSummary } = useEvent();
  const [isCollectionLoading, setIsCollectionLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const followHandler = async (index: number) => {
    if (!address) return;
    try {
      setIsCollectionLoading(true);

      const { data } = await request.post(`collection/follow`, {
        address,
        collection_address: collection.address,
      });

      if (data) {
        setIsFavorite((prevState) => !prevState);
        setIsCollectionLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const { data: summary, isLoading: summaryLoading } = useQuery(
    ['activity', collection.address],
    () => getTradeSummary(collection.address, 48),
    {
      enabled: !!collection,
    }
  );

  useEffect(() => {
    if (collection.favorite.includes(`${address}`)) {
      setIsFavorite(true);
    }
  }, [address, collection]);

  if (summary === undefined) return null;
  return (
    <tr className="h-24 text-lg md:text-xl bg-white dark:bg-gray-700">
      <td className="p-2 whitespace-nowrap w-[40%]">
        <Link href={`/collections/${collection.address}`}>
          <div className="flex items-center">
            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
              {collection.logo && (
                <Image
                  className="rounded-full"
                  src={collection.logo}
                  alt="logo"
                  width={1000}
                  height={1000}
                />
              )}
            </div>
            <div className="font-bold flex items-center">
                <span className="mr-1.5">{collection.name}</span>
                {collection.verified && <VerifiedMarker />}
            </div>
          </div>
        </Link>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="flex items-center justify-center">
          <div className="text-center flex items-center w-[90px]">
            <Icon icon="cryptocurrency-color:matic" />
            <span className="ml-1">{collection.totalVolume}</span>
          </div>
        </div>
      </td>
      <td className="py-4 whitespace-nowrap">
        <div className="flex items-center justify-center">
          <div className="text-center flex items-center w-[90px]">
            <Icon icon="cryptocurrency-color:matic" />
            <span className="ml-1">{collection.floorPrice}</span>
          </div>
        </div>
      </td>
      <td className="py-4 whitespace-nowrap">
        <div className="flex items-center justify-center">
          <div className="text-center flex items-center">
            <span className="ml-1">{collection.totalSales}</span>
          </div>
        </div>
      </td>
      <td className="py-4 whitespace-nowrap">
        <div className="flex items-center justify-center">
          <div className="text-left text-[18px]">
            {Number(summary.percentage) === 0 ? (
              <div className="px-2 inline-flex leading-7 black:text-white white:text-black">
                <Icon icon="carbon:undefined-filled" />
              </div>
            ) : Number(summary.percentage) > 0 ? (
              <div className="px-2 inline-flex leading-7 font-semibold rounded-full text-green-600 dark:text-cyan-500">
                {`+${Number(summary.percentage)}%`}
              </div>
            ) : (
              <div className="px-2 inline-flex leading-7 font-semibold rounded-full text-red-600">
                {`${Number(summary.percentage)}%`}
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        {isCollectionLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex justify-center text-center">
            <div onClick={() => followHandler(index)}>
              <Icon
                icon={isFavorite ? 'noto-v1:star' : 'fluent:star-add-24-regular'}
                className="text-gray-600 dark:text-gray-300 cursor-pointer text-[30px]"
              />
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

const ChartList = ({ collectionDatas }: CollectionsProps) => {
  const [sortColumn, setSortColumn] = useState('Volume');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [sortedCollectionDatas, setSortedCollectionDatas] = useState<CollectionData[]>([]);

  const handleSortColumn = (column: string) => {
    if (column === sortColumn) {
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  useEffect(() => {
    const sortedCollectionDatas = [...collectionDatas].sort((a, b) => {
      if (sortColumn === 'Volume') {
        return (sortDirection === 'asc' ? 1 : -1) * (a.totalVolume - b.totalVolume);
      } else if (sortColumn === 'FloorPrice') {
        return (sortDirection === 'asc' ? 1 : -1) * (a.floorPrice - b.floorPrice);
      } else if (sortColumn === 'totalSales') {
        return (sortDirection === 'asc' ? 1 : -1) * (a.totalSales - b.totalSales);
      } else {
        return 0;
      }
    });

    setSortedCollectionDatas(sortedCollectionDatas);
  }, [sortColumn, sortDirection]);

  return (
    <>
      <TitleCollectionDiv>
        <TitleCollectionDiv2>
          <TitleCollectionH2>Collection stats</TitleCollectionH2>
        </TitleCollectionDiv2>
      </TitleCollectionDiv>
      <RankingCollectionWrapper>
        <div className="w-full overflow-x-auto bg-gray-300 dark:bg-gray-800 rounded-lg">
          <table className="table-auto w-3/4 lg:w-full">
            <thead className="text-sm font-semibold uppercase text-gray-600 dark:text-gray-300">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold pl-10 text-left">Collection</div>
                </th>
                <th
                  className="p-2 whitespace-nowrap"
                  onClick={() => handleSortColumn('Volume')}
                >
                  <div className="flex justify-center items-center font-semibold text-center">
                    Volume
                    {sortColumn === 'Volume' && (
                      <>
                        {sortDirection === 'desc' ? (
                          <Icon icon="fa6-solid:sort-down" className="ml-2" />
                        ) : (
                          <Icon icon="fa6-solid:sort-up" className="ml-2" />
                        )}
                      </>
                    )}
                    {sortColumn !== 'Volume' && <Icon icon="bxs:sort-alt" className="ml-2" />}
                  </div>
                </th>
                <th
                  className="p-2 whitespace-nowrap"
                  onClick={() => handleSortColumn('FloorPrice')}
                >
                  <div className="flex justify-center items-center font-semibold text-center">
                    Floor Price
                    {sortColumn === 'FloorPrice' && (
                      <>
                        {sortDirection === 'desc' ? (
                          <Icon icon="fa6-solid:sort-down" className="ml-2" />
                        ) : (
                          <Icon icon="fa6-solid:sort-up" className="ml-2" />
                        )}
                      </>
                    )}
                    {sortColumn !== 'FloorPrice' && <Icon icon="bxs:sort-alt" className="ml-2" />}
                  </div>
                </th>
                <th
                  className="p-2 whitespace-nowrap"
                  onClick={() => handleSortColumn('totalSales')}
                >
                  <div className="flex justify-center items-center font-semibold text-center">
                    Sales
                    {sortColumn === 'totalSales' && (
                      <>
                        {sortDirection === 'desc' ? (
                          <Icon icon="fa6-solid:sort-down" className="ml-2" />
                        ) : (
                          <Icon icon="fa6-solid:sort-up" className="ml-2" />
                        )}
                      </>
                    )}
                    {sortColumn !== 'totalSales' && <Icon icon="bxs:sort-alt" className="ml-2" />}
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="flex justify-evenly items-center font-semibold text-left">
                    % Change
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="flex justify-evenly items-center font-semibold text-center">
                    Follow
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {sortedCollectionDatas.map((collection, index) => (
                <ChartItem key={index} collection={collection} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </RankingCollectionWrapper>
    </>
  );
};

export default ChartList;