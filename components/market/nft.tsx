// import { useEffect, useState } from 'react';
// import { ethers } from 'ethers';
// import NFTABI from '../../contracts/LTToken.json';

// export const NFT = () => {

//   const handleMintToken = async () => {
//     console.log(window.ethereum)
//     const network = 'http://localhost:8545';
//     const provider = new ethers.JsonRpcProvider(network);
//     const contractAddress = '0xd4421E832e6266d4ac94D5b93A2dC7b9e9426E4E';
//     const ABI = NFTABI.abi;

//     const NFTContract = new ethers.Contract(contractAddress, ABI, provider);

//     try {
//       const mintTx = await NFTContract._minting({ value: ethers.parseEther('1') });
//       await mintTx.wait();
//       console.log('성공');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <button onClick={handleMintToken}>Mint Token</button>
//     </>
//   );
// };
