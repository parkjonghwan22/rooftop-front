import tw from "tailwind-styled-components"

export const CheckBoxWrapper = tw.ul`
    items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white
`

export const OptionWrapper = tw.li`
    w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600
`

export const Input = tw.input`
    w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-600 dark:border-gray-500 cursor-pointer
`

export const Label = tw.label`
    w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer
`