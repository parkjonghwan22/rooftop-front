import request from "@utils/request";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { UserType } from "@utils/types/user.interface"
import config from "../../config"

export const useSign = () => {
    const { address, isConnected } = useAccount()
    const [isLoading, setIsLoading] = useState(true)
    const [isDefinitelyConnected, setIsDefinitelyConnected] = useState(false);
    const [user, setUser] = useState<UserType | null>(null)
    const [isOwner, setIsOwner] = useState(false)
    const [currentAddress, setCurrentAddress] = useState<`0x${string}` | undefined>()

    const getUser = async () => {
        try {
            const { data } = await request.post("auth/sign", {
                address: address
            });
            if (data.address) setUser(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        if (isConnected) {
            setIsDefinitelyConnected(true);
            getUser()
            setCurrentAddress(address)
        } else {
            setIsDefinitelyConnected(false);
        }
    }, [address]);

    useEffect(() => {
        if (currentAddress === config.OWNER) {
            setIsOwner(true);
        } else {
            setIsOwner(false);
        }
    }, [currentAddress]);

    return { user, isOwner, address: currentAddress, isConnected: isDefinitelyConnected, isLoading }
}