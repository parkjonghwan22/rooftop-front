import { TimerContainer } from "@components/common/Timer/timecontainer";
import { AuctionModal } from "@components/common/modal/Auction";
import { TokenData } from "@utils/types/nft.interface";
import { useEffect, useState } from "react";
import { AuctionContent } from "./auctionContent";
import { useMarket } from "@utils/hooks/useMarket";
import request from "@utils/request";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { LoadingSpinner } from "@components/common/loading";

interface AuctionProps {
  token: TokenData;
}

export const Auction = ({ token }: AuctionProps) => {
  const { address } = useAccount();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [newTimer, setNewTimer] = useState<number>(0);
  const [auctionEnded, setAuctionEnded] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const { market } = useMarket()

  const isRegister = address && address === token.seller && !auctionEnded && token.openingPrice == 0
  const isCancel = address && address === token.seller && (!auctionEnded && token.openingPrice !== 0 || auctionEnded && token.highestBid == 0)
  const isEnded = address && address === token.seller && (auctionEnded && token.highestBid !== 0)


  const successCancel = () => toast.success('Success Cancel Auction !!')
  const successEnd = () => toast.success('Success Ended Auction !!')

  const getAuction = async () => {
    const {data} = await request.get(`auction/${token.id}`)
    if (data) {
    //   const endTime = data.endTime.split("T")
    //   const currentTime = new Date().toISOString().split("T")
    //   console.log(endTime, currentTime)
    //   if(currentTime[0].split('-')[2] < endTime[0].split('-')[2]) {
    //     Number(endTime[0].split('-')[2]) - Number(currentTime[0].split('-')[2] + "일 남았습니다")
    //   }
    //   if(currentTime[0].split('-')[2] === endTime[0].split('-')[2]) {
    //     Number(endTime[1].split(':')[0]) - Number(currentTime[1].split(':')[0] + "시간 남았습니다")
    //   }
    // }

      const endTime= Number(new Date(data.endTime).getTime())
      console.log(endTime)
      const currentTime = Number(new Date().getTime())
      console.log(currentTime)
      console.log(endTime - currentTime)
      if (endTime <= currentTime) {
        setAuctionEnded(true)
        console.log('경매가 종료되었습니다')
      }
      if (endTime > currentTime) {
        setNewTimer(Math.floor((endTime-currentTime) / (1000)))
      }
    }
  }

  const handleTimerStart = (time: number) => {

    const timeToMinutes = time;
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

  const handleCancelAuction = async () => {
    try {
      setIsLoading(true)
      const cancelAuction = await market.cancelAuction(token.id)
      console.log("cancelAuction",cancelAuction)
      const receipt = await cancelAuction.wait()

      if(receipt) {
        try {
          await request.delete(`auction/${token.id}`)
          console.log(`등록된 경매가 해제됬습니다`)
          setIsLoading(false)
          successCancel()
        } catch(e:any) {
          console.log(e.message)
        }
      }
    } catch (e:any) {
      console.log(e.message)
    }
  }

  const handleEndAuction = async () => {
    try {
      setIsLoading(true)
      const endAuction = await market.endAuction(token.id, {
        gasLimit: 800000
      })
      const receipt = await endAuction.wait()

      console.log(receipt)
      
      if(receipt) {
          await request.delete(`auction/${token.id}`)
          setIsLoading(false)
          successEnd()
      }

    } catch (e:any) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    
    getAuction()
    handleTimerStart(newTimer)
    console.log(token)
  }, [token, newTimer])

  return (
    <>
      <div className="w-full mt-4">
        {address && address !== token.seller && token.openingPrice == 0
        ? <></> 
        : <TimerContainer
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
        }
          
   
        {isRegister && (
        <button
          type="button"
          onClick={() => {
            setIsOpenModal(true);
          }}
          className=" mt-4 inline-flex items-center justify-center rounded-md border-2 border-transparent dark:bg-purple-500 bg-none px-32 py-2 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow dark:hover:bg-blue-800"
        >
          Auction Register
        </button>
        )}
        {isCancel && (
        <button
          type="button"
          onClick={handleCancelAuction}
          className=" mt-4 inline-flex items-center justify-center rounded-md border-2 border-transparent dark:bg-purple-500 bg-none px-32 py-2 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow dark:hover:bg-blue-800"
        >
          {isLoading ? <><LoadingSpinner/>Pending...</> : <>Cancel Auction</>} 
        </button>
        )}
        {isEnded && (
          <button
          type="button"
          onClick={handleEndAuction}
          className=" mt-4 inline-flex items-center justify-center rounded-md border-2 border-transparent dark:bg-purple-500 bg-none px-32 py-2 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow dark:hover:bg-blue-800"
        >
          {isLoading ? <><LoadingSpinner/>Pending...</> : <>End Auction</>} 
        </button>
        )}
      </div>
      {isOpenModal && (
        <AuctionModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
          <AuctionContent token={token} setIsOpenModal={setIsOpenModal} handleTimerStart={handleTimerStart} setAuctionEnded={setAuctionEnded}/>
        </AuctionModal>
      )}
    </>
  );
};
