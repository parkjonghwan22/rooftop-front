import { ethers } from "ethers";
import MarketABI from '@contracts/Marketplace.json';
import { useState, useEffect } from "react";

export const useMarket = () => {
    const [market, setMarket] = useState<any>(null);


    useEffect(() => {
        const fetchMarket = async () => {
            const network = 'http://localhost:8545';
            const provider = new ethers.JsonRpcProvider(network);
            const marketAddress = '0x1D4A5bfE57d8028575D6937B1bf3356B2395b644'

            const privateKey = '0x2603fefd91a89b8724b732029bc2b6c271481a200868e39d6a1cfe604b820c49';
            const wallet = new ethers.Wallet(privateKey, provider);

            const marketInstance = new ethers.Contract(marketAddress, MarketABI.abi, wallet)

            setMarket(marketInstance);
        };

        fetchMarket();
    }, []);

    return { market, marketAddress : market?.target };
};
