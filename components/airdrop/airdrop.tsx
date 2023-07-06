import { AirdropCurrent, AirdropUpcoming } from "./"
import { AirdropData } from "@utils/types/nft.interface"


interface AirdropProps {
    airdropData: AirdropData[]
}

export const Airdrop = ({ airdropData }: AirdropProps) => {
    const sortedAirdrops = airdropData.sort(
      (a, b) => new Date(a.mintDate).getTime() - new Date(b.mintDate).getTime()
    );

    const currentAirdrop = sortedAirdrops[0];
    const upcomingAirdrops = sortedAirdrops.slice(1);

    
    return (
      <>
        <AirdropCurrent airdrop={currentAirdrop} />
        <AirdropUpcoming />
        <div>leaderboard</div>
      </>
    );
  };