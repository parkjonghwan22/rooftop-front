import tw from "tailwind-styled-components";

export const NFTWrap = tw.div`
    mx-auto h-450 border rounded-lg mt-10
`;

const NFT = () => {
  return (
    <>
      <NFTWrap></NFTWrap>
    </>
  );
};

export default NFT;
