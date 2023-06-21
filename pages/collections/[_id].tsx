import { useRouter } from 'next/router';
import { RootLayout } from "@components/layout/layout"
import { useEffect } from 'react';
import { Collection } from '@components/collection/collection';
import { useMarket } from '@utils/hooks/useMarket';


const CollectionPage = () => {
  const router = useRouter();
  const { _id } = router.query;
  const { market } = useMarket()
  
  const getNfts = async (collectionAddress: string) => {
    const response = await market.getAllTokensInCollection(collectionAddress);
    console.log(response);
  
    const result = response.map((proxy: any) => {
      const obj = {
        id: proxy[0],
        seller: proxy[1],
        NFTaddress: proxy[2],
        tokenId: proxy[3],
        price: proxy[4],
        metadata: proxy[5],
        sold: proxy[6],
        creatorFee: proxy[7],
        openingPrice: proxy[8],
        auctionEndTime: proxy[9],
        highestBidder: proxy[10],
        highestBid: proxy[11],
      };
  
      return obj;
    });
  
    console.log(result);
  };

  useEffect(() => {
    if (!market || !_id) return
    getNfts(_id as string)
    
  }, [market, _id]);

  return (
    <RootLayout>
        <Collection />
    </RootLayout>
  );
};

export default CollectionPage;