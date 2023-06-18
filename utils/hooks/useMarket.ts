import { ethers } from "ethers";
import MarketABI from '@contracts/Marketplace.json';
import { useState, useEffect } from "react";

export const useMarket = () => {
    const [market, setMarket] = useState<any>(null);


    useEffect(() => {
        const fetchMarket = async () => {
            const network = 'http://localhost:8545';
            const provider = new ethers.JsonRpcProvider(network);
            const marketAddress = '0x21da33ca000f6E0CC2Aa9528Bf39512058B4BeA6'

            const privateKey = '0xd63d1be500e3d4ef49a6473a22b69ea6d5f4203b1af086a3a6e5eb52e2ad3538';
            const wallet = new ethers.Wallet(privateKey, provider);

            const marketInstance = new ethers.Contract(marketAddress, MarketABI.abi, wallet)

            setMarket(marketInstance);
        };

        fetchMarket();
    }, []);

    return { market, marketAddress : market?.target };
};
