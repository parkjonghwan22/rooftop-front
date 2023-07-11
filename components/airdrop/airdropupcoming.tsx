import tw from "tailwind-styled-components";
import { LoadingSpinner2 } from "@components/common/loading/loading2";
import { AirdropData, CollectionData } from "@utils/types/nft.interface";
import Link from "next/link";
import Image from "next/image";
import { useCollection } from "@utils/hooks/useCollection";
import { useQuery, useQueryClient } from "react-query";


interface CardProps {
    collection: CollectionData
    airdrop: AirdropData
}

const CollectionCard = ({ collection, airdrop }: CardProps) => {
    // console.log(airdrop.mintDate)
    const mintDate = airdrop.mintDate.split('T')[0].split("-")[1] + "-" + airdrop.mintDate.split('T')[0].split("-")[2];


    return (
      <Link href={`collections/${collection.address}`}>
      <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer m-3">
      <div>
        <Image
          src={collection.logo ? collection.logo : 'https://dummyimage.com/480x480/ccc/000'}
          alt="test"
          width={1000}
          height={1000}
          className="object-cover w-66 h-48 mx-auto rounded-t-lg"
        />
      </div>
      <div className="rounded-b-lg w-72 h-32 mx-auto dark:bg-gray-800 shadow-lg opacity-90">
        <div className="text-xl pt-4 pb-4 font-bold flex items-center justify-center">
          {collection.name}
        </div>
        <div className="flex flex-wrap pl-5 text-lg">
          <div className="w-1/2">
            <div className="text-gray-400 text-sm">Minting</div>
            <div className="font-bold">{mintDate}</div>
          </div>
          <div className="w-1/2">
            <div className="text-gray-400 text-sm">Price</div>
            <div className="font-bold">{(airdrop.price) / 10 ** 18} MATIC</div>
          </div>
        </div>
      </div>
    </div>
    </Link>
    )
  }



export const AirdropUpcoming = ({upcomingAirdrops} : {upcomingAirdrops : AirdropData[]}) => {
    const queryClient = useQueryClient();
    const { getCollection } = useCollection()

    const fetchCollections = async () => {
        const getCollections = upcomingAirdrops.map((airdrop) =>
          queryClient.fetchQuery(['collection', airdrop.NFTaddress], () => getCollection(airdrop.NFTaddress))
        );
        return await Promise.all(getCollections);
      };
    
      const { data: collectionData, isLoading: collectionLoading } = useQuery(['collections'], fetchCollections, {
        enabled: !!upcomingAirdrops.length,
      });

    if (collectionLoading || !collectionData) return <LoadingSpinner2 />
    return (
        <>
            <div className="w-full lg:w-3/4 mx-auto justify-self-center text-3xl lg:text-4xl font-bold my-20 text-gray-800 dark:text-gray-100">
                <h2 className="text-2xl md:text-2xl lg:text-3xl font-extrabold py-8 px-2 text-center w-full">Upcoming Events</h2>
                <div className="flex flex-wrap justify-center mb-20">
                    <CollectionCard collection={collectionData[0]} airdrop={upcomingAirdrops[0]} />
                    <CollectionCard collection={collectionData[0]} airdrop={upcomingAirdrops[0]} />
                    <CollectionCard collection={collectionData[0]} airdrop={upcomingAirdrops[0]} />
                </div>
            </div>
        </>
    )
}