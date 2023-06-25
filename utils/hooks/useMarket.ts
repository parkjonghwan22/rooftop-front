import { ethers } from "ethers";
import MarketABI from '@contracts/Marketplace.json';
import { useState, useEffect } from "react";

export const useMarket = () => {
    const [market, setMarket] = useState<any>(null);
    const marketAddress = MarketABI.networks[80001].address


    useEffect(() => {
        if (window.ethereum) {
          const walletProvider = new ethers.BrowserProvider(window.ethereum as any);
          const fetchMarket = async () => {
            const signer = await walletProvider.getSigner();
      
            const marketInstance = await new ethers.Contract(marketAddress, MarketABI.abi, signer)
            // const addEvent = marketInstance.on('Add', listen => console.log(listen))
            setMarket(marketInstance);
          };
      
          fetchMarket();
        }
    }, []);



      
    return { market, marketAddress: market?.target, marketAbi: MarketABI.abi };
};
