import { NFT } from '@components/collection/nft';
import { RootLayout } from '@components/layout/layout';
import { useMarket } from '@utils/hooks/useMarket';
import { useQuery } from 'react-query';
import request from '@utils/request';
import { useRouter } from 'next/router';
import { TokenData } from '@utils/types/collection.interface';


const NftPage = () => {
  const router = useRouter();
  const { _id, id } = router.query;

  const { market } = useMarket();

  const getCollection = async (collectionAddress: string) => {
    try {
      const { data } = await request.get(`collection/${collectionAddress}`);
      return data[0];
    } catch (error: unknown) {
      throw new Error(error as string);
    }
  }

  const getNft = async (marketId: string) => {
    try {
      const data = await market.TokenOnSale(marketId);
        const obj: TokenData = {
          id: Number(data[0]),
          seller: data[1],
          NFTaddress: data[2],
          tokenId: Number(data[3]),
          price: Number(data[4]),
          metadata: data[5],
          sold: data[6],
          creatorFee: Number(data[7]),
          openingPrice: Number(data[8]),
          auctionEndTime: Number(data[9]),
          highestBidder: data[10],
          highestBid: Number(data[11]),
        };
        return obj;
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

  const { data: tokenData, isLoading: nftLoading } = useQuery(
    ['nfts', id],
    () => getNft(id as string),
    {
      enabled: !!market && !!id,
    }
  );
  const isLoading = collectionLoading || nftLoading

  if (isLoading || !tokenData) return <p>Loading...</p> // 로딩 컴포넌트 필요
  return (
    <RootLayout>
      <NFT collectionData={collectionData} token={tokenData} />
    </RootLayout>
  );
}

export default NftPage

