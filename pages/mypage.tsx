import { LoadingSpinner2 } from "@components/common/loading";
import { RootLayout } from "@components/layout/layout"
import { ProfileCard } from "@components/profile/profile";
import { useEvent } from "@utils/hooks/useEvent";
import { useMarket } from "@utils/hooks/useMarket";
import { useSign } from "@utils/hooks/useSign";
import request from "@utils/request";
import { useQuery } from "react-query";
import { useAccount } from "wagmi";


const MyPage = () => {
    const { user, isLoading } = useSign()
    const { market } = useMarket();
    const { getUserActivity } = useEvent()
    const { address } = useAccount()

    const getNfts = async (userAddress: string) => {
        try {
          const response = await market.getUserTokens(userAddress);
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

    
      const getFavorite = async () => {
        try {
            const { data } = await request.get(`collection?favorite=${address}`)
            // console.log('getAllCollectionData : ', data)
            return data
        } catch (error: unknown) {
            throw new Error(error as string)
        }
    }

    const { data: favoriteData, isLoading: getFavoriteLoading } = useQuery(
        ['favorite'],
        () => getFavorite(),
        {
          cacheTime: 60 * 60
        }
    )

      const { data: activityData, isLoading: activityLoading } = useQuery(
        ['activity', user?.address],
        () => getUserActivity(user?.address as string),
        {
          enabled: !!user,
        }
      );

      const { data: tokenData, isLoading: nftsLoading } = useQuery(
        ['nfts', user?.address],
        () => getNfts(user?.address as string),
        {
          enabled: !!market && !!user,
        }
      );

    return (
        <RootLayout>
            {isLoading ? 
            <LoadingSpinner2 />
            : <ProfileCard user={user} tokenData={tokenData} activity={activityData} collectionData={favoriteData}/>
            }
        </RootLayout>
    )
}

export default MyPage