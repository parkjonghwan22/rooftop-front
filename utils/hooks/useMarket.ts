import { ethers } from "ethers";
import MarketABI from '@contracts/Marketplace.json';
import { useState, useEffect } from "react";

export const useMarket = () => {
    const [provider, setProvider] = useState<any>(null);
    const [market, setMarket] = useState<any>(null);
    

    const network = 'https://rpc-mumbai.maticvigil.com';
    const mumbaiProvider = new ethers.JsonRpcProvider(network);
    setProvider(mumbaiProvider)
    const marketAddress = MarketABI.networks[80001].address

    useEffect(() => {
        const fetchMarket = async () => {
            
            // const privateKey = '0x2603fefd91a89b8724b732029bc2b6c271481a200868e39d6a1cfe604b820c49';
            // const wallet = new ethers.Wallet(privateKey, provider);
            const signer = await mumbaiProvider.getSigner();
            const marketInstance = await new ethers.Contract(marketAddress, MarketABI.abi, signer)

            setMarket(marketInstance);
        };

        fetchMarket();
    }, []);

    return { provider, market, marketAddress: market?.target };
};
