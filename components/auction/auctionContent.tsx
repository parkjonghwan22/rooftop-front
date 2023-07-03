import { PriceInputBox } from "@components/common/input";
import { LoadingSpinner } from "@components/common/loading";
import { useInput } from "@utils/hooks/useInput";
import { useIpfs } from "@utils/hooks/useIpfs";
import { useMarket } from "@utils/hooks/useMarket";
import { TokenData } from "@utils/types/nft.interface";
import { ethers } from "ethers";
import Image from "next/image";
import { useRef, useState } from "react";

interface NftProps {
  token: TokenData;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuctionContent = ({
  token,
  setIsOpenModal,
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
      const receipt = await startAuction.wait();
      console.log("receipt ==== ", receipt);
      if(receipt) {
        setIsLoading(false)
        setIsOpenModal(false)
      }

      if (newTime > 0) {
          handleTimerStart(newTime);
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
              <div className="w-2/4 text-xl font-bold text-ellipsis overflow-hidden">
                {metaData.name}
              </div>
              <div className="text-sm ml-2">#{token.tokenId}</div>
            </div>
            <div className="text-lg mr-4 mt-2 mb-1">Starting price</div>
            <div className="w-2/3">
              <PriceInputBox
                value={nftPrice.value}
                onChange={nftPrice.onChange}
                name="price"
                icon="cryptocurrency-color:matic"
                placeholder="0.000"
              />
              <div className="text-lg mt-2">Auction period</div>

              <div className="mx-auto space-y-4 flex flex-wrap md:flex-row justify-center items-center md:space-y-0">
                <input
                  className="text-xl md:text-lg font-redhat outline-none mb-3 px-2 py-1 w-40 rounded-lg bg-gray-800 text-white"
                  name="Timer Input"
                  type="number"
                  placeholder="시간설정"
                  onChange={handleChange}
                  min={0}
                />
                  {isLoading && (
                <button
                  onClick={handleClick}
                  className="flex items-center mt-1 bg-red-500 text-lg font-semibold font-redhat px-4 py-1 md:text-xl rounded-lg text-white hover:bg-rose-500 hover:text-rose-100 transition duration-300 ease-in"
                >
                    <LoadingSpinner/> Registering..
                </button>
                  )}
                  {!isLoading && (
                    <button
                    onClick={handleClick}
                    className="mt-1 bg-red-500 text-xl font-semibold font-redhat px-12 py-1 md:text-xl rounded-lg text-white hover:bg-rose-500 hover:text-rose-100 transition duration-300 ease-in"
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
