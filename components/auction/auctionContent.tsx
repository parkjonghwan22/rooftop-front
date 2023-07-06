import { PriceInputBox } from "@components/common/input";
import { LoadingSpinner } from "@components/common/loading";
import { useInput } from "@utils/hooks/useInput";
import { useIpfs } from "@utils/hooks/useIpfs";
import { useMarket } from "@utils/hooks/useMarket";
import request from "@utils/request";
import { TokenData } from "@utils/types/nft.interface";
import { ethers } from "ethers";

import Image from "next/image";
import { useRef, useState } from "react";

interface NftProps {
  token: TokenData;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAuctionEnded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuctionContent = ({
  token,
  setIsOpenModal,
  setAuctionEnded,
  handleTimerStart,
}: NftProps & { handleTimerStart: (time: number) => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { metaData, imageUrl } = useIpfs(token);
  const { market } = useMarket();
  const nftPrice = useInput("");
  const [newTime, setNewTime] = useState<number>(0);
  const updateTimeRef = useRef<NodeJS.Timeout>();

  const handleClick = async () => {
    try {
      if (!market || !nftPrice.value || !newTime) return;
        setIsLoading(true)

      const priceInWei = ethers.parseEther(nftPrice.value.toString());
      const duration = newTime * 60;

      const startAuction = await market.startAuction(
        token.id,
        priceInWei,
        duration
      );

      console.log("startAuction ====",startAuction)
      const receipt = await startAuction.wait();
      console.log("receipt ==== ", receipt);

      if(receipt) {
        try {
          setIsLoading(false)
          setIsOpenModal(false)
          setAuctionEnded(false)

          const currentTime = new Date()
          const endTime = new Date(currentTime.getTime() + duration * 1000)
          const endTimeISO = endTime.toISOString()
          console.log(typeof(endTimeISO))
          // endTime : 2023-07-04T00:43:49.291Z


          // DB 와 통신을 하는 순간 타이머가 돌아가지 않음..
          const { data } = await request.post(`auction/add`, {
            id: token.id,
            endTime: endTimeISO
          })
          
          console.log('data ==========', data)
          return data

        } catch(e:any) {
          console.log(e.message)
        }
      }

      if (newTime > 0) {
          handleTimerStart(newTime * 60);
        } else {
            clearInterval(updateTimeRef.current!);
        }

        return () => {
            clearInterval(updateTimeRef.current!);
        };
        
        
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTime = Number(e.target.value);
    setNewTime(inputTime);
  };

  return (
    <>
      <div className="px-3 py-3 w-full h-5/6">
        <div className="text-3xl font-bold ml-3">Auction</div>
        <div className="mx-auto mt-6">
          <div className="w-full">
            <Image
              src={
                imageUrl ? imageUrl : "https://dummyimage.com/480x480/ccc/000"
              }
              alt="test"
              width={1000}
              height={1000}
              className="object-fill w-80 h-80 mx-auto rounded-full border-4 border-red-500 dark:border-white"
            />
          </div>
          <div className="w-full flex flex-col mt-7 pl-32">
            <div className="flex items-center mb-6">
              <div className="text-3xl font-bold text-ellipsis overflow-hidden">
                {metaData.name}
              </div>
              <div className="text-sm ml-4">#{token.tokenId}</div>
            </div>
            <div className="text-lg mr-4 mb-1">Starting price</div>
            <div className="w-2/3">
              <PriceInputBox
                value={nftPrice.value}
                onChange={nftPrice.onChange}
                name="price"
                icon="cryptocurrency-color:matic"
                placeholder="0.000"
              />
              <div className="text-lg mt-2 mb-1">Auction period</div>

              <div className="space-y-4 flex flex-wrap md:flex-row items-center md:space-y-0">
                <input
                  className="border border-gray-600 text-xl md:text-lg font-redhat outline-none mb-5 px-2 py-1 w-full rounded-lg bg-gray-800 text-white"
                  name="Timer Input"
                  type="number"
                  placeholder="Please set the auction period."
                  onChange={handleChange}
                  min={0}
                />
                  {isLoading && (
                <button
                  onClick={handleClick}
                  className="flex items-centerbg-red-500 text-lg font-semibold font-redhat w-full py-2 md:text-xl rounded-lg text-white hover:bg-rose-500 hover:text-rose-100 transition duration-300 ease-in"
                >
                    <LoadingSpinner/> Registering..
                </button>
                  )}
                  {!isLoading && (
                    <button
                    onClick={handleClick}
                    className="bg-red-500 text-xl font-semibold font-redhat w-full py-2 md:text-xl rounded-lg text-white hover:bg-purple-500 hover:text-rose-100 transition duration-300 ease-in"
                  >
                    Register
                  </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
