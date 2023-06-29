import Image from "next/image";
import { FavoriteWrap } from "./styled/Favorites.styled";


export const Favorites = () => {
  return (
    <>
      <FavoriteWrap>
        <div className="flex flex-wrap justify-center mt-2">
          <div className="w-40 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3 border-2 rounded-lg">
            <div>
              <Image
                src="http://localhost:3000/test2.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-42 h-32 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-42 h-12 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-sm text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
            </div>
          </div>
          <div className="w-40 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3 border-2 rounded-lg">
            <div>
              <Image
                src="http://localhost:3000/test3.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-42 h-32 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-42 h-12 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-sm text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
            </div>
          </div>
          <div className="w-40 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3 border-2 rounded-lg">
            <div>
              <Image
                src="http://localhost:3000/test6.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-42 h-32 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-42 h-12 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-sm text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
            </div>
          </div>
          <div className="w-40 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3 border-2 rounded-lg">
            <div>
              <Image
                src="http://localhost:3000/test7.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-42 h-32 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-42 h-12 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-sm text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
            </div>
          </div>
          <div className="w-40 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3 border-2 rounded-lg">
            <div>
              <Image
                src="http://localhost:3000/test2.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-42 h-32 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-42 h-12 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-sm text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
            </div>
          </div>
          <div className="w-40 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3 border-2 rounded-lg">
            <div>
              <Image
                src="http://localhost:3000/test3.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-42 h-32 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-42 h-12 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-sm text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
            </div>
          </div>
          <div className="w-40 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3 border-2 rounded-lg">
            <div>
              <Image
                src="http://localhost:3000/test6.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-42 h-32 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-42 h-12 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-sm text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
            </div>
          </div>
          <div className="w-40 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3 border-2 rounded-lg">
            <div>
              <Image
                src="http://localhost:3000/test7.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-42 h-32 mx-auto rounded-t-lg"
              />
            </div>
            <div className="rounded-b-lg w-42 h-12 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
              <div className="text-sm text-center pt-4 pb-4 font-bold">
                Missed Yet Anthor..
              </div>
            </div>
          </div>
        </div>
      </FavoriteWrap>
    </>
  );
};
