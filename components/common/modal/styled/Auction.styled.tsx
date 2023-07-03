import { StyledProps } from "utils/types/style.interface";
import tw from "tailwind-styled-components";

export const AuctionWrapper = tw.div`
fixed z-40 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50
`;

export const AuctionContent = tw.div<StyledProps>`
relative rounded-lg shadow bg-white dark:bg-gray-700 w-1/4 h-1/3
`;
