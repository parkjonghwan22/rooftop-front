import Image from "next/image"
import { Button } from "@components/common/button"
import { useInput } from "@utils/hooks/useInput"
import config from "../../config"
import { AirdropSlide } from "./airdropslide"

const AddressInput = () => {
    const userAddress = useInput('')

    const handleJoinAirdrop = async () => {
        // 에어드랍 조인
    }

    return (
        <div className="flex w-full lg:w-3/4 mx-auto flex-col md:flex-row items-center justify-center rounded-b-xl p-6 bg-[#3B3B3B] lg:h-[140px]">
            <div className="flex w-full justify-center items-center flex-row text-start text-white">
                <div className="flex flex-col gap-2.5">
                    <div className="text-2xl hidden md:block lg:text-2xl xl:text-4xl font-semibold pr-10 xl:pr-36 mb-4">
                        Trade NFTs & <br></br> Get Rewards
                    </div>
                </div>
                <div className="w-96 h-[60px] flex items-center rounded-xl bg-white md:flex">
                    <input
                        name="address"
                        value={userAddress.value}
                        onChange={userAddress.onChange}
                        placeholder="Enter your address"
                        className="w-2/3 outline-none bg-transparent px-4 text-md text-gray-800"
                    />
                    <div className="w-1/3 px-3 pb-4 md:pb-0">
                        <Button onClick={handleJoinAirdrop} color="purple">Join</Button>
                    </div>
                </div>
            </div>
        </div>)
}


const AirdropBanner = () => {
    return (
        <div className="relative w-full lg:w-3/4 mx-auto from-transparent to-[#A259FF] bg-cover bg-no-repeat before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-gradient-to-b">
            <div className="w-full rounded-t-xl overflow-hidden">
                <Image
                    src={`${config.APP_URL}/maincard.png`}
                    alt="image"
                    width={1000}
                    height={1000}
                    className="h-[660px] w-full object-cover"
                />
            </div>
            <div className="absolute -bottom-[25%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-[30px] sm:-bottom-[10%] sm:gap-20 md:flex-row">
                <div className="flex flex-col gap-3 lg:gap-4 lg:mt-4 text-white ">
                    <div className="max-w-[375px] text-start text-4xl font-semibold leading-[45px] sm:whitespace-nowrap">
                        Test Collection
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 mr-2">
                            <Image
                                className="rounded-full"
                                src="http://127.0.0.1:3000/default-image.png"
                                width={400}
                                height={400}
                                alt="collector"
                            />
                        </div>
                        <div className="font-medium text-md lg:text-xl">
                            Test Artist
                        </div>
                    </div>
                </div>
                <div className="flex items-end text-white mb-10 lg:mb-5">
                    <div className="flex h-[144px] w-[295px] flex-col items-center justify-center gap-2.5 rounded-[20px] bg-[#3b3b3b80]">
                        <div className="flex max-w-[235px] flex-col gap-2.5">
                            <div className="!font-spacemono flex w-full items-start">
                                Mint start in:
                            </div>
                            <div className="flex gap-2.5">
                                <div className="flex flex-col gap-[5px]">
                                    <div className="text-[38px] font-bold leading-[45px]">
                                        24
                                    </div>
                                    <div className="text-start text-xs font-normal leading-3">
                                        Hours
                                    </div>
                                </div>
                                <div className="text-[38px] font-bold leading-[45px]">:</div>
                                <div className="flex flex-col gap-[5px]">
                                    <div className="text-[38px] font-bold leading-[45px]">
                                        00
                                    </div>
                                    <div className="text-start text-xs font-normal leading-3">
                                        Minutes
                                    </div>
                                </div>
                                <div className="text-[38px] font-bold leading-[45px]">:</div>
                                <div className="flex flex-col gap-[5px]">
                                    <div className="text-[38px] font-bold leading-[45px]">
                                        00
                                    </div>
                                    <div className="text-start text-xs font-normal leading-3">
                                        Seconds
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export const Airdrop = () => {

    return (
        <>
            <AirdropBanner />
            <AddressInput />
            {/* <AirdropSlide collectionData={collectionData} /> */}
            <div>leaderboard</div>
        </>
    )
}