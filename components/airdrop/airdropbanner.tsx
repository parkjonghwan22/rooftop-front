import Image from "next/image"
import { AirdropData, LeaderBoardData } from "@utils/types/nft.interface"
import { useQuery, useQueryClient } from 'react-query';
import { useCollection } from "@utils/hooks/useCollection"
import { LoadingSpinner2 } from "@components/common/loading"
import { AddressInput, EventTimer } from "./";
import { useMarket } from "@utils/hooks/useMarket";
import { useAccount } from "wagmi";
import { Button } from "@components/common/button";
import { Icon } from "@iconify/react";

interface AirdropProps {
    airdrop: AirdropData
    leaderBoard: LeaderBoardData[]
}

export const AirdropCurrent = ({ airdrop, leaderBoard }: AirdropProps) => {
    const { market, owner } = useMarket()
    const { getCollection } = useCollection();
    const { address } = useAccount()
    const queryClient = useQueryClient();

    const handleAirdrop = async () => {
        if (!airdrop) return
        const targetIds = leaderBoard?.map(item => item.address).slice(0, airdrop.marketIds.length)
        try {
            const startAirdrop = await market.setAirdrop(targetIds, airdrop?.marketIds)
            const receipt = await startAirdrop.wait()
            console.log(receipt)
            if (receipt) {
                // const response = await request.delete(`cart/${address}`);
                // if (response.status === 200) {
                // }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const { data: collectionData, isLoading: collectionLoading } = useQuery(
        ['collection', airdrop?.NFTaddress],
        () => queryClient.fetchQuery(['collection', airdrop.NFTaddress], () => getCollection(airdrop.NFTaddress)),
        {
            enabled: !!airdrop,
        }
    );

    if (collectionLoading || !collectionData || !address || !owner) return <LoadingSpinner2 />
    return (
        <>
            {address === owner && <div className="w-full lg:w-3/4 mx-auto flex justify-end mb-5">
                <Button onClick={handleAirdrop} color="purple" fontWeight="bold" fontSize="lg" size="w-40">
                    <Icon icon="mingcute:airdrop-fill" className="mr-2" />
                    Airdrop
                </Button>
            </div>}
            <div className="relative w-full lg:w-3/4 mx-auto from-transparent to-[#A259FF] bg-cover bg-no-repeat before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-gradient-to-b">
                <div className="w-full rounded-t-xl overflow-hidden">
                    <Image
                        src={collectionData.logo}
                        alt="image"
                        width={1000}
                        height={1000}
                        className="h-[660px] w-full object-cover"
                    />
                </div>
                <div className="absolute -bottom-[25%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-[30px] sm:-bottom-[10%] sm:gap-20 md:flex-row">
                    <div className="flex flex-col gap-3 lg:gap-4 lg:mt-4 text-white ">
                        <div className="max-w-[375px] text-start text-4xl font-semibold leading-[45px] sm:whitespace-nowrap">
                            {collectionData.name}
                        </div>
                        <div className="flex items-center font-medium text-md lg:text-xl text-gray-300">
                            {collectionData.description}
                        </div>
                    </div>
                    <EventTimer airdrop={airdrop} />
                </div>
            </div>
            <AddressInput airdrop={airdrop} />
        </>
    )
}
