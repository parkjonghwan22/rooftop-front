import { ethers } from "ethers";
import MarketABI from '@contracts/Marketplace.json';
import { useState, useEffect } from "react";

export const useMarket = () => {
  const [market, setMarket] = useState<any>(null);
  const marketAddress = MarketABI.networks[80001].address
  const marketInterface = new ethers.Interface(MarketABI.abi);


  const decodeEvent = (eventName: string, eventData: any) => {
    const eventFragment = marketInterface.getEvent(eventName);
    // console.log(`eventFragment :`, eventFragment)

    if (!eventFragment) {
      console.error(`이벤트 명: ${eventName}`);
      return null;
    }
    const decodedData = marketInterface.decodeEventLog(eventFragment, eventData);
    // console.log(`decodedData :`, decodedData)
    return decodedData;
  };
  

  useEffect(() => {
    if (window.ethereum) {
        const walletProvider = new ethers.BrowserProvider(window.ethereum as any);

        const fetchMarket = async () => {
        const signer = await walletProvider.getSigner();
        const marketInstance = await new ethers.Contract(marketAddress, MarketABI.abi, signer)
        setMarket(marketInstance);
      };
      fetchMarket();
    }
  }, []);



  return { market, marketAddress: market?.target, decodeEvent };
};
