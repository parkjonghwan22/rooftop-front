import { TimerContainer } from "@components/common/Timer/timecontainer";
import { TimerInput } from "@components/common/Timer/timeinput";
import { PriceInputBox } from "@components/common/input";
import { AuctionModal } from "@components/common/modal/Auction";
import { useInput } from "@utils/hooks/useInput";
import { useIpfs } from "@utils/hooks/useIpfs";
import { useMarket } from "@utils/hooks/useMarket";
import { TokenData } from "@utils/types/nft.interface";
import { Button } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface NftProps {
  token: TokenData;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuctionContent = ({ token, setIsOpenModal }: NftProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { metaData, imageUrl } = useIpfs(token);
  const { market } = useMarket();
  const nftPrice = useInput("");

  

  const handleAuctionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsOpenModal(false);
    } catch (e: any) {
      console.log(e.message);
    }
  };


  return (
    <>
      <div className="px-3 py-3 w-full h-5/6">
        <div className="text-2xl font-bold ml-3">Auction</div>
        <div className="flex mt-2">
          <div className="w-1/2 ml-4">
            <Image
              src={
                imageUrl ? imageUrl : "https://dummyimage.com/480x480/ccc/000"
              }
              alt="test"
              width={1000}
              height={1000}
              className="object-fill w-60 h-60 mx-auto rounded-lg border-4 border-red-500 dark:border-white"
            />
          </div>
          <div className="w-1/2 flex flex-col pl-10">
            <div className="flex items-center">
              <div className="text-2xl font-bold">{metaData.name}</div>
              <div className="text-sm ml-2">#{token.tokenId}</div>
            </div>
            <div className="text-lg mr-4 mt-2 mb-1">Starting price</div>
            <form onSubmit={handleAuctionSubmit} className="w-2/3">
              <PriceInputBox
                value={nftPrice.value}
                onChange={nftPrice.onChange}
                name="price"
                icon="cryptocurrency-color:matic"
                placeholder="0.000"
              />
              <div className="text-lg mt-2">Auction period</div>
              <input/>
              {/* <TimerInput
                value={newTime}
                handleStartTimer={handleStartTimer}
                handleChange={handleChange}
              /> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

interface AuctionProps {
  token: TokenData;

}



export const Auction = ({ token }: AuctionProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);


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
          <AuctionContent token={token} setIsOpenModal={setIsOpenModal}/>
        </AuctionModal>
      )}
    </>
  );
};
