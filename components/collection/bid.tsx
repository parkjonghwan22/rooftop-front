import tw from "tailwind-styled-components";
import Image from "next/image";

const Bid = () => {
  return (
    <>
      <div className="mx-auto px-4 py-4 h-full">
        <div className="text-2xl font-bold ml-12">입찰하기</div>
        <div className="flex flex-wrap h-4/5 mt-4">
          <div className="w-1/2">
            <div className="mt-5">
              <Image
                src="http://localhost:3000/test2.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-64 h-64 mx-auto rounded-full border-4 border-red-500 dark:border-white"
              />
            </div>
            <div className="text-center mt-4 text-2xl font-bold">
              NFT name..
            </div>
          </div>
          <div className="w-1/2 px-2 py-2">
            <div className="text-sm text-gray-400">네트워크</div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 128 128"
              >
                <path
                  fill="#7950DD"
                  d="M64 0c35.348 0 64 28.652 64 64s-28.652 64-64 64S0 99.348 0 64S28.652 0 64 0zm0 0"
                />
                <path
                  fill="#fff"
                  d="M85.898 49.242a5.76 5.76 0 0 0-5.418 0l-12.214 7.223l-8.532 4.742l-12.214 7.227a5.76 5.76 0 0 1-5.418 0l-9.707-5.649a5.423 5.423 0 0 1-2.711-4.52V46.989a4.972 4.972 0 0 1 2.71-4.52l9.708-5.417a5.738 5.738 0 0 1 5.418 0l9.707 5.418a5.423 5.423 0 0 1 2.71 4.52v7.218l8.329-4.965v-6.996a4.963 4.963 0 0 0-2.664-4.52l-17.86-10.382a5.738 5.738 0 0 0-5.418 0L24.266 37.727a4.608 4.608 0 0 0-2.934 4.52v20.991a4.967 4.967 0 0 0 2.711 4.496l18.059 10.407a5.76 5.76 0 0 0 5.418 0l12.214-7l8.352-4.965l12.172-6.977a5.76 5.76 0 0 1 5.418 0l9.707 5.418a5.419 5.419 0 0 1 2.707 4.52v11.062a4.967 4.967 0 0 1-2.707 4.516l-9.707 5.64a5.738 5.738 0 0 1-5.418 0l-9.707-5.418a5.416 5.416 0 0 1-2.711-4.515v-7.25l-8.106 4.738v7.219a4.969 4.969 0 0 0 2.707 4.52L80.5 100.03a5.746 5.746 0 0 0 5.422 0l18.058-10.383a5.42 5.42 0 0 0 2.688-4.511v-21a4.964 4.964 0 0 0-2.711-4.516zm0 0"
                />
              </svg>
              <div className="font-bold ml-1">Polygon</div>
            </div>
            <div className="mt-2 text-sm text-gray-400">시작가</div>
            <div className="font-bold">$90</div>
            <div className="mt-2 text-sm text-gray-400">
              경매 종료까지 남은시간
            </div>
            <div className="font-bold">4d 11h 35m ..</div>
            <div className="mt-2 border-2 dark:border-0 dark:bg-gray-900 rounded-lg px-2 py-2">
              <div className="text-sm text-gary-400">
                입찰가는 $90 이상이어야 합니다
              </div>
              <input
                className="mt-2 w-full py-3 pl-2 border rounded-lg focus:outline-none dark:border-0 dark:bg-gray-700 "
                placeholder="입찰 금액을 입력해주세요"
              />
              <div className="mt-4 bg-red-500 dark:bg-purple-500 rounded-lg px-20 py-3 text-2xl font-bold text-center hover:bg-gray-400 dark:hover:bg-gray-400 text-white cursor-pointer">
                입찰하기
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bid;
