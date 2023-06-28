import { CollectionData } from "@utils/types/collection.interface";
import tw from "tailwind-styled-components";
import Image from "next/image";
import Link from "next/link";

export const CollectionWrap = tw.div`
     rounded-lg mt-16 mx-auto w-full flex flex-col items-center
`;

interface CollectionProps {
  collectionDatas: CollectionData[]
}


const CollectionCard = ({ collection }: { collection : CollectionData }) => {
  return (
    <Link href={`collections/${collection.address}`}>
    <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer m-1.5">
    <div>
      <Image
        src={collection.logo ? collection.logo : 'https://dummyimage.com/480x480/ccc/000'}
        alt="test"
        width={1000}
        height={1000}
        className="object-fill w-72 h-60 mx-auto rounded-t-lg"
      />
    </div>
    <div className="rounded-b-lg w-72 h-32 mx-auto dark:bg-gray-800 shadow-lg opacity-90 ">
      <div className="text-xl text-center pt-4 pb-4 font-bold">
        {collection.name}
      </div>
      <div className="flex flex-wrap pl-5">
        <div className="w-1/2">
          <div className="text-gray-400">Floor</div>
          <div className="font-bold">{collection.floorPrice} MATIC</div>
        </div>
        <div className="w-1/2">
          <div className="text-gray-400">Total Volume</div>
          <div className="font-bold">{collection.totalVolume} MATIC</div>
        </div>
      </div>
    </div>
  </div>
  </Link>
  )
}


const Collection = ({ collectionDatas }: CollectionProps) => {
  const sortedCollectionDatas = collectionDatas.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <>
      <CollectionWrap>
        <div className="text-3xl font-bold px-5 py-4">New Collections</div>
        <div className="flex flex-wrap justify-center w-5/6">
          {sortedCollectionDatas.map((collection) => (
            <CollectionCard key={collection._id} collection={collection} />
          ))}
        </div>
      </CollectionWrap>
    </>
  );
};

export default Collection;
