import { Button } from "@components/common/button";
import { PriceInputBox } from "@components/common/input";
import { LoadingSpinner } from "@components/common/loading";
import { RangeSlider } from "@components/common/range/rangeslider";
import { Icon } from "@iconify/react";
import { useInput } from "@utils/hooks/useInput";
import request from "@utils/request";
import { TokenData } from "@utils/types/nft.interface";
import { CartType } from "@utils/types/user.interface";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useAccount } from "wagmi";

interface SweeperProps {
    tokenData: TokenData[]
    selectedItems: TokenData[]
    setSelectedItems: (selectedItems: TokenData[]) => void;
}


export const CollectionSweeper = ({ tokenData, selectedItems, setSelectedItems }: SweeperProps) => {
    const { address } = useAccount();
    const queryClient = useQueryClient();
    const [selectedCount, setSelectedCount] = useState(0);
    const [isCartLoading, setIsCartLoading] = useState(false)

    const maxPrice = useInput('')
    const filteredTokenData = tokenData
        .filter(token => !token.sold)
        .filter(token => (maxPrice.value) && parseFloat(maxPrice.value) > 0
            ? (token.price / 10 ** 18) <= parseFloat(maxPrice.value) 
            : token);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value);
        setSelectedCount(count);
        setSelectedItems(filteredTokenData.slice(0, count)); 
    };

    const calculateTotalPrice = (tokenData: TokenData[], selectedCount: number): number => {
        const selectedTokens = tokenData.slice(0, selectedCount);
        return selectedTokens.reduce((totalPrice, token) => totalPrice + token.price, 0);
    };

    const handleAddToCart = async () => {
        try {
            if (!address) return;
            setIsCartLoading(true)
    
            for (const token of selectedItems) {
                const checkResponse = await request.post('cart/checkDuplicate', {
                    shopper: address,
                    id: token.id
                });
    
                if (checkResponse.data.id) {
                    alert("이미 해당 NFT를 장바구니에 담았습니다."); // alert 필요
                    return;
                }
    
                const { data } = await request.post('cart/add', {
                    shopper: address,
                    seller: token.seller,
                    id: token.id,
                    NFTaddress: token.NFTaddress,
                    tokenId: token.tokenId,
                    price: token.price,
                    metadata: token.metadata
                });
    
                if (data) {
                    queryClient.setQueryData('cart', (prevData: CartType[] | undefined) => {
                        if (prevData) {
                            return [...prevData, data];
                        }
                        return [data];
                    });
                    setIsCartLoading(false)
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
    



    return (
        <div className="div flex flex-col items-center w-full dark:bg-gray-900 py-6 md:py-4 px-6 rounded-xl lg:flex-row shadow-lg">
            <div className="flex items-center w-full lg:w-1/3 lg:mr-4 my-2 justify-between lg:justify-center">
                <h2 className="mr-6 font-bold text-gray-700 dark:text-gray-200">Sweep</h2>
                <RangeSlider
                    tokenData={filteredTokenData}
                    selectedCount={selectedCount}
                    onSliderChange={handleSliderChange}
                />
            </div>
            <div className="flex items-center w-full lg:w-1/3 lg:mr-4 my-2 justify-between lg:justify-center">
                <span className="mr-6 font-bold text-gray-700 dark:text-gray-200 text-sm">Max Price per.</span>
                <PriceInputBox
                    value={maxPrice.value}
                    onChange={maxPrice.onChange}
                    name="price"
                    icon="cryptocurrency-color:matic"
                    placeholder="0.000"
                />
            </div>
            <div className="w-full lg:w-1/4 my-2 lg:mr-4 flex jtems-center justify-between lg:justify-center font-bold text-gray-700 dark:text-gray-200">
                <span className="mr-6">Total Price</span>
                <span className="flex items-center">
                    <Icon icon="cryptocurrency-color:matic" className="mr-2" />{calculateTotalPrice(filteredTokenData, selectedCount) / (10 ** 18)}
                </span>
            </div>
            <Button onClick={handleAddToCart} size="w-full lg:w-40" color="red" fontSize="md">
                <Icon icon="material-symbols:shopping-cart" className="mr-2" />
                {isCartLoading? <LoadingSpinner /> : `Add to cart`}
                </Button>
        </div>
    );
};
