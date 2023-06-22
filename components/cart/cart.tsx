import tw from "tailwind-styled-components";
import Image from "next/image";
import { Button } from "@components/header/styled/Header.styled";

const Cart = () => {
  return (
    <>
      <div className="mx-auto w-5/6">
        <div className=" flex flex-col flex flex-col ">
          <header className="pl-20 py-4 border-b-2 border-gray-200 dark:border-gray-400">
            <h2 className=" font-semibold text-3xl mb-5 ">My Cart</h2>
          </header>
          <div>
            <div className="flex pt-3 pb-3 my-5 justify-center shadow-lg">
              <div>
                <Image
                  src="http://localhost:3000/test3.png"
                  alt="test"
                  width={1000}
                  height={1000}
                  className="object-fill w-48 h-44 rounded-lg"
                />
              </div>
              <div className="w-2/6 flex flex-col justify-center pl-9">
                <div className="mb-1">
                  <span className="text-2xl font-bold mr-2">Space Cat</span>
                  <span className="text-sm font-bold">285</span>
                </div>
                <div className="text-xl font-bold mb-1 flex">
                  Space Cat
                  <svg
                    className="my-auto ml-2 h-5 fill-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-gray-400">
                  Creator earnings: 0.5%
                </div>
              </div>
              <div className="mt-20">
                <div className="bg-red-500 px-4 py-2 rounded-lg font-bold hover:bg-gray-400 hover:text-white">
                  Remove
                </div>
              </div>
              <div className="text-xl font-bold mt-20 ml-64">0.2187 ETH</div>
            </div>
            <div className="flex pt-3 pb-3 my-5 justify-center shadow-lg">
              <div>
                <Image
                  src="http://localhost:3000/test5.png"
                  alt="test"
                  width={1000}
                  height={1000}
                  className="object-fill w-48 h-44 rounded-lg"
                />
              </div>
              <div className="w-2/6 flex flex-col justify-center pl-9">
                <div className="mb-1">
                  <span className="text-2xl font-bold mr-2">Space Cat</span>
                  <span className="text-sm font-bold">285</span>
                </div>
                <div className="text-xl font-bold mb-1 flex">
                  Space Cat
                  <svg
                    className="my-auto ml-2 h-5 fill-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-gray-400">
                  Creator earnings: 0.5%
                </div>
              </div>
              <div className="mt-20">
                <div className="bg-red-500 px-4 py-2 rounded-lg font-bold hover:bg-gray-400 hover:text-white">
                  Remove
                </div>
              </div>
              <div className="text-xl font-bold mt-20 ml-64">0.2187 ETH</div>
            </div>
            <div className="flex pt-3 pb-3 my-5 justify-center shadow-lg">
              <div>
                <Image
                  src="http://localhost:3000/test8.png"
                  alt="test"
                  width={1000}
                  height={1000}
                  className="object-fill w-48 h-44 rounded-lg"
                />
              </div>
              <div className="w-2/6 flex flex-col justify-center pl-9">
                <div className="mb-1">
                  <span className="text-2xl font-bold mr-2">Space Cat</span>
                  <span className="text-sm font-bold">285</span>
                </div>
                <div className="text-xl font-bold mb-1 flex">
                  Space Cat
                  <svg
                    className="my-auto ml-2 h-5 fill-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-gray-400">
                  Creator earnings: 0.5%
                </div>
              </div>
              <div className="mt-20">
                <div className="bg-red-500 px-4 py-2 rounded-lg font-bold hover:bg-gray-400 hover:text-white">
                  Remove
                </div>
              </div>
              <div className="text-xl font-bold mt-20 ml-64">0.2187 ETH</div>
            </div>
          </div>

          <div className="md:flex justify-end w-full mx-auto border-t-2 border-gray-200 dark:border-gray-400 pt-8">
            <div className="text-3xl font-bold">Total Price</div>
            <div className="w-1/5 text-right md:mr-24">
              <div className="text-2xl font-bold">0.23 ETH</div>
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
    </>
  );
};

export default Cart;
