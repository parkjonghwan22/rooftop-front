import { ethers } from "ethers";
import MarketABI from '@contracts/Marketplace.json';
import { useState, useEffect } from "react";

export const useEvent = () => {

}





    // const buyEvent = async () => {
    //     try {
    //         const walletProvider = new ethers.BrowserProvider(window.ethereum as any);
    //         const latestBlock = await walletProvider.getBlockNumber();
    //         console.log('Latest Block:', latestBlock);

    //         const fromBlock = latestBlock - 1000;
    //         const toBlock = latestBlock;
    //         console.log(toBlock)

    //         const buyEvents = await market.queryFilter("Buy", fromBlock, toBlock);
    //         console.log(buyEvents)

    //         buyEvents.forEach((event: any) => console.log("Event:", event));
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };
    // useEffect(() => {
    //     if (!market) return
    //     buyEvent()
    // }, [market])