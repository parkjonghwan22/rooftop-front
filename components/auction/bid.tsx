import { useMarket } from "@utils/hooks/useMarket";
import { TokenData } from "@utils/types/nft.interface";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useIpfs } from "@utils/hooks/useIpfs";
import { PriceInputBox } from "@components/common/input";
import { useInput } from "@utils/hooks/useInput";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { LoadingSpinner } from "@components/common/loading";
import { Button } from "@components/common/button";


interface BidProps {
  token: TokenData;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const Bid = ({ token, setIsOpenModal } : BidProps) => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { metaData, imageUrl } = useIpfs(token);
  const [remainingTime, setRemainingTime] = useState(0)
  const { market } = useMarket();
  const nftPrice = useInput("");

  const success = () => toast.success('Success Place Bid !!')

  const handleBid = async () => {
    try{
      if (!market || !nftPrice.value) return
      setIsLoading(true)

      const priceInWei = ethers.parseEther(nftPrice.value.toString());
      const placeBid = await market.bidInAuction(token.id, {
        from: address,
        value: priceInWei
      })

      const receipt = await placeBid.wait()
      if(receipt) {
        console.log(receipt)
        setIsLoading(false)
        success()
        setIsOpenModal(false)
      }

    } catch(e:any) {
      console.log(e.message)

    }
    
  }

  useEffect(() => {
    const endTime = token.auctionEndTime * 1000
    const currentTime = new Date().getTime()
    if(endTime > currentTime) {
      const auctionTime = Math.floor((endTime - currentTime) / 1000)
      const time = Math.floor(auctionTime / 60)
      setRemainingTime(time)
    }
  }, [token])

  return (
    <>
      <div className="mx-auto px-4 py-4 w-[600px] h-full">
        <div className="text-3xl font-bold ml-6">Place Bid</div>
        <div className="flex flex-wrap h-4/5 mt-4">
          <div className="w-1/2">
            <div className="mt-5">
              <Image
                src={
                  imageUrl ? imageUrl : "https://dummyimage.com/480x480/ccc/000"
                }
                alt="test"
                width={1000}
                height={1000}
                className="object-fill w-64 h-64 mx-auto rounded-full border-4 border-red-500 dark:border-white"
              />
            </div>
            <div className="text-center mt-4 text-2xl font-bold text-ellipsis overflow-hidden">
              {metaData.name}
            </div>
          </div>
          <div className="w-1/2 pl-5 py-2">
            <div className="text-sm text-gray-400">NetWork</div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 128 128"
              >
                <path
                  fill="#7950DD"
                  d="M64 0c35.348 0 64 28.652 64 64s-28.652 64-64 64S0 99.348 0 64S28.652 0 64 0zm0 0"
                />
                <path
                  fill="#fff"
                  d="M85.898 49.242a5.76 5.76 0 0 0-5.418 0l-12.214 7.223l-8.532 4.742l-12.214 7.227a5.76 5.76 0 0 1-5.418 0l-9.707-5.649a5.423 5.423 0 0 1-2.711-4.52V46.989a4.972 4.972 0 0 1 2.71-4.52l9.708-5.417a5.738 5.738 0 0 1 5.418 0l9.707 5.418a5.423 5.423 0 0 1 2.71 4.52v7.218l8.329-4.965v-6.996a4.963 4.963 0 0 0-2.664-4.52l-17.86-10.382a5.738 5.738 0 0 0-5.418 0L24.266 37.727a4.608 4.608 0 0 0-2.934 4.52v20.991a4.967 4.967 0 0 0 2.711 4.496l18.059 10.407a5.76 5.76 0 0 0 5.418 0l12.214-7l8.352-4.965l12.172-6.977a5.76 5.76 0 0 1 5.418 0l9.707 5.418a5.419 5.419 0 0 1 2.707 4.52v11.062a4.967 4.967 0 0 1-2.707 4.516l-9.707 5.64a5.738 5.738 0 0 1-5.418 0l-9.707-5.418a5.416 5.416 0 0 1-2.711-4.515v-7.25l-8.106 4.738v7.219a4.969 4.969 0 0 0 2.707 4.52L80.5 100.03a5.746 5.746 0 0 0 5.422 0l18.058-10.383a5.42 5.42 0 0 0 2.688-4.511v-21a4.964 4.964 0 0 0-2.711-4.516zm0 0"
                />
              </svg>
              <div className="font-bold ml-1">Polygon</div>
            </div>
            <div className="mt-2 text-sm text-gray-400">Starting_Bid</div>
            <div className="font-bold">${token.openingPrice/ (10 ** 18)} MATIC</div>
            <div className="mt-2 text-sm text-gray-400">
                Auction Remaining Time
            </div>
            <div className="font-bold">{remainingTime} minutes</div>
            <div className="mt-2 border-2 dark:border-0 dark:bg-gray-900 rounded-lg px-2 py-2">
              <div className="text-sm text-gary-400 pb-2">
                 Current Highest Bid ${token.openingPrice/ (10 ** 18)} 
              </div>
              <PriceInputBox
                value={nftPrice.value}
                onChange={nftPrice.onChange}
                name="price"
                icon="cryptocurrency-color:matic"
                placeholder="0.000"
              />
              <div className="mt-3">
              {!isLoading && (
              <Button onClick={handleBid} color="purple"fontSize="md" fontWeight="bold">
                Bid
              </Button>
              )}
              {isLoading && (
                <Button onClick={handleBid} color="purple" fontSize="md" fontWeight="bold">
                  <LoadingSpinner/> Bid
                </Button>
              )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};