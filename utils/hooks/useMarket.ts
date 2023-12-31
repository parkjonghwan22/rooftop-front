import { ethers } from "ethers";
import MarketABI from '@contracts/Marketplace.json';
import { useState, useEffect } from "react";
import request from "@utils/request";
import { useAccount, useNetwork } from "wagmi";

export const useMarket = () => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
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



  const convertToWei = (number: number, decimals: number) => {
    const wei = ethers.parseUnits(number.toString(), decimals)
    return wei.toString()
  }

  const getLowestPrice = async (address: string) => {
    if (!market) return null
    const result = await market.lowestPriceByCollection(address)
    return result
  }
  const getTotalVolume = async (address: string) => {
    if (!market) return null
    const result = await market.totalSalesByCollection(address)
    const parsedResult = Number(result) / (10 ** 18)
    return parsedResult
  }

  const updateCollection = async (address: string) => {
    try {
      const currentVolume = await getTotalVolume(address);
      const currentFloor = await getLowestPrice(address);
      console.log(currentFloor);
      const { data } = await request.put('collection/update', {
        address,
        totalVolume: Number(currentVolume),
        floorPrice: Number(currentFloor) / (10 ** 18),
        totalSales: 1,
      });
      console.log(data)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const rpcProvider = new ethers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/4effc98f83904a0a84a2e32bfb93ef2a")
    const walletProvider = new ethers.BrowserProvider(window.ethereum as any, 80001);

    if (window.ethereum && address && chain && chain.id === 80001) {
      
      const fetchMarket = async () => {
        const signer = await walletProvider.getSigner();
        const marketInstance = await new ethers.Contract(marketAddress, MarketABI.abi, signer)
        // const owner = await marketInstance.owner()
        // setOwner(owner)
        setMarket(marketInstance);
      };
      fetchMarket();
    } else {
      const marketInstance = new ethers.Contract(marketAddress, MarketABI.abi, rpcProvider)
      setMarket(marketInstance)
    }

  }, []);

  return {
    market,
    marketAddress: market?.target,
    decodeEvent,
    convertToWei,
    updateCollection
  };
};
