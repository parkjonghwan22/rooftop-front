import { Icon } from "@iconify/react";
import { useState } from "react";
import { Modal } from "@components/common/modal/Modal";
import Cart from "@components/cart/cart";
import { useAccount } from "wagmi";
import request from "@utils/request";
import { useQuery } from "react-query";
import { LoadingSpinner } from "../loading/loading";

export const CartButton = () => {
  const { address } = useAccount()
  const [isOpenCart, setIsOpenCart] = useState(false)

  const getCart = async () => {
    try {
      if (!address) return
      const { data } = await request.get(`cart/${address}`);
      return data;
    } catch (error: unknown) {
      throw new Error(error as string);
    }
  };

  const { data: cartData, isLoading } = useQuery(
    ["cart"],
    () => getCart(),
    {
      cacheTime: 60 * 24 * 1000,
    },
  );


  if (isLoading) return <LoadingSpinner />
  return (
    <>
      <div className="ml-3">
        <button onClick={() => { setIsOpenCart(true) }} className="flex item-center relative flex">
          <Icon
            icon="material-symbols:shopping-cart"
            className="w-8 h-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition duration-150"
          />
          {(cartData.length >= 1) && <span className="absolute right-0 top-0 rounded-full bg-pink-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
            {cartData.length}
          </span>}
        </button>
      </div>
      {isOpenCart && <Cart cartData={cartData} setIsOpenCart={setIsOpenCart} />}
    </>
  );
};