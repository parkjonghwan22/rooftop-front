import { LoadingSpinner2 } from "@components/common/loading";
import { useEvent } from "@utils/hooks/useEvent"
import { AirdropData } from "@utils/types/nft.interface"
import { useQuery } from "react-query"
import { useAccount } from "wagmi"



const BoardItem = ({ index, target }: { index: number, target: string }) => {
    const { address } = useAccount();

    return (
        <tr className={index % 2 === 0 ? "bg-gray-300 dark:bg-gray-900 bg-opacity-30" : "bg-gray-100 dark:bg-gray-800 bg-opacity-30"}>
            <td key={index} className="text-left pl-5 py-5">{index + 1}</td>
            <td className="text-left">{target}</td>
            <td className="text-center">38</td>
            <td className="text-center">27</td>
            <td className="text-center">27</td>
        </tr>
    );
};

export const LeaderBoard = ({ airdrop }: { airdrop: AirdropData }) => {
    const { getLeaderBoard } = useEvent();
    const { data: leaderBoardData, isLoading } = useQuery('leaderBoard', () => getLeaderBoard(airdrop.targets));

    console.log(`a ::`, airdrop.targets);
    console.log(`b ::`, leaderBoardData);

    // 정렬된 타겟 배열 생성
    const sortedTargets = airdrop.targets?.map((target) => {
        if (!leaderBoardData) return
        // target과 일치하는 leaderBoardData 항목 찾기
        const matchingData = leaderBoardData.find((data) => data.to === target);

        // target과 점수를 객체로 반환
        return { target };
    });

    // 점수를 기준으로 내림차순 정렬
    sortedTargets?.sort((a: any, b: any) => b.score - a.score);

    if (isLoading) return <LoadingSpinner2 />;
    return (
        <div className="dark:text-white w-full md:w-3/4 mx-auto h-full">
            <h1 className="text-2xl md:text-2xl lg:text-3xl font-extrabold pt-8 px-2 text-center w-full">LeaderBoard</h1>
            <div className="py-8">
                <div className="max-w-screen-xl px-2 mx-auto">
                    <table className="w-full text-base text-gray-800 dark:text-gray-300">
                        <thead>
                            <tr className="border-b border-gray-300 dark:border-gray-600">
                                <th className="text-left p-1 pb-2">Rank</th>
                                <th className="text-left p-1 pb-2">User Address</th>
                                <th className="text-center p-1 pb-2">Trade</th>
                                <th className="text-center p-1 pb-2">Minted</th>
                                <th className="text-center p-1 pb-2">Total Pts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTargets?.map((target, index) => (
                                <tr
                                    className={
                                        index % 2 === 0
                                            ? "bg-gray-300 dark:bg-gray-900 bg-opacity-30"
                                            : "bg-gray-100 dark:bg-gray-800 bg-opacity-30"
                                    }
                                    key={index}
                                >
                                    <td className="text-left pl-5 py-5">{index + 1}</td>
                                    <td className="text-left">{target.target}</td>
                                    <td className="text-center">38</td>
                                    <td className="text-center">27</td>
                                    <td className="text-center">{target.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
