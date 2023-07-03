import { ethers } from "ethers";
import MarketABI from '@contracts/Marketplace.json';
import { TokenData } from "@utils/types/nft.interface";
import { useCoinGecko } from "./useCoingecko";
import { CartType } from "@utils/types/user.interface";

export const useDecode = () => {
    const { convertKRW } = useCoinGecko()
    const marketInterface = new ethers.Interface(MarketABI.abi);


    const decodeEvent = (eventName: string, eventData: any) => {
        const eventFragment = marketInterface.getEvent(eventName);
        // console.log(`eventFragment :`, eventFragment)

        if (!eventFragment) {
            console.error(`이벤트 명: ${eventName}`);
            return null;
        }
        const decodedData = marketInterface.decodeEventLog(eventFragment, eventData);
        return decodedData;
    };

    const decodeMinted = (receipt: any, collectionAddress: string) => {
        for (const log of receipt.logs) {
            const eventName = log.event || log.topics[0];
            const eventData = log.data
            const data = decodeEvent(eventName, eventData);
            // console.log(data)
            if (data) {
                const decodedData = {
                    id: Number(data[0]),
                    from: receipt.to,
                    to: receipt.from,
                    NFTaddress: collectionAddress,
                    tokenId: Number(data[3]),
                    price: Number(data[4]),
                    krwPrice: convertKRW(Number(data[4])),
                    event: "minted"
                }
                return decodedData;
            }
        }
    }

    const decodeTransfer = (receipt: any, token: TokenData) => {
        for (const log of receipt.logs) {
            const eventName = log.event || log.topics[0];
            const eventData = log.data
            const data = decodeEvent(eventName, eventData);
            // console.log(data)
            if (data !== null) {
                const decodedData = {
                    id: Number(data[0]),
                    from: token.seller,
                    to: receipt.from,
                    NFTaddress: token.NFTaddress,
                    tokenId: Number(data[4]),
                    price: Number(data[5]),
                    krwPrice: convertKRW(Number(data[5])),
                    event: "transfer",
                };
                return decodedData;
            }
        }
    }

    const decodeTransfers = (receipt: any, carts: CartType[]) => {
        const decodedDatas = [];
      
        for (const log of receipt.logs) {
          const eventName = log.event || log.topics[0];
          const eventData = log.data;
          const data = decodeEvent(eventName, eventData);
          console.log(data);
      
          if (data !== null) {
            const cart = carts.find((cart) => {
              return ( Number(data[0]) === cart.id );
            });
      
            if (cart) {
              const decodedData = {
                id: Number(data[0]),
                from: cart.seller,
                to: cart.shopper,
                NFTaddress: cart.NFTaddress,
                tokenId: Number(data[4]),
                price: Number(data[5]),
                krwPrice: convertKRW(Number(data[5])),
                event: "transfer",
              };
              decodedDatas.push(decodedData);
            }
          }
        }
      
        return decodedDatas;
      };
    return { decodeMinted, decodeTransfer, decodeTransfers }
}


