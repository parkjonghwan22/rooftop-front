import { useEvent } from "@utils/hooks/useEvent";
import { AirdropCurrent, AirdropUpcoming, LeaderBoard } from "./"
import { AirdropData } from "@utils/types/nft.interface"
import { useQuery } from "react-query";
import { LoadingSpinner2 } from "@components/common/loading";


interface AirdropProps {
    airdropData: AirdropData[]
}

export const Airdrop = ({ airdropData }: AirdropProps) => {
    const { getLeaderBoard } = useEvent();

    const sortedAirdrops = airdropData.sort(
      (a, b) => new Date(a.mintDate).getTime() - new Date(b.mintDate).getTime()
    );
    const currentAirdrop = sortedAirdrops[0];
    const upcomingAirdrops = sortedAirdrops.slice(1);


    const { data: leaderBoardData, isLoading } = useQuery('leaderBoard', () => getLeaderBoard(currentAirdrop.targets));

    
    if (isLoading || !leaderBoardData) return <LoadingSpinner2 />;
    return (
      <>
        <AirdropCurrent airdrop={currentAirdrop} leaderBoard={leaderBoardData} />
        <AirdropUpcoming upcomingAirdrops={upcomingAirdrops} />
        <LeaderBoard airdrop={currentAirdrop} leaderBoard={leaderBoardData} />
      </>
    );
  };