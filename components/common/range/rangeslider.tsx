import { TokenData } from "@utils/types/nft.interface";

interface RangeSliderProps {
    tokenData: TokenData[];
    selectedCount: number;
    onSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RangeSlider = ({ tokenData, selectedCount, onSliderChange }: RangeSliderProps) => {

    return (
        <div className="flex items-center bg-gray-100 dark:bg-gray-900 shadow rounded-full w-72">
            <div className="flex flex-col space-y-2 p-2 pl-4 pt-4 w-4/5">
                <input
                    type="range"
                    className="w-full"
                    min="0"
                    max={tokenData.length}
                    step="1"
                    value={selectedCount}
                    onChange={onSliderChange}
                />
                <ul className="flex justify-between w-full px-[10px]">
                    {tokenData.slice(0, selectedCount).map((token, index) => (
                        <li
                            key={token.id}
                            className="flex justify-center relative"
                        >
                            <span className="absolute"></span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="border-l border-gray-40 dark:border-gray-600 pl-4 mx-auto">{selectedCount}</div>
        </div>
    );
};
