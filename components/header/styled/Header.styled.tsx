import { ShowAddress, ShowBalance } from "@components/addressInfo";
import { StyledOptions, StyledProps } from "@utils/types/style.interface";
import { Icon } from "@iconify/react";
import tw from "tailwind-styled-components";

export const HeaderWrap = tw.header`
    text-gray-500 dark:text-gray-100 body-font dark:bg-gray-900 fixed top-0 left-0 right-0
`;

export const HeaderContainer = tw.div`
  container  mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center
`;

const TitleWrap = tw.div`
  flex title-font font-medium items-center mb-4 md:mb-0
`;

const Logo = tw.svg`
  w-10 h-10 text-white p-2 bg-red-500 rounded-full
`;

export const TitleContainer = () => {
  return (
    <TitleWrap>
      <Logo
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-10 h-10 text-white p-2 bg-red-500 rounded-full"
        viewBox="0 0 24 24"
      >
        <path d="M19 16h3L12 7L2 16h3l7-6.31L19 16M7 8.81V7H4v4.5l3-2.69Z"></path>
      </Logo>
      <span className="ml-3 text-xl">ROOFTOP</span>
    </TitleWrap>
  );
};

export const SearchContainer = tw.nav`
  md:ml-auto mx-auto flex flex-wrap items-center text-base justify-center w-450
`;

export const SearchBox = () => {
  return (
    <>
      <form className="w-full">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-none "
            placeholder="Search items, collections, accounts"
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-red-500 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-500 dark:hover:bg-gray-400 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
};

const backgroundColors: StyledOptions = {
  red: "bg-red-500",
  orange: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  gray: "bg-gray-100",
};

const textSizes: StyledOptions = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
};

const textColors: StyledOptions = {
  white: "text-white",
  black: "text-black",
  gray: "text-gray-900",
};

interface ButtonProps extends StyledProps {
  onClick: () => void;
}

export const Button = ({
  onClick,
  backgroundColor,
  color,
  fontSize,
  children,
}: ButtonProps) => {
  const buttonStyled: string = `inline-flex items-center order-0 py-1.5 px-3 mr-3 focus:outline-none hover:bg-gray-400 rounded text-base mt-4 md:mt-0 transition duration-300 ease-in-out`;

  let bgColor = backgroundColors[backgroundColor ? backgroundColor : "gray"];
  let txtSize = textSizes[fontSize ? fontSize : "sm"];
  let txtColor = textColors[color ? color : "black"];

  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${txtSize} ${txtColor} ${buttonStyled}`}
    >
      {children}
    </button>
  );
};

export const HeaderUserInfo = () => {
  const HeaderUserInfoStyled = tw.div`
    text-sm flex items-center md:space-x-3 py-2 px-3 mr-5 rounded-full text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-300 hover:dark:bg-gray-500 cursor-pointer
  `;

  return (
    <HeaderUserInfoStyled>
      <ShowAddress />
      <ShowBalance />
    </HeaderUserInfoStyled>
  );
};
