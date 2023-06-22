import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TokenData, MetaData } from "@utils/types/collection.interface"
import { useQuery } from 'react-query';
import { Icon } from '@iconify/react';

export const NFTCard = ({ token }: { token: TokenData }) => {
  const router = useRouter();
  const { _id } = router.query;

  const fetchMetadata = async (metadata: string) => {
    const ipfsUrl = metadata.replace('ipfs://', '');
    const response = await fetch(`https://ipfs.io/ipfs/${ipfsUrl}`);
    if (!response.ok) {
      throw new Error('메타 데이터를 가져오는데 실패했습니다');
    }
    return response.json();
  };

  const fetchImageData = async (ipfs: string) => {
    const ipfsUrl = ipfs.replace('ipfs://', '');
    const response = await fetch(`https://ipfs.io/ipfs/${ipfsUrl}`);
    if (!response.ok) {
      throw new Error('이미지 데이터를 가져오는데 실패했습니다');
    }
    const imageData = await response.blob();
    const imageUrl = URL.createObjectURL(imageData);
    return imageUrl;
  };

  const { data: metaData, isLoading: isMetadataLoading, } = useQuery(['metadata', token.metadata], () => fetchMetadata(token.metadata));
  const { data: imageUrl, isLoading: isImageLoading } = useQuery(['image', metaData?.ipfs], () => fetchImageData(metaData?.ipfs));

  const isLoading = isMetadataLoading || isImageLoading;

  if (isLoading) return <div>Loading...</div> // 로딩 컴포넌트 필요
  return (
    <div className="relative w-72 h-fit mb-10 mx-5 rounded-lg shadow-lg dark:bg-gray-800 overflow-hidden">
      <Link href={`/collections/${_id}/nft?id=${token.tokenId}`}>
        <div className="hover:transform hover:scale-110 transition duration-300 cursor-pointer h-72">
          <Image src={imageUrl ? imageUrl : "https://dummyimage.com/480x480/ccc/000"} alt="nft image" width={480} height={480} className="w-full h-full object-cover" />
        </div>
      </Link>
      <div className="px-5 pt-4 pb-5">
        {(token.openingPrice !== 0) &&
          <div className="absolute top-5 left-5 text-white bg-red-600 px-2.5 py-1.5 rounded-lg text-sm font-semibold">경매 종료 시간 : {token.auctionEndTime} 시간 후
          </div>}
        <div className="flex items-center mb-4">
          <span className="pr-2 text-gray-500 dark:text-gray-400">#{token.tokenId}</span>
          <h4 className="font-bold text-2xl">{metaData?.name}</h4>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl text-gray-900 dark:text-white flex items-center">
            <Icon icon="cryptocurrency-color:matic" className="mr-1" />{token.price / (10 ** 18)}
          </span>
          <button
            className="rounded-lg bg-sky-600 px-4 py-2 text-center text-sm text-white hover:bg-sky-800 focus:outline-none  dark:bg-cyan-600 dark:hover:bg-cyan-700 transition duration-100"
          >
            장바구니에 담기
          </button>
        </div>
      </div>
    </div>
  )
}
