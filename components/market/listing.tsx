import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MarketABI from '../../contracts/Marketplace.json';

interface MarketToken {
    id: string;
    NFTaddress: string;
    seller: string;
    tokenId: string;
    price: string;
  }
  
  export const Listing = () => {
    const [marketTokens, setMarketTokens] = useState<MarketToken[]>([]);
  
  useEffect(() => {
    const fetchMarketTokens = async () => {

      const network = 'http://localhost:8545';
      const provider = new ethers.JsonRpcProvider(network);
      const contractAddress = '0xE2Ad8B46B821e6f334dc21C6DC995a7420697F3E';
      const ABI = MarketABI.abi;

      const marketContract = new ethers.Contract(contractAddress, ABI, provider);
      const tokens = await marketContract.getAllNftsOnSale();

      setMarketTokens(tokens);
    }

    fetchMarketTokens();
  }, []);
  console.log(marketTokens)

  return (
    <div>
      <h2>Market Tokens</h2>
      {marketTokens.map(token => (
        <div key={token.id}>
          <p>Market ID: {token.id}</p>
          <p>NFT Address: {token.NFTaddress}</p>
          <p>Seller: {token.seller}</p>
          <p>Token ID: {token.tokenId}</p>
          <p>Price: {token.price}</p>
        </div>
      ))}
    </div>
  );
}
