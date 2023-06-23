import tw from "tailwind-styled-components";
import Image from "next/image";

export const FavoriteWrap = tw.div`
     rounded-lg mx-auto w-full flex flex-col items-center
`;

export const Favorites = () => {
  return (
    <>
      <FavoriteWrap>
        <div className="flex flex-wrap justify-center mt-2">
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3">
            <div>
              <Image
                src="http://localhost:3000/test2.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-xl text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
              <div className="flex flex-wrap pl-5">
                <div className="w-1/2">
                  <div className="text-gray-400">Floor</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
                <div className="w-1/2">
                  <div className="text-gray-400">Total Volume</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3">
            <div>
              <Image
                src="http://localhost:3000/test3.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-xl text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
              <div className="flex flex-wrap pl-5">
                <div className="w-1/2">
                  <div className="text-gray-400">Floor</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
                <div className="w-1/2">
                  <div className="text-gray-400">Total Volume</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3">
            <div>
              <Image
                src="http://localhost:3000/test6.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-xl text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
              <div className="flex flex-wrap pl-5">
                <div className="w-1/2">
                  <div className="text-gray-400">Floor</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
                <div className="w-1/2">
                  <div className="text-gray-400">Total Volume</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3">
            <div>
              <Image
                src="http://localhost:3000/test8.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-xl text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
              <div className="flex flex-wrap pl-5">
                <div className="w-1/2">
                  <div className="text-gray-400">Floor</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
                <div className="w-1/2">
                  <div className="text-gray-400">Total Volume</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3">
            <div>
              <Image
                src="http://localhost:3000/test5.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-xl text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
              <div className="flex flex-wrap pl-5">
                <div className="w-1/2">
                  <div className="text-gray-400">Floor</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
                <div className="w-1/2">
                  <div className="text-gray-400">Total Volume</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3">
            <div>
              <Image
                src="http://localhost:3000/test2.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-xl text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
              <div className="flex flex-wrap pl-5">
                <div className="w-1/2">
                  <div className="text-gray-400">Floor</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
                <div className="w-1/2">
                  <div className="text-gray-400">Total Volume</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3">
            <div>
              <Image
                src="http://localhost:3000/test6.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-xl text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
              <div className="flex flex-wrap pl-5">
                <div className="w-1/2">
                  <div className="text-gray-400">Floor</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
                <div className="w-1/2">
                  <div className="text-gray-400">Total Volume</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3">
            <div>
              <Image
                src="http://localhost:3000/test7.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-xl text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
              <div className="flex flex-wrap pl-5">
                <div className="w-1/2">
                  <div className="text-gray-400">Floor</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
                <div className="w-1/2">
                  <div className="text-gray-400">Total Volume</div>
                  <div className="font-bold">0.03 ETH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FavoriteWrap>
    </>
  );
};
