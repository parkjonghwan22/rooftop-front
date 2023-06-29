const discover = [
    {
        total: "100k+",
        field: "Sales",
    },
    {
        total: "100k+",
        field: "Auctions",
    },
    {
        total: "100k+",
        field: "Artists",
    },
];

export const Hero = () => {

    return (
        <div className="w-3/4 flex flex-col items-center justify-center gap-10 font-worksans lg:gap-20 mb-5 md:mb-32">
            <div className="flex flex-col items-center gap-10 px-[15px] capitalize sm:max-w-[590px] md:max-w-[690px] md:gap-20 md:px-0 lg:max-w-[900px] lg:gap-[100px] xl:max-w-[1050px]">
                <div className=" flex w-full flex-col justify-between gap-[30px] sm:flex-row">
                    <div className="flex flex-col gap-5 text-start text-gray-800 dark:text-white md:max-w-[330px] md:gap-[30px] lg:max-w-[510px]">
                        <div className=" text-start text-[28px] font-semibold capitalize leading-[39px] md:text-[38px] md:leading-[45px] lg:text-[67px] lg:leading-[73px]">
                            Discover<br></br> digital art & Collect NFTs
                        </div>
                        <div className="-mt-[10px] mb-10 text-start text-base font-normal md:text-base text-md md:text-lg">
                            Welcome to Rooftop Market<br></br>
                            explore the world of NFTs
                        </div>
                        <div className="hidden gap-[30px] sm:flex sm:flex-col">
                            <div className="flex w-full justify-between gap-[30px]">
                                {discover.map((data, index) => {
                                    return (
                                        <div key={index} className="w-full max-w-[150px]">
                                            <div className="!font-spacemono text-[22px] font-bold md:text-[22px] md:leading-[35px] lg:leading-[39px]">
                                                {data.total}
                                            </div>
                                            <div className="text-base font-normal leading-[38px] md:text-base lg:text-[24px]">
                                                {data.field}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="w-full rounded-xl text-gray-800 dark:text-white invisible h-0 md:visible md:max-w-[300px] lg:max-w-[460px]">
                        <img
                            src={"https://www.tailwindtap.com/assets/crypto/space.png"}
                            alt="space"
                            className="w-full"
                        />
                        <div className="flex h-24 flex-col justify-start gap-2.5 rounded-b-[20px] shadow-lg dark:bg-gray-800 dark:shadow-cyan-700/50 px-5 py-4">
                            <div className="flex text-2xl font-semibold leading-[30px]">
                                #34. Space Opera
                            </div>
                            <div className="flex items-center gap-2">
                                <img src={"https://www.tailwindtap.com/assets/crypto/man.svg"} alt="ani" />
                                <div className="text-base font-normal text-lg">
                                    Astronaut
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};