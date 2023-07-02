import { useRouter } from 'next/router';
import { RootLayout } from "@components/layout/layout"
import { Collection } from '@components/collection/collection';
import { useMarket } from '@utils/hooks/useMarket';
import { useQuery } from 'react-query';
import request from '@utils/request';
import { LoadingSpinner2 } from '@components/common/loading';

const CollectionPage = () => {
  const router = useRouter();
  const { _id } = router.query;
  const { market } = useMarket();

  const getCollection = async (collectionAddress: string) => {
    try {
      const { data } = await request.get(`collection/${collectionAddress}`);
      return data[0];
    } catch (error: unknown) {
      throw new Error(error as string);
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

      return result;
    } catch (error: unknown) {
      throw new Error(error as string);
    }
  };

  const { data: collectionData, isLoading: collectionLoading } = useQuery(
    ['collection', _id],
    () => getCollection(_id as string),
    {
      enabled: !!_id,
    }
  );

  const { data: tokenData, isLoading: nftsLoading } = useQuery(
    ['nfts', _id],
    () => getNfts(_id as string),
    {
      enabled: !!market && !!_id,
    }
  );
  const isLoading = collectionLoading || nftsLoading

  if (isLoading) return <LoadingSpinner2 />
  return (
    <RootLayout>
        <Collection collectionData={collectionData} tokenData={tokenData} />
    </RootLayout>
  );
};

export default CollectionPage;
