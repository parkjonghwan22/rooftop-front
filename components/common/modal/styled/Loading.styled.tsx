import { StyledProps } from "utils/types/style.interface";
import tw from "tailwind-styled-components";

export const LoadingWrapper = tw.div`
  fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50
`;

export const LoadingContent = tw.div<StyledProps>`
  relative z-99 rounded-lg shadow bg-white dark:bg-gray-500 w-1/2 h-3/4 opacity-70 
`;
