import { AirdropData } from "@utils/types/nft.interface";
import { useState, useEffect } from "react";

export const EventTimer = ({ airdrop }: { airdrop: AirdropData }) => {
    const getRemainingTime = () => {
        const now = new Date().getTime();
        const targetDate = new Date(airdrop.mintDate).getTime();
        const timeDiff = targetDate - now;

        if (timeDiff <= 0) {
            return {
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return {
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0')
        };
    };

    const [remainingTime, setRemainingTime] = useState(getRemainingTime());

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(getRemainingTime());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="flex items-end text-white mb-10 lg:mb-5">
            <div className="flex h-[144px] w-[295px] flex-col items-center justify-center gap-2.5 rounded-[20px] bg-[#3b3b3b80]">
                <div className="flex max-w-[235px] flex-col gap-2.5">
                    <div className="!font-spacemono flex w-full items-start">
                        Mint start in:
                    </div>
                    <div className="flex gap-2.5">
                        <div className="flex flex-col gap-[5px]">
                            <div className="text-[38px] font-bold leading-[45px]">
                                {remainingTime.hours}
                            </div>
                            <div className="text-start text-xs font-normal leading-3">
                                Hours
                            </div>
                        </div>
                        <div className="text-[38px] font-bold leading-[45px]">:</div>
                        <div className="flex flex-col gap-[5px]">
                            <div className="text-[38px] font-bold leading-[45px]">
                                {remainingTime.minutes}
                            </div>
                            <div className="text-start text-xs font-normal leading-3">
                                Minutes
                            </div>
                        </div>
                        <div className="text-[38px] font-bold leading-[45px]">:</div>
                        <div className="flex flex-col gap-[5px]">
                            <div className="text-[38px] font-bold leading-[45px]">
                                {remainingTime.seconds}
                            </div>
                            <div className="text-start text-xs font-normal leading-3">
                                Seconds
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
