import { PriceInputBox } from "@components/common/input";
import { LoadingSpinner } from "@components/common/loading/loading";
import { useInput } from "@utils/hooks/useInput";
import { useIpfs } from "@utils/hooks/useIpfs";
import { useMarket } from "@utils/hooks/useMarket";
import { TokenData } from "@utils/types/nft.interface";
import { ethers } from "ethers";
import { Button } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";


interface NftProps {
  token: TokenData;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ReSale = ({ token, setIsOpenModal }: NftProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { metaData, imageUrl } = useIpfs(token);
  const { market } = useMarket();
  const nftPrice = useInput("");

  const success = () => toast.success('NFT Upload Successfully!')


  const handleReAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    
    try {
      if (!market || !nftPrice.value) return;
      
      const priceInWei = ethers.parseEther(nftPrice.value.toString());
      

      const reAddonMarket = await market.reAddNftToMarket(token.id, priceInWei);
      
      const receipt = await reAddonMarket.wait()
      console.log(receipt);
      
      if(receipt) {
        setIsLoading(false)
        success()
        setIsOpenModal(false)
      }

    } catch (e: any) {
      console.log(e.message)
    }
  };

  return (
    <>
      <div className="px-3 py-3 w-full h-5/6">
        <div className="text-2xl font-bold ml-3">판매하기</div>
        <div className="flex mt-4">
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
          <div className="w-1/2 flex flex-col mt-10 pl-10">
            <div className="flex items-center">
              <div className="text-xl font-bold">{metaData.name}</div>
              <div className="text-sm ml-2">#{token.tokenId}</div>
            </div>
            <div className="text-xl mr-4 mt-4 mb-1">Price</div>
            <form onSubmit={handleReAddSubmit}>
            <PriceInputBox
              value={nftPrice.value}
              onChange={nftPrice.onChange}
              name="price"
              icon="cryptocurrency-color:matic"
              placeholder="0.000"
            />
            {!isLoading && (
            <Button
              type="submit"
              className="w-3/4 mt-4 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-purple-500 bg-none px-8 py-1 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-400 cursor-pointer"
            >
              등록하기
            </Button>
            )}
            {isLoading && (
              <Button
              type="submit"
              className="w-3/4 mt-4 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-purple-500 bg-none px-8 py-1 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-400 cursor-pointer"
            >
              <LoadingSpinner /> Uploading...
            </Button>
            )}

            </form>
          </div>
        </div>
      </div>
    </>
  );
};
