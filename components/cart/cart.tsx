import tw from "tailwind-styled-components";
import Image from "next/image";
import { Button } from "@components/header/styled/Header.styled";
import request from "@utils/request";
import { CartType } from "@utils/types/user.interface";
import { Icon } from "@iconify/react";



const CartItem = () => {
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="#">Throwback Hip Bag</a>
            </h3>
            <p className="ml-4">$90.00</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">Salmon</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty 1</p>

          <div className="flex">
            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
          </div>
        </div>
      </div>
    </li>

  )

}


interface CartProps {
  setIsOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartData: CartType
}


const Cart = ({ cartData, setIsOpenCart }: CartProps) => {




  // const handleDeleteCartItem = async (id) => {
  //   if (!address) return

  //   try {
  //     await request.delete(`cart/${address}/${id}`);
  //     console.log("장바구니 아이템이 삭제되었습니다.");
  //   } catch (error) {
  //     console.error("error :", error);
  //   }
  // };


  return (
    <div className="relative z-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-900 shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100" id="slide-over-title">My Cart</h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button type="button" onClick={() => setIsOpenCart(false)} className="-m-2 p-2 text-gray-400 dark:text-gray-200 hover:text-gray-500 dark:hover:text-white">
                        <Icon icon="ph:x" className="ml-auto text-xl cursor-pointer" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        <CartItem />
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-500 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-100">
                    <p>Total Price</p>
                    <div>
                      <p>20 MATIC</p>
                      <p className="text-green-500">$262.00</p>
                    </div>
                  </div>
                  <div className="my-6">
                    <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Complete purchase</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Cart;










//   <div className="flex pt-3 pb-3 my-5 ju  stify-center shadow-lg">
//   <div>
//     <Image
//       src="http://localhost:3000/test3.png"
//       alt="test"
//       width={1000}
//       height={1000}
//       className="object-fill w-48 h-44 rounded-lg"
//     />
//   </div>
//   <div className="w-2/6 flex flex-col justify-center pl-9">
//     <div className="mb-1">
//       <span className="text-2xl font-bold mr-2">Space Cat</span>
//       <span className="text-sm font-bold">285</span>
//     </div>
//     <div className="text-xl font-bold mb-1 flex">
//       Space Cat
//       <svg
//         className="my-auto ml-2 h-5 fill-blue-400"
//         xmlns="http://www.w3.org/2000/svg"
//         xmlnsXlink="http://www.w3.org/1999/xlink"
//         version="1.1"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//       >
//         <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
//       </svg>
//     </div>
//     <div className="text-sm font-bold text-gray-400">
//       Creator earnings: 0.5%
//     </div>
//   </div>
//   <div className="mt-20">
//     <div className="bg-red-500 px-4 py-2 rounded-lg font-bold hover:bg-gray-400 hover:text-white">
//       Remove
//     </div>
//   </div>
//   <div className="text-xl font-bold mt-20 ml-64">0.2187 ETH</div>
// </div>

{/* <>
      <div className="mx-auto w-5/6 mb-10">
        <div className=" flex flex-col flex flex-col ">
          <header className="pl-10 py-4 border-b-2 border-gray-200 dark:border-gray-400">
            <h2 className=" font-semibold text-3xl mb-5 ">My Cart</h2>
          </header>
          {cartData? <CartItem />: <span>Empty</span>}
          <div className="md:flex justify-end w-full mx-auto border-t-2 border-gray-200 dark:border-gray-400 pt-8">
            <div className="text-xl font-bold">Total Price</div>
            <div className="w-1/5 text-right md:mr-24">
              <div className="text-xl font-bold">0.23 MATIC</div>
              <div className="text-gray-400 ">$442.03</div>
            </div>
          </div>
          <div className="mr-24 flex justify-end">
            <div className="mt-4 bg-blue-500 rounded-lg px-20 py-3 text-2xl font-bold text-center hover:bg-gray-400 text-white">
              Complete purchase
            </div>
          </div>
        </div>
      </div>
    </> */}