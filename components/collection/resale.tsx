import { Button } from "@components/common/button";
import { PriceInputBox } from "@components/common/input";
import { LoadingSpinner } from "@components/common/loading";
import { useInput } from "@utils/hooks/useInput";
import { useIpfs } from "@utils/hooks/useIpfs";
import { useMarket } from "@utils/hooks/useMarket";
import { TokenData } from "@utils/types/nft.interface";
import { ethers } from "ethers";
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
      <div className="px-3 py-3 w-[380px] h-[580px]">
        <div className="text-3xl font-bold ml-4">New Register</div>
        <div className="flex flex-col mt-8">
          <div className="">
            <Image
              src={
                imageUrl ? imageUrl : "https://dummyimage.com/480x480/ccc/000"
              }
              alt="test"
              width={1000}
              height={1000}
              className="object-fill mx-auto w-60 h-60 rounded-full border-4 border-red-500 dark:border-white"
            />
          </div>
          <div className="flex flex-col mt-5 mx-auto w-4/5">
            <div className="flex items-center justify-center">
              <div className="text-3xl font-bold text-ellipsis overflow-hidden">{metaData.name}</div>
              <div className="text-sm ml-2">#{token.tokenId}</div>
            </div>
            <div className="text-xl mt-6">Price Update</div>
            <form onSubmit={handleReAddSubmit} className="flex flex-col mt-2">
            <PriceInputBox
              value={nftPrice.value}
              onChange={nftPrice.onChange}
              name="price"
              icon="cryptocurrency-color:matic"
              placeholder="0.000"
            />
            <div className="mt-4">
            {!isLoading && (
            <Button
              type="submit"
              color="purple"
              fontSize="xl"
            >
              Register
            </Button>
            )}
            {isLoading && (
              <Button
              type="submit"
              color="purple"
              fontSize="xl"
            >
              <LoadingSpinner /> Uploading...
            </Button>
            )}
            </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};
