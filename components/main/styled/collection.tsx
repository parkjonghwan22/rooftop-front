import tw from "tailwind-styled-components";

export const CollectionWrap = tw.div`
    mx-auto h-450 border rounded-lg mt-10
`;

const Collection = () => {
  return (
    <>
      <CollectionWrap></CollectionWrap>
    </>
  );
};

export default Collection;
