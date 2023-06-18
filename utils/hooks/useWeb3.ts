// import { useState, useEffect } from "react";
// import Web3 from "web3";

// const useWeb3 = () => {
//     const [account, setAccount] = useState<any>(null);
//     const [web3, setWeb3] = useState<any>(null);

//     useEffect(() => {
//         if (!window.ethereum) return;

//         window.ethereum
//             .request({ method: "eth_requestAccounts" })
//             .then((accounts) => {
//                 setAccount(accounts[0]);
//                 const web3 = new Web3(window.ethereum);
//                 setWeb3(web3);
//             })
//             .catch((error: Error) => {
//                 console.error;
//             });
//     }, []);

//     return [account, web3];
// };

// export default useWeb3;
