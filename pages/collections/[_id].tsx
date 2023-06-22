import { useRouter } from 'next/router';
import { RootLayout } from "@components/layout/layout"
import { useEffect, useState } from 'react';
import { Collection } from '@components/collection/collection';
import { useMarket } from '@utils/hooks/useMarket';
import request from '@utils/request';
import { CollectionData } from '@utils/types/collection.interface';

const CollectionPage = () => {
  const router = useRouter();
  const { _id } = router.query;
  const { market } = useMarket();
  const [isLoading, setIsLoading] = useState(true);
  const [collectionData, setCollectionData] = useState({} as CollectionData);
  const [tokenData, setTokenData] = useState([]);

  const getCollection = async () => {
    try {
      const collectionAddress = _id;
      const { data } = await request.get(`collection/${collectionAddress}`);
      setCollectionData(data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const getNfts = async (collectionAddress: string) => {
    try {
      const response = await market.getAllTokensInCollection(collectionAddress);
      const result = response.map((proxy: any) => {
        const obj = {
          id: Number(proxy[0]),
          seller: proxy[1],
          NFTaddress: proxy[2],
          tokenId: Number(proxy[3]),
          price: Number(proxy[4]),
          metadata: proxy[5],
          sold: proxy[6],
          creatorFee: Number(proxy[7]),
          openingPrice: Number(proxy[8]),
          auctionEndTime: Number(proxy[9]),
          highestBidder: proxy[10],
          highestBid: Number(proxy[11]),
        };
  
        return obj;
      });
  
      setTokenData(result);
      setIsLoading(false);
    } catch (error: unknown) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (_id) {
      setIsLoading(true);
      getCollection();
    }
  }, [_id]);

  useEffect(() => {
    if (!market || !_id) return;

    setIsLoading(true);
    getNfts(_id as string);
  }, [market, _id]);

  // 로딩 컴포넌트 필요

  return (
    <RootLayout>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Collection collectionData={collectionData} tokenData={tokenData} />
      )}
    </RootLayout>
  );
};

export default CollectionPage;
