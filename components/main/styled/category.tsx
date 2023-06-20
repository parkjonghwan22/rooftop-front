import tw from "tailwind-styled-components";

export const CategoryWrap = tw.div`
    mx-auto h-650 border rounded-lg mt-10
`;

const Category = () => {
  return (
    <>
      <CategoryWrap></CategoryWrap>
    </>
  );
};

export default Category;
