import { StyledProps } from "utils/types/style.interface";
import tw from "tailwind-styled-components"


export const AlertContent = tw.div<StyledProps>`
  fixed flex flex-col top-10 right-10 rounded-lg shadow p-5 text-white max-h-9/10 overflow-y-scroll z-10
`;


