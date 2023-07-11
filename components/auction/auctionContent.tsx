import { Button } from "@components/common/button";
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
import { toast } from "react-toastify";

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

      console.log("startAuction ====", startAuction)
      const receipt = await startAuction.wait();
      console.log("receipt ==== ", receipt);

      if (receipt) {
        try {
          setIsLoading(false)
          setIsOpenModal(false)
          setAuctionEnded(false)
          toast.success("Success Start Auction")

          const currentTime = new Date()
          const endTime = new Date(currentTime.getTime() + duration * 1000)
          const endTimeISO = endTime.toISOString()
          console.log(typeof (endTimeISO))
          // endTime : 2023-07-04T00:43:49.291Z


          // DB 와 통신을 하는 순간 타이머가 돌아가지 않음..
          const { data } = await request.post(`auction/add`, {
            id: token.id,
            endTime: endTimeISO
          })

          console.log('data ==========', data)
          return data

        } catch (e: any) {
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
      <div className="w-[380px] h-full max-h-9/10 overflow-y-scroll">
        <h2 className="text-3xl font-bold ml-5">Auction</h2>
        <div className="mx-auto mt-6">
          <div>
            <Image
              src={
                imageUrl ? imageUrl : "https://dummyimage.com/480x480/ccc/000"
              }
              alt="test"
              width={1000}
              height={1000}
              className="object-fill w-72 h-72 mx-auto rounded-full border-4 border-red-500 dark:border-white"
            />
          </div>
          <div className="w-full flex flex-col">
            <div className="flex items-center justify-center mt-4">
              <div className="text-3xl font-bold text-ellipsis overflow-hidden">
                {metaData.name}
              </div>
              <div className="text-sm ml-4">#{token.tokenId}</div>
            </div>
            <div className="w-3/4 mx-auto flex flex-col">
              <span className="text-lg mt-4 mb-2">Starting price</span>
              <PriceInputBox
                value={nftPrice.value}
                onChange={nftPrice.onChange}
                name="price"
                icon="cryptocurrency-color:matic"
                placeholder="0.000"
              />
              <span className="text-lg mt-4 mb-2">Auction period</span>
              <input
                className="border border-gray-300 text-xl md:text-lg font-redhat outline-none mb-3 px-3 py-2 w-full rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white dark:border-gray-600"
                name="Timer Input"
                type="number"
                placeholder="Please set the auction period."
                onChange={handleChange}
                min={0}
              />
              <div className="w-full lg:mt-4 mb-10">
                <Button
                  color="red"
                  fontSize="md"
                  fontWeight="bold"
                  onClick={handleClick}
                >
                  {isLoading ? <><LoadingSpinner />Registering..</> : "Register"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
