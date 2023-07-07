import { Icon } from '@iconify/react'
import { useCoinGecko } from '@utils/hooks/useCoingecko';

export const CurrentPrice = ({ price, bid }: { price: number, bid: number }) => {
    const { convertKRW } = useCoinGecko();

    return (
        <>
            {bid !== 0 ? (
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold flex items-center">
                        <Icon icon="cryptocurrency-color:matic" className="mr-2" />
                        {bid / 10 ** 18}
                        <span className="text-sm bg-red-500 text-white rounded-lg px-1 ml-2 animate-bounce">
                            Highest Bid
                        </span>
                    </h1>
                    <span className="ml-10 text-sm text-green-500 dark:text-green-600">
                        {convertKRW(bid)}￦
                    </span>
                </div>
            ) :
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold flex items-center">
                        <Icon icon="cryptocurrency-color:matic" className="mr-2" />
                        {price / 10 ** 18}
                    </h1>
                    <span className="text-md text-cyan-600 dark:text-cyan-500">
                        {convertKRW(price)}￦
                    </span>
                </div>
            }
        </>
    )
}