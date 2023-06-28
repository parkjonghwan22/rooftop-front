import Image from "next/image";

export const ReSale = () => {
  return (
    <>
      <div className="px-3 py-3 w-full h-5/6">
        <div className="text-2xl font-bold ml-3">판매하기</div>
        <div className="flex mt-4">
          <div className="w-1/2 ml-4">
            <Image
              src="http://localhost:3000/test2.png"
              alt="test"
              width={1000}
              height={1000}
              className="object-fill w-60 h-60 mx-auto rounded-lg border-4 border-red-500 dark:border-white"
            />
          </div>
          <div className="w-1/2 flex flex-col mt-10 pl-10">
            <div className="flex items-center">
              <div className="text-xl font-bold">NFT Name</div>
              <div className="text-sm ml-2">#</div>
            </div>
            <div className="text-xl mr-4 mt-4 mb-1">Price</div>
            <input
              className="w-3/4 px-2 py-1 dark:bg-gray-900 rounded-lg"
              placeholder="0.000"
            />
            <div className="w-3/4 mt-4 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-purple-500 bg-none px-8 py-2 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-400 cursor-pointer">
              등록하기
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
