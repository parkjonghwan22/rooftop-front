interface numProp {
  num: string | number;
  unit: string;
  flip: boolean;
}

export const NumberBox = ({ num, unit, flip }: numProp) => {
  return (
    <div className="flex flex-col items-center mt-4 px-2">
            <div className=" relative bg-transparent flex flex-col items-center justify-center rounded-lg w-16 h-16  text-2xl md:text-4xl ">
                <div className="rounded-t-lg rounded-b-lg bg-[#343650] w-full h-full"></div>

                <div className="text-xl absolute text-rose-500 z-10 font-bold font-redhat md:text-xl font-mono ">
                    {num}
                </div>

                <div className=" rounded-b-lg rounded-t-lg bg-[#2c2e3f] w-full h-full"></div>

                <div className={`absolute  w-full h-1/2 top-2  rounded-t-lg z-5 ${flip ? 'animate-flip bg-rose-200' : 'bg-transparent'}`}></div>
                {/* Two Small Dots */}
                <div className="absolute -right-1 top-[28px] rounded-full w-[12px] h-[12px] bg-[#1e1f29]"></div>
                <div className="absolute -left-1 top-[28px] rounded-full w-[12px] h-[12px] bg-[#1e1f29]" ></div>

            </div>
            
        </div>
  );
};
