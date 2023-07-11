import { useState } from "react";
import Image from "next/image";
import { Chart2 } from "./styled/chart.styled";
import { Icon } from "@iconify/react";
import { CollectionData, TokenData, ActivityData } from "@utils/types/nft.interface";
import Link from "next/link";
import { useMarket } from "@utils/hooks/useMarket";
import { useAccount } from "wagmi";
import { NFTActivity } from "./nftactivity";
import { useIpfs } from "@utils/hooks/useIpfs";
import request from "@utils/request";
import { Modal } from "@components/common/modal";
import { ReSale } from "./resale";
import { LoadingSpinner2 } from "@components/common/loading";
import { toast } from "react-toastify";
import { useDecode } from "@utils/hooks/useDecode";
import { Auction, AuctionContent, Bid } from "@components/auction";
import { Button } from "@components/common/button";
import { UserAddress } from "@components/common/copy/address";
import { CurrentPrice } from "./styled/nftsale.styled"

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
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isBuyLoading, setIsBuyLoading] = useState(false);
    const [modalContent, setModalContent] = useState<string | null>(null);

    const handleOpenModal = (content: string) => {
        setModalContent(content);
        setIsOpenModal(true);
    };

    const isBuy = address && address !== token.seller && token.openingPrice == 0 && !token.sold;
    const isResale = address && address === token.seller && token.openingPrice == 0;
    const isBid = address && address !== token.seller && token.openingPrice !== 0;
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

    if (isLoading || isBuyLoading) return <LoadingSpinner2 />;
    return (
        <>
            <div className="container mx-auto px-8 xl:px-32">
                <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                    <div className="lg:col-span-3 lg:row-end-1">
                        <div className="lg:flex lg:items-start">
                            <div className="lg:w-[576px]  overflow-hidden rounded-lg relative">
                                {token.sold &&
                                    <div className="w-full h-full bg-gray-700 dark:bg-slate-500 opacity-75 absolute">
                                        <div className="text-[50px] md:text-[72px] font-bold text-gray-300 dark:text-gray-800 -rotate-12 absolute translate-y-[90%] translate-x-[100%]">
                                            SOLD<br></br>OUT !
                                        </div>
                                    </div>}
                                <Image
                                    src={imageUrl ? imageUrl : "https://dummyimage.com/480x480/ccc/000"}
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
                            <h1 className="sm: text-3xl whitespace-nowrap overflow-hidden text-ellipsis  font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
                                {metaData.name}
                            </h1>
                            <p className="sm: text-xl font-bold text-gray-500 dark:text-gray-400 sm:text-xl pl-3">
                                #{token.tokenId}
                            </p>
                        </div>
                        <div className="mt-5 flex flex-col items-center justify-between space-y-4 border-t border-b border-gray-200 dark:border-gray-400 py-4 sm:flex-row sm:space-y-0">
                            <CurrentPrice price={token.price} bid={token.highestBid} />
                            {isBuy && (
                                <Button color="blue" size="w-40" fontSize="md" fontWeight="bold" onClick={handleBuy}>
                                    Buy Now
                                </Button>
                            )}
                            {isResale && (
                                <Button color="red" size="w-40" fontSize="md" fontWeight="bold" onClick={() => handleOpenModal("ReSale")}>
                                    Set New Price
                                </Button>

                            )}
                            {isBid && (
                                <Button color="purple" size="w-40" fontSize="md" fontWeight="bold" onClick={() => handleOpenModal("Bid")}>
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

                            <h1 className="text-lg font-bold py-2">
                                {(token.highestBid !== 0) ? `HighestBidder` : `Owner`}
                            </h1>
                            <li className="flex items-center text-left text-sm font-medium text-gray-600  dark:text-gray-400 px-3">
                                <UserAddress address={(token.highestBid !== 0) ? token.highestBidder : token.seller} />
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
            {modalContent && isOpenModal && (
                <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} width="24rem">
                    {modalContent === "ReSale" && (
                        <ReSale token={token} setIsOpenModal={setIsOpenModal} />
                    )}
                    {modalContent === "Bid" && (
                        <Bid token={token} setIsOpenModal={setIsOpenModal} />
                    )}
                </Modal>
            )}
        </>
    );
};
