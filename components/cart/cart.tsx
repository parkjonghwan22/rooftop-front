import Image from "next/image";
import request from "@utils/request";
import { CartType } from "@utils/types/user.interface";
import { Icon } from "@iconify/react";
import { Button } from "@components/common/button";
import { useIpfs } from "@utils/hooks/useIpfs";
import { useCoinGecko } from "@utils/hooks/useCoingecko";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useState } from "react";
import { LoadingSpinner } from "@components/common/loading";
import { useMarket } from "@utils/hooks/useMarket";
import { toast } from 'react-toastify'
import { useDecode } from "@utils/hooks/useDecode";

interface CartItemProps {
  address?: string
  item: CartType
  convertKRW: (maticAmount: number) => string | undefined;
}


const CartItem = ({ item, address, convertKRW }: CartItemProps) => {
  const { metaData, imageUrl, isLoading } = useIpfs(item)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  const handleDeleteCartItem = async (id: number) => {
    
    try {
      if (!address) return
      setIsDeleteLoading(true)
      const response = await request.delete(`cart/${address}/${id}`);
      if (response.status === 200) {
        setIsDeleteLoading(false)
        setIsDeleted(true)
      }
    } catch (error) {
      console.error("error :", error);
    }
  };

  if (isLoading || isDeleteLoading)
    return (
      <div className="py-10"><LoadingSpinner /></div>
    )
  if (isDeleted) return null
  return (
    <li className="flex py-6">
      <Link href={`/collections/${item.NFTaddress}/nft?id=${item.id}`}>
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <Image
            src={imageUrl ? imageUrl : 'https://dummyimage.com/480x480/ccc/000'}
            alt="nft image"
            width={1000}
            height={1000}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </Link>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-100">
            <div>
              <p>{metaData.name}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">#{item.id}</p>
            </div>
            <div>
              <p className="font-bold flex items-center"><Icon icon="cryptocurrency-color:matic" className="mr-2" />{item.price / 10 ** 18}</p>
              <p className="text-green-600">{convertKRW(item.price)}￦</p>
            </div>
          </div>
          <div className="flex mt-2 justify-end">
            <button onClick={() => { handleDeleteCartItem(item.id) }} className="py-1.5 px-3 bg-red-500 rounded hover:bg-red-700 transition-all duration-150" >Remove</button>
          </div>
        </div>
      </div>
    </li>
  )
}


interface CartProps {
  setIsOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartData: CartType[]
}

const Cart = ({ cartData, setIsOpenCart }: CartProps) => {
  const { address } = useAccount()
  const { convertKRW } = useCoinGecko()
  const { market, convertToWei, updateCollection } = useMarket()
  const { decodeTransfers } = useDecode()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  let totalPrice = 0;
  cartData.forEach(item => { totalPrice += item.price })
  const ids = cartData.map(item => item.id);

  const handleBuyAllItems = async () => {
    try {
      setIsLoading(true)
      const parsedPrice = convertToWei(totalPrice, 0)
      console.log(ids)
      const buyNFT = await market.buyNfts(ids, {
        from: address,
        value: parsedPrice,
      })
      const receipt = await buyNFT.wait()
      console.log(receipt)
      if (receipt) {
        const response = await request.delete(`cart/${address}`);
        if (response.status === 200) {
          setIsDeleted(true)
          setIsLoading(false)
        }
      }
      if (receipt.logs) {
        const decodedDatas = decodeTransfers(receipt, cartData)
        for (const decodedData of decodedDatas) {
          const response = await request.post("event/transfer", {
            ...decodedData,
          });
          if (response.statusText === "Created") {
            toast.success("NFT transaction was successful!");
            updateCollection(decodedData.NFTaddress);
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="z-10 fixed inset-y-0 right-0 flex max-w-full pl-10">
      <div className="w-screen max-w-md">
        <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-900 shadow-xl  animate-slideLeft">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100" id="slide-over-title">My Cart</h2>
              <div className="ml-3 flex h-7 items-center">
                <button type="button" onClick={() => setIsOpenCart(false)} className="-m-2 p-2 text-gray-400 dark:text-gray-200 hover:text-gray-500 dark:hover:text-white">
                  <Icon icon="ph:x" className="ml-auto text-xl cursor-pointer" />
                </button>
              </div>
            </div>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200 dark:divide-gray-600">
                  {cartData && !isDeleted ? cartData.map((item) => <CartItem key={item.id} item={item} address={address} convertKRW={convertKRW} />) : <></>}
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 px-4 py-5 sm:px-5">
            <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-100">
              <p className="text-lg font-bold">Total Price</p>
              <div>
                <p className="font-bold text-lg flex items-center"><Icon icon="cryptocurrency-color:matic" className="mr-2" />{totalPrice / 10 ** 18}</p>
                <p className="text-green-600 font-bold">{convertKRW(totalPrice)}￦</p>
              </div>
            </div>
            <div className="my-6">
              <Button onClick={handleBuyAllItems} color="purple" size="w-full" fontSize="lg">{isLoading ? <><LoadingSpinner />Processing transaction...</> : 'Complete purchase'}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
