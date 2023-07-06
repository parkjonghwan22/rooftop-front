import { Button } from "@components/common/button";
import { PriceInputBox } from "@components/common/input";
import { LoadingSpinner } from "@components/common/loading";
import { RangeSlider } from "@components/common/range/rangeslider";
import { Icon } from "@iconify/react";
import { useInput } from "@utils/hooks/useInput";
import request from "@utils/request";
import { TokenData } from "@utils/types/nft.interface";
import { useState } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAccount } from "wagmi";

interface SweeperProps {
    tokenData: TokenData[]
    selectedItems: TokenData[]
    setSelectedItems: (selectedItems: TokenData[]) => void;
}


export const AirdropSweeper = ({ tokenData, selectedItems, setSelectedItems }: SweeperProps) => {
    const { address } = useAccount();
    const [selectedCount, setSelectedCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const tokenPrice = useInput('')

    const filteredTokenData = tokenData
        .filter(token => !token.sold)
        .filter(token => token.seller === address)
        .filter(token => (tokenPrice.value) && parseFloat(tokenPrice.value) > 0
            ? (token.price / 10 ** 18) === parseFloat(tokenPrice.value)
            : token);

    const sweepAlert = () => toast.warning('Select at least 5 items')
    const duplicateAlert = () => toast.error('Already registered for AirDrop')
    const successMessage = () => toast.success('Register Completed.\nPlease wait for the admin\'s approval');

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value);
        setSelectedCount(count);
        setSelectedItems(filteredTokenData.slice(0, count));
    };

    const handleAddToAirdrop = async () => {
        try {
            if (!address) return;
            if (selectedItems.length < 5) {
                sweepAlert()
                return;
            }
            const checkResponse = await request.post('airdrop/checkDuplicate', {
                NFTaddress: selectedItems[0].NFTaddress
            });

            if (checkResponse.data) {
                console.log(checkResponse.data)
                duplicateAlert()
                return
            }
            setIsLoading(true)
                const marketIds = selectedItems.map((item) => item.id); 
                const tokenIds = selectedItems.map((item) => item.tokenId); 
                const { data } = await request.post('airdrop/create', {
                    NFTaddress: selectedItems[0].NFTaddress,
                    targets: [],
                    marketIds: marketIds,
                    tokenIds: tokenIds,
                    price: selectedItems[0].price,
                    mintDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
                });

                if (data) {
                    successMessage()
                    setIsLoading(false)
                }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="div flex flex-col items-center w-full dark:bg-gray-900 py-6 md:py-4 px-6 rounded-xl lg:flex-row shadow-lg">
            <div className="flex items-center w-full lg:w-1/3 lg:mr-4 my-2 justify-between lg:justify-center">
                <h2 className="mr-6 font-bold text-gray-700 dark:text-gray-200">Airdrop</h2>
                <RangeSlider
                    tokenData={filteredTokenData}
                    selectedCount={selectedCount}
                    onSliderChange={handleSliderChange}
                    disabled={!tokenPrice.value || tokenPrice.value == "0"}
                />
            </div>
            <div className="flex items-center w-full lg:w-1/3 lg:mr-4 my-2 justify-between lg:justify-center">
                <span className="mr-6 font-bold text-gray-700 dark:text-gray-200 text-sm">Item Price</span>
                <PriceInputBox
                    value={tokenPrice.value}
                    onChange={tokenPrice.onChange}
                    name="price"
                    icon="cryptocurrency-color:matic"
                    placeholder="0.000"
                />
            </div>
            <div className="w-full lg:w-1/5 my-2 lg:mr-4 flex jtems-center justify-between lg:justify-center font-bold text-gray-700 dark:text-gray-200">
            </div>
            <Button onClick={handleAddToAirdrop} size="w-full lg:w-48" color="purple" fontSize="md">
                <Icon icon="fa-solid:parachute-box" className="mr-2" />
                {isLoading ? <LoadingSpinner /> : `Send Airdrop`}
            </Button>
        </div>
    );
};
