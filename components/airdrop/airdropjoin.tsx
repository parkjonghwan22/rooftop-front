import { Button } from "@components/common/button"
import { LoadingSpinner } from "@components/common/loading"
import { useInput } from "@utils/hooks/useInput"
import request from "@utils/request"
import { AirdropData } from "@utils/types/nft.interface"
import { useState } from "react"
import { toast } from "react-toastify"
import { useAccount } from "wagmi"

export const AddressInput = ({ airdrop }: {airdrop: AirdropData}) => {
    const { address } = useAccount()
    const [isLoading, setIsLoading] = useState(false)
    const userAddress = useInput('')
    

    const handleJoinAirdrop = async () => {
        if (!address) return 

        if (address !== userAddress.value) {
            toast.error("Please enter correct address")
            return
        }
        try {
            setIsLoading(true)
            const response = await request.put(`airdrop/update`, {
                NFTaddress: airdrop.NFTaddress,
                target: [userAddress.value],
            })
            if ( response.status === 200 ) {
                toast.success('Your airdrop request has been completed')
                setIsLoading(false)
            }

        } catch (e) {
            setIsLoading(false)
            console.error(e)
        }
    }

    return (
        <div className="flex w-full lg:w-3/4 mx-auto flex-col md:flex-row items-center justify-center rounded-b-xl p-6 bg-[#3B3B3B] lg:h-[140px]">
            <div className="flex flex-col lg:flex-row w-full justify-center items-center flex-row text-start text-white">
                <div className="flex flex-col gap-2.5">
                    <div className="text-2xl lg:text-2xl xl:text-4xl font-semibold pr-10 xl:pr-36 mb-4">
                        Trade NFTs & <br></br> Get Rewards
                    </div>
                </div>
                <div className="w-96 h-[60px] flex items-center rounded-xl bg-white md:flex">
                    <input
                        name="address"
                        value={userAddress.value}
                        onChange={userAddress.onChange}
                        placeholder="Enter your address"
                        className="w-2/3 outline-none bg-transparent px-4 text-md text-gray-800"
                    />
                    <div className="w-1/3 px-3 pb-4 md:pb-0">
                        <Button onClick={handleJoinAirdrop} color="purple">
                            {isLoading ? <LoadingSpinner />: 'Submit'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>)
}

