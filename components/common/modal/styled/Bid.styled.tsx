import { StyledProps } from "utils/types/style.interface";
import tw from "tailwind-styled-components";

export const BidWrapper = tw.div`
  fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 animate-zoomIn
`;

export const BidContent = tw.div<StyledProps>`
  relative z-99 rounded-lg shadow bg-white dark:bg-gray-700 w-2/5 h-2/4 
`;
