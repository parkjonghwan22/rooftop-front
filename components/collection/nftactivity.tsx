import tw from 'tailwind-styled-components'
import { Icon } from '@iconify/react'
import { useEffect } from "react"
import { TokenData } from "@utils/types/collection.interface"
import { useMarket } from '@utils/hooks/useMarket'

export const NFTActivity = ({ token }: { token: TokenData }) => {
    const { market } = useMarket()

    console.log(market)


    const ThStyled = tw.th`
        px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400
    `
    const TdStyled = tw.td`
        px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 dark:bg-gray-600
    `
    return (
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg shadow overflow-hidden dark:border-gray-800 dark:shadow-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <ThStyled>Event</ThStyled>
                                    <ThStyled>From</ThStyled>
                                    <ThStyled>To</ThStyled>
                                    <ThStyled>Price</ThStyled>
                                    <ThStyled>Date</ThStyled>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                <tr>
                                    <TdStyled>Minted</TdStyled>
                                    <TdStyled>0xEAC1...ABCD</TdStyled>
                                    <TdStyled>0xFAB2...EO98</TdStyled>
                                    <TdStyled className="font-bold">0.003 MATIC</TdStyled>
                                    <TdStyled>2h ago</TdStyled>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}