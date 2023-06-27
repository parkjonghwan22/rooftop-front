import tw from "tailwind-styled-components";
import Image from "next/image";

export const MynftsWrap = tw.div`
     rounded-lg mx-auto w-full flex flex-col items-center pb-6
`;

export const Mynft = () => {
  return (
    <>
      <MynftsWrap>
        <div className="flex flex-wrap justify-center mt-2 ">
          <div className="hover:animate-[wiggle_1s_ease-in-out_infinite] cursor-pointer mx-2 mt-3 ">
            <div>
              <Image
                src="http://localhost:3000/test2.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-20 h-20 mx-auto rounded-full border-2 dark:border-white"
              />
            </div>
          </div>
          <div className="hover:animate-[wiggle_1s_ease-in-out_infinite] cursor-pointer mx-2 mt-3">
            <div>
              <Image
                src="http://localhost:3000/test3.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-20 h-20 mx-auto rounded-full border-2 dark:border-white"
              />
            </div>
          </div>
          <div className="hover:animate-[wiggle_1s_ease-in-out_infinite] cursor-pointer mx-2 mt-3">
            <div>
              <Image
                src="http://localhost:3000/test6.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-20 h-20 mx-auto rounded-full border-2 dark:border-white"
              />
            </div>
          </div>
          <div className="hover:animate-[wiggle_1s_ease-in-out_infinite] cursor-pointer mx-2 mt-3">
            <div>
              <Image
                src="http://localhost:3000/test8.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-20 h-20 mx-auto rounded-full border-2 dark:border-white"
              />
            </div>
          </div>
          <div className="hover:animate-[wiggle_1s_ease-in-out_infinite] cursor-pointer mx-2 mt-3">
            <div>
              <Image
                src="http://localhost:3000/test5.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-20 h-20 mx-auto rounded-full border-2 dark:border-white"
              />
            </div>
          </div>
          <div className="hover:animate-[wiggle_1s_ease-in-out_infinite] cursor-pointer mx-2 mt-3">
            <div>
              <Image
                src="http://localhost:3000/test2.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-20 h-20 mx-auto rounded-full border-2 dark:border-white"
              />
            </div>
          </div>
          <div className="hover:animate-[wiggle_1s_ease-in-out_infinite] cursor-pointer mx-2 mt-3">
            <div>
              <Image
                src="http://localhost:3000/test7.png"
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-20 h-20 mx-auto rounded-full border-2 dark:border-white"
              />
            </div>
          </div>
        </div>
      </MynftsWrap>
    </>
  );
};
