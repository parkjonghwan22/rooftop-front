import { ethers } from "ethers";
import MarketABI from '@contracts/Marketplace.json';
import { useState, useEffect } from "react";

export const useMarket = () => {
  const [market, setMarket] = useState<any>(null);
  const [latestId, setLatestId] = useState<number | null>(null);
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

  const getLatestId = async () => {
    if (!market) return null
    const result = await market.getLatestId()
    const parsedResult = Number(result)
    return parsedResult
  }

  const getLowestPrice = async (address: string) => {
    if (!market) return null
    const result = await market.lowestPriceByCollection(address)
    const parsedResult = Number(result) / (10 ** 18)
    return parsedResult
  }

  const getTotalVolume = async (address: string) => {
    if (!market) return null
    const result = await market.totalSalesByCollection(address)
    const parsedResult = Number(result) / (10 ** 18)
    return parsedResult
  }

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

  useEffect(() => {
    const fetchLatestId = async () => {
      if (market) {
        const id = await getLatestId();
        setLatestId(id);
      }
    };

    fetchLatestId();
  }, [market]);

  return {
    market,
    marketAddress: market?.target,
    latestId,
    decodeEvent,
    getLowestPrice,
    getTotalVolume
  };
};
