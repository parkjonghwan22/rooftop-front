import tw from 'tailwind-styled-components'
import { useEffect, useState } from "react"
import { TokenData, ActivityData } from "@utils/types/nft.interface"
import { useMarket } from '@utils/hooks/useMarket'
import { UserAddress } from './styled/nft.styled'
import { Alert } from '@components/common/alert'
import { Icon } from '@iconify/react'
import { useTimeStamp } from '@utils/hooks/useTimeStamp'
import { ethers } from 'ethers'

export const NFTActivity = ({ token, activity }: { token: TokenData, activity: ActivityData[] }) => {
    const [isOpenAlert, setIsOpenAlert] = useState(false)

    const handleCopy = (address: string) => {
        navigator.clipboard.writeText(address);
        setIsOpenAlert(true)
    }

    const ThStyled = tw.th`
        px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400
    `
    const TdStyled = tw.td`
        px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 dark:bg-gray-600
    `

    return (
        <>
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
                                    {activity.slice().reverse().map((item, index) => (
                                        <tr key={index}>
                                            <TdStyled>{item.event}</TdStyled>
                                            <TdStyled onClick={() => { handleCopy(item.from) }}>
                                                <UserAddress onClick={() => { handleCopy(item.from) }}>
                                                    {`${item.from.slice(0, 6)}...${item.from.slice(-4)}`}
                                                    <Icon icon="bxs:copy" className="ml-1" />
                                                </UserAddress>
                                            </TdStyled>
                                            <TdStyled onClick={() => { handleCopy(item.to) }}>
                                                <UserAddress onClick={() => { handleCopy(item.to) }}>
                                                    {`${item.to.slice(0, 6)}...${item.to.slice(-4)}`}
                                                    <Icon icon="bxs:copy" className="ml-1" />
                                                </UserAddress>
                                            </TdStyled>
                                            <TdStyled className="font-bold">{item.price / (10 ** 18)} MATIC</TdStyled>
                                            <TdStyled>{useTimeStamp(item.createdAt)}</TdStyled>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Alert isOpenAlert={isOpenAlert} setIsOpenAlert={setIsOpenAlert} color="green">지갑 주소가 복사되었습니다</Alert>
        </>
    )
}