import tw from "tailwind-styled-components"

export const ConnectWrapper = tw.div`
    relative rounded-lg bg-white dark:bg-gray-700 p-6 w-full
`

export const LoginText = tw.span`
    px-6 text-md font-normal text-gray-500 dark:text-gray-400
`

export const RecommendText= tw.span`
    inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400
`

export const WalletList = tw.ul`
    my-6 space-y-4
`

export const WalletItem = tw.li`
    flex items-center cursor-pointer px-5 py-3 text-base font-bold rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500
`

export const WalletName = tw.span`
    flex-1 ml-5 whitespace-nowrap
`