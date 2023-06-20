import { ethers } from "ethers";
import TokenABI from '@contracts/RTToken.json';
import { useState, useEffect } from "react";



export const useEthers = () => {
  const [factory, setFactory] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);


  useEffect(() => {
    if (window.ethereum) {
      const walletProvider = new ethers.BrowserProvider(window.ethereum as any);
      setProvider(walletProvider);

      const fetchFactory = async () => {
        const walletSigner = await walletProvider.getSigner();
        setSigner(walletSigner);

        const factoryInstance = new ethers.ContractFactory(TokenABI.abi, TokenABI.bytecode, walletSigner);
        setFactory(factoryInstance);
      };

      fetchFactory();
    }
  }, []);

  return { factory, provider, signer };
};