import { useEffect, useState } from "react";
import Image from "next/image";
import { Chart2 } from "./styled/chart.styled";
import { Icon } from "@iconify/react";
import {
  CollectionData,
  TokenData,
  ActivityData,
} from "@utils/types/nft.interface";
import Link from "next/link";
import { UserAddress } from "./styled/nft.styled";
import { Alert } from "@components/common/alert";
import { useMarket } from "@utils/hooks/useMarket";
import { useAccount } from "wagmi";
import { NFTActivity } from "./nftactivity";
import { useIpfs } from "@utils/hooks/useIpfs";
import { useCoinGecko } from "@utils/hooks/useCoingecko";
import request from "@utils/request";
import { Modal } from "@components/common/modal";
import { ReSale } from "./resale";
import { LoadingSpinner2 } from "@components/common/loading";
import { toast } from "react-toastify";
import { useDecode } from "@utils/hooks/useDecode";
import { Auction, AuctionContent, Bid } from "@components/auction";
import { Button } from "@components/common/button";

interface NftProps {
  collectionData: CollectionData;
  token: TokenData;
  activity: ActivityData[];
}

export const NFTSale = ({ collectionData, token, activity }: NftProps) => {
  const { address } = useAccount();
  const { market, convertToWei, updateCollection } = useMarket();
  const { decodeTransfer } = useDecode();
  const { metaData, imageUrl, isLoading } = useIpfs(token);
  const { convertKRW } = useCoinGecko();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isBuyLoading, setIsBuyLoading] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const handleOpenModal = (content: string) => {
    setModalContent(content);
    setIsOpenModal(true);
  };
  const isBuy = address && address !== token.seller && token.openingPrice == 0;
  const isResale =
    address && address === token.seller && token.openingPrice == 0;
  const isBid = address && address !== token.seller && token.openingPrice !== 0;

  const slicedAddress =
    token.seller.slice(0, 6) + "..." + token.seller.slice(-4);
  const parsedPrice = convertToWei(token.price, 0);

  const handleBuy = async () => {
    try {
      setIsBuyLoading(true);
      const buyNFT = await market.buyNft(token.id, {
        from: address,
        value: parsedPrice,
        gasLimit: 800000,
      });
      const receipt = await buyNFT.wait();
      console.log("=====================", receipt);
      if (receipt.logs) {
        const decodedData = decodeTransfer(receipt, token);
        const response = await request.post("event/transfer", {
          ...decodedData,
        });
        if (response.statusText === "Created") {
          setIsOpenModal(false);
          setIsBuyLoading(false);
          toast.success("NFT transaction was successful!");
          updateCollection(token.NFTaddress);
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setIsOpenAlert(true);
  };

  if (isLoading || isBuyLoading) return <LoadingSpinner2 />;
  // if (token.highestBid == 0 && token.openingPrice !== 0) return <>낙찰자 없이 경매가 종료되었습니다</>
  return (
    <>
      <div className="container mx-auto px-8 xl:px-32">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:w-[576px]  overflow-hidden rounded-lg">
                <Image
                  src={
                    imageUrl
                      ? imageUrl
                      : "https://dummyimage.com/480x480/ccc/000"
                  }
                  alt="nft image"
                  width={720}
                  height={720}
                  className="w-full max-w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-1 lg:row-end-1">
            <div className="flex items-center justify-center">
              <h1 className="sm: text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
                {metaData.name}
              </h1>
              <p className="sm: text-xl font-bold text-gray-500 dark:text-gray-400 sm:text-xl pl-3">
                #{token.tokenId}
              </p>
            </div>
            <div className="mt-5 flex flex-col items-center justify-between space-y-4 border-t border-b border-gray-200 dark:border-gray-400 py-4 sm:flex-row sm:space-y-0">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold flex items-center">
                  <Icon icon="cryptocurrency-color:matic" className="mr-2" />
                  {token.price / 10 ** 18}
                </h1>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {convertKRW(token.price)}￦
                </span>
              </div>
              {isBuy && (
                <Button
                  color="blue"
                  size="w-40"
                  fontSize="md"
                  onClick={handleBuy}
                >
                  Buy Now
                </Button>
              )}
              {isResale && (
                <Button
                  color="red"
                  size="w-40"
                  fontSize="md"
                  onClick={() => handleOpenModal("ReSale")}
                >
                  Set New Price
                </Button>
              )} 
               {isBid && (
                <Button
                  color="purple"
                  size="w-40"
                  fontSize="md"
                  onClick={() => handleOpenModal("Bid")}
                >
                  Place Bid
                </Button>
              )}
          
            </div>
            <ul className="mt-4 space-y-3">
              <h1 className="text-lg font-bold py-2">Collection</h1>
              <Link href={`/collections/${collectionData.address}`}>
                <li className="flex items-center text-left text-md font-medium text-gray-600 dark:text-gray-400 px-3">
                  <div className="w-7 h-7 mr-2 cursor-pointer">
                    <Image
                      src={collectionData.logo}
                      alt=""
                      width={720}
                      height={720}
                      className="h-full w-full rounded-full"
                    />
                  </div>
                  <span className="font-bold">{metaData.name}</span>
                </li>
              </Link>
              <h1 className="text-lg font-bold py-2">Description</h1>
              <li className="flex items-center text-left text-sm font-medium text-gray-600  dark:text-gray-400 px-3">
                {metaData.description}
              </li>
              <h1 className="text-lg font-bold py-2">Owner</h1>
              <li className="flex items-center text-left text-sm font-medium text-gray-600  dark:text-gray-400 px-3">
                <UserAddress onClick={() => handleCopy(token.seller)}>
                  {slicedAddress}
                  <Icon icon="bxs:copy" className="ml-1" />
                </UserAddress>
              </li>
            </ul>
            <Auction token={token} />
          </div>
          <div className="lg:col-span-5">
            <div className="my-5 flow-root">
              <h1 className="text-3xl font-bold mb-3">Price History</h1>
            </div>
            <Chart2 token={token} activity={activity} />
          </div>

          <div className="lg:col-span-5">
            <div className="my-5 flow-root">
              <h1 className="text-3xl font-bold mb-3">Activity</h1>
            </div>
            <NFTActivity token={token} activity={activity} />
          </div>
        </div>
      </div>
      {/* {isSuccessAlert && <SuccessAlert/>} */}
      <Alert
        isOpenAlert={isOpenAlert}
        setIsOpenAlert={setIsOpenAlert}
        color="green"
      >
        지갑 주소가 복사되었습니다
      </Alert>
      {modalContent && isOpenModal && (
        <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
          {modalContent === "ReSale" && (
            <ReSale token={token} setIsOpenModal={setIsOpenModal} />
          )}
          {modalContent === "Bid" && <Bid token={token} setIsOpenModal={setIsOpenModal}/>}
        </Modal>
      )}
    </>
  );
};
