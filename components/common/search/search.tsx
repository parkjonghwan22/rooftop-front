import { Icon } from "@iconify/react";
import tw from "tailwind-styled-components"

export const SearchContainer = tw.nav`
  mx-auto flex flex-wrap items-center text-base justify-center w-0 md:w-450 invisible sm:visible
`;

export const SearchBox = () => {
  return (
    <>
      <div className="flex justify-center items-center border rounded-lg border-gray-200 dark:border-gray-600 overflow-hidden dark:bg-gray-700">
        <div className="xl:w-96">
          <div className="input-group relative flex items-stretch w-full">
            <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-transparent dark:placeholder-gray-400 dark:text-gray-300 transition ease-in-out m-0 focus:text-gray-700  focus:outline-none" placeholder="Search collections" />
            <button className="px-4 py-1 bg-red-500 text-white font-medium text-xs leading-tight uppercase shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button">
            <Icon icon="iconamoon:search-bold" className="text-xl" />
            </button>
            </div>
          </div>
      </div>
    </>
  );
};