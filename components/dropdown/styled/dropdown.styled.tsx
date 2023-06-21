import tw from "tailwind-styled-components"


export const DropDownWrapper = tw.div`
    relative z-10
`

export const Button = tw.button`
    flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-green-600 dark:hover:text-green-300 dark:text-white hover:dark:bg-gray-700 py-1.5 px-1 transition duration-150 
`

export const MenuWrapper = tw.div`
    absolute w-52 translate-y-[4%] translate-x-[-20%] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-600
`

export const TopContainer = tw.div`
    flex py-4 px-4 text-sm text-gray-900 dark:text-white cursor-pointer
`


export const NavContainer = tw.ul`
    py-2 text-sm text-gray-700 dark:text-gray-200
`

export const NavLink = tw.li`
    block text-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer
`