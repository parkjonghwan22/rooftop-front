import { Icon } from '@iconify/react'
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi'


const AccountBalance = () => {
    const { chain } = useNetwork()
    const { address } = useAccount()
    const { data, refetch } = useBalance({
        address,
        watch: true,
    })
    const slicedData = `${data?.formatted.slice(0,6)}`


    return (
        <div>
            {slicedData}
            <button onClick={() => refetch()}>{data?.symbol}</button>
        </div>
    )
}

export const ShowBalance = () => {
    return (
        <>
            <Icon icon="bi:wallet-fill" className="text-lg mr-2" />
            <AccountBalance />
        </>
    )
}