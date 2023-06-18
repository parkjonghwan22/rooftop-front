import { ethers } from "ethers";
import TokenABI from '@contracts/LTToken.json';
import { useState, useEffect } from "react";

export const useFactory = () => {
  const [factory, setFactory] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);

  const network = 'http://localhost:8545';
  const provider = new ethers.JsonRpcProvider(network);

  useEffect(() => {
    const fetchFactory = async () => {
      const signer = await provider.getSigner();
      const factoryInstance = new ethers.ContractFactory(TokenABI.abi, TokenABI.bytecode, signer);

      setFactory(factoryInstance);
      setSigner(signer);
    };

    fetchFactory();
  }, []);



  return { factory, signer };
};
