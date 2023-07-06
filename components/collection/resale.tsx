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
      <div className="px-3 py-3 w-[400px] md:w-[700px] h-[600px] md:h-[400px]">
        <div className="text-3xl font-bold ml-3">Register NFT</div>
        <div className="flex flex-col md:flex-row mt-4">
          <div className="w-1/2 ml-4">
            <Image
              src={
                imageUrl ? imageUrl : "https://dummyimage.com/480x480/ccc/000"
              }
              alt="test"
              width={1000}
              height={1000}
              className="object-fill w-68 h-68 mx-auto rounded-full border-4 border-red-500 dark:border-white"
            />
          </div>
          <div className="w-1/2 flex flex-col mt-10 pl-10">
            <div className="flex items-center">
              <div className="text-3xl font-bold text-ellipsis overflow-hidden">{metaData.name}</div>
              <div className="text-sm ml-2">#{token.tokenId}</div>
            </div>
            <div className="text-xl mr-4 mt-12 mb-1">Price</div>
            <form onSubmit={handleReAddSubmit} className="flex flex-col gap-5 w-4/5 mt-2">
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
              color="purple"
              fontSize="xl"
            >
              Register
            </Button>
            )}
            {isLoading && (
              <Button
              type="submit"
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
