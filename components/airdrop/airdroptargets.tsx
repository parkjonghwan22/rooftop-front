import { Icon } from "@iconify/react";
import { AirdropData, LeaderBoardData } from "@utils/types/nft.interface"
import { useAccount } from "wagmi"

interface AirdropProps {
    airdrop: AirdropData
    leaderBoard: LeaderBoardData[]
}

export const LeaderBoard = ({ airdrop, leaderBoard }: AirdropProps) => {
    const { address } = useAccount()

    if (!address) return null;
    return (
        <div className="dark:text-white w-full md:w-3/4 mx-auto h-full">
            <h1 className="text-2xl md:text-2xl lg:text-3xl font-extrabold pt-8 px-2 text-center w-full">LeaderBoard</h1>
            <div className="py-8">
                <div className="max-w-screen-xl px-2 mx-auto">
                    <table className="w-full text-gray-800 dark:text-gray-300 rounded-t-lg overflow-hidden">
                        <thead>
                            <tr className="border-b border-gray-300 dark:border-gray-600 dark:bg-gray-900 bg-gray-200">
                                <th className="text-left px-2 py-4 pb-4">Rank</th>
                                <th className="text-center px-2 py-4 pb-4">User Address</th>
                                <th className="text-center px-2 py-4 pb-4">Trade</th>
                                <th className="text-center px-2 py-4 pb-4">Minted</th>
                                <th className="text-center px-2 py-4 pb-4">Total Pts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderBoard?.map((target, index) => {
                                const slicedAddress = target?.address?.slice(0, 6) + "..." + target?.address?.slice(-6);
                                const isTarget = index < airdrop?.tokenIds?.length;
                                const rowClass = isTarget
                                    ? "bg-gray-200 dark:bg-gray-800 bg-opacity-30 text-purple-500 dark:text-yellow-400 "
                                    : index % 2 === 0
                                        ? "bg-gray-300 dark:bg-gray-600 bg-opacity-30"
                                        : "bg-gray-100 dark:bg-gray-700 bg-opacity-30";

                                return (
                                    <tr className={`${rowClass} ${target?.address === address ? 'border-4 border-cyan-500' : ''}`} key={index}>
                                        <td className="text-left pl-5 py-5 flex items-center">
                                            {isTarget && <Icon icon="bxs:crown" className="mr-1 text-xl" />}
                                            {index + 1}
                                        </td>
                                        {target?.address === address ? (
                                            <td className="text-center font-bold">YOU</td>
                                        ) : (
                                            <td className="text-center min-w-[200px]">{slicedAddress}</td>
                                        )}
                                        <td className="text-center">{target.transfer}</td>
                                        <td className="text-center">{target.minted}</td>
                                        <td className="text-center">{target.totalPoint}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
