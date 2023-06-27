import tw from "tailwind-styled-components";

export const ProfileCardWrap = tw.div`
    bg-white dark:bg-gray-800 relative shadow-md rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto mt-16 pb-6
`;

export const UserAddress = tw.span`
    flex justify-center items-center text-gray-200 rounded-lg text-center font-medium px-6 py-3 bg-gray-700 dark:bg-gray-900 hover:bg-black hover:text-white cursor-pointer
`;
