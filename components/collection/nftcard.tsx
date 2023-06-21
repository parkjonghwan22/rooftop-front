import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const NFTCard = () => {
  const router = useRouter();
  const { _id } = router.query;
  

  return (
    <div className="relative w-80 h-fit mb-10 mx-5 rounded-lg shadow-lg dark:bg-gray-800 overflow-hidden">
      <Link href={`/collections/${_id}/nft?id=1`}>
        <div className="hover:transform hover:scale-105 transition duration-300 cursor-pointer">
          <img src="https://i.seadn.io/gcs/files/0b2e05b9d571fac5a229998b7322fed5.png?auto=format&dpr=1&w=640" className="w-full h-full object-cover" />
        </div>
      </Link>
      <div className="px-5 pt-4 pb-5">
        <div className="absolute top-5 left-5 text-white bg-red-600 px-2.5 py-1.5 rounded-lg text-sm font-semibold">경매 종료 시간 : 1시간 후</div>
        <div className="flex items-center h-8">
          <Image src="http://127.0.0.1:3000/default-image.png" alt="creator" width={100} height={100} className="rounded-full mr-1.5 w-7 h-7" />
          <span className="text-md tracking-tight text-gray-900 dark:text-white">collection name</span>
        </div>
        <h4 className="font-bold text-xl my-4">TEST NFT</h4>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">$100</span>
          <button
            className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none  dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 transition duration-100"
          >
            장바구니에 담기
          </button>
        </div>
      </div>
    </div>
  )
}     