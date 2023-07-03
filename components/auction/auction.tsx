import { TimerContainer } from "@components/common/Timer/timecontainer";
import { AuctionModal } from "@components/common/modal/Auction";
import { TokenData } from "@utils/types/nft.interface";
import { useEffect, useState } from "react";
import { AuctionContent } from "./auctionContent";
import { useMarket } from "@utils/hooks/useMarket";


interface AuctionProps {
  token: TokenData;
}

export const Auction = ({ token }: AuctionProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const { market } = useMarket()

  const getAuction = async () => {
    const data = await market.TokenOnSale(token.id)
    console.log(data)
  }




  const handleTimerStart = (time: number) => {
    const timeToMinutes = time * 60;
    const countDownDate = new Date().getTime() + timeToMinutes * 1000;

    const updateTime = setInterval(() => {
      const now = new Date().getTime();
      const difference = countDownDate - now;

      const newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const newHours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const newMinutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(newDays);
      setHours(newHours);
      setMinutes(newMinutes);
      setSeconds(newSeconds);

      if (difference <= 0) {
        clearInterval(updateTime);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    }, 1000);
  };

  useEffect(() => {
    if(!market) return

    getAuction()
  }, [market])

  return (
    <>
      <div className="w-full mt-4">
        <TimerContainer
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
        <button
          type="button"
          onClick={() => {
            setIsOpenModal(true);
          }}
          className=" mt-4 inline-flex items-center justify-center rounded-md border-2 border-transparent dark:bg-purple-500 bg-none px-32 py-2 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow dark:hover:bg-blue-800"
        >
          경매올리기
        </button>
      </div>
      {isOpenModal && (
        <AuctionModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
          <AuctionContent token={token} setIsOpenModal={setIsOpenModal} handleTimerStart={handleTimerStart}/>
        </AuctionModal>
      )}
    </>
  );
};
