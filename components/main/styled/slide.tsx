import tw from "tailwind-styled-components";
import Image from "next/image";

export const SlideWrap = tw.div`
mx-auto w-1100 h-450 rounded-lg overflow-hidden dark:bg-gray-900 bg-gary-100 shadow-xl
`;

export const SlideBox = tw.div`
w-10/12 h-450 mx-auto flex items-center
`;

const Logo = tw.svg`
  w-8 h-8 text-white 
`;

const Slide = () => {
  return (
    <>
      <SlideWrap>
        <SlideBox>
          <Image
            src="http://localhost:3000/test.png"
            alt="test"
            width={1000}
            height={1000}
            className="object-fill w-80 h-80 border-4 ml-20"
          />
          <div className="w-full h-80 ml-20 mt-11">
            <div className="flex flex-wrap">
              <div className="w-full mb-10">
                <span className="text-3xl font-bold">Space Cat : NFT #452</span>
              </div>
              <div className="w-full mb-10">
                <span className="text-lg font-medium block mb-5">
                  Current Price
                </span>
                <span className="text-4xl mr-5 font-semibold">0.029 ETH</span>
                <span>$50.15</span>
              </div>
              <div className="w-full">
                <div className="w-4/6 h-16 font-bold dark:bg-red-500 mr-10 rounded-lg cursor-pointer flex items-center">
                  <div className="w-full text-center text-xl">Buy now</div>
                  <div className="w-24 h-full border-l-2 flex justify-center items-center">
                    <Logo
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="white"
                        d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2m6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5H16Z"
                      />
                    </Logo>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SlideBox>
      </SlideWrap>
    </>
  );
};

export default Slide;
