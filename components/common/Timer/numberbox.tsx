interface numProp {
  num: string | number;
  unit: string;
  flip: boolean;
}

export const NumberBox = ({ num, unit, flip }: numProp) => {
  return (
    <div className="flex flex-col items-center mt-4 px-2">
            <div className=" relative bg-transparent flex flex-col items-center justify-center rounded-lg w-16 h-16  text-2xl md:text-4xl ">
                <div className="rounded-t-lg rounded-b-lg bg-red-300 dark:bg-[#343650] w-full h-full"></div>

                <div className="text-xl absolute text-white z-10 font-bold font-redhat md:text-xl font-mono ">
                    {num}
                </div>

                <div className=" rounded-b-lg rounded-t-lg bg-red-400 dark:bg-[#2c2e3f] w-full h-full"></div>

                <div className={`absolute  w-full h-1/2 top-0  rounded-t-lg z-5 ${flip ? 'animate-flip bg-red-500 dark:bg-blue-400' : 'bg-transparent'}`}></div>
                {/* Two Small Dots */}
                <div className="absolute -right-1 top-[30px] rounded-full w-[12px] h-[12px] bg-red-500 dark:bg-[#1e1f29]"></div>
                <div className="absolute -left-1 top-[30px] rounded-full w-[12px] h-[12px] bg-red-500 dark:bg-[#1e1f29]" ></div>

            </div>
            
        </div>
  );
};
