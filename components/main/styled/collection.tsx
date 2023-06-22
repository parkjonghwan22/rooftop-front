import tw from "tailwind-styled-components";
import Image from "next/image";

export const CollectionWrap = tw.div`
     rounded-lg mt-16 mx-auto w-full flex flex-col items-center
`;

const Collection = () => {
  return (
    <>
      <CollectionWrap>
        <div className="text-3xl font-bold px-5 py-4">Collections</div>
        <div className="flex flex-wrap justify-center">
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer m-1.5">
            <div>
              <Image
                src="http://localhost:3000/test2.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto dark:bg-gray-800 shadow-lg opacity-90 ">
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
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer m-1.5">
            <div>
              <Image
                src="http://localhost:3000/test3.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto dark:bg-gray-800 shadow-lg opacity-90">
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
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer m-1.5">
            <div>
              <Image
                src="http://localhost:3000/test6.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto dark:bg-gray-800 shadow-lg opacity-90">
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
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer m-1.5">
            <div>
              <Image
                src="http://localhost:3000/test8.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto dark:bg-gray-800 shadow-lg opacity-90">
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
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer m-1.5">
            <div>
              <Image
                src="http://localhost:3000/test7.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg "
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto dark:bg-gray-800 shadow-lg opacity-90">
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
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer m-1.5">
            <div>
              <Image
                src="http://localhost:3000/test7.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg "
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto dark:bg-gray-800 shadow-lg opacity-90">
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
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer m-1.5">
            <div>
              <Image
                src="http://localhost:3000/test2.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto dark:bg-gray-800 shadow-lg opacity-90">
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
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer m-1.5">
            <div>
              <Image
                src="http://localhost:3000/test3.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto dark:bg-gray-800 shadow-lg opacity-90">
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
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer m-1.5">
            <div>
              <Image
                src="http://localhost:3000/test6.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto dark:bg-gray-800 shadow-lg opacity-90">
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
          <div className="w-72 hover:transform hover:scale-105 transition duration-300 cursor-pointer m-1.5">
            <div>
              <Image
                src="http://localhost:3000/test8.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-72 h-60 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-72 h-32 mx-auto dark:bg-gray-800 shadow-lg opacity-90">
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
      </CollectionWrap>
    </>
  );
};

export default Collection;
