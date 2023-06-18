import request from "@utils/request";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { UserType } from "@utils/types/user.interface"

export const useSign = () => {
    const { address, isConnected } = useAccount()
    const [isDefinitelyConnected, setIsDefinitelyConnected] = useState(false);
    const [user, setUser] = useState<UserType | null>(null)

    const getUser = async () => {
        try {
            const { data } = await request.post("auth/sign", {
                address: address
            });
            if (data.address) setUser(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isConnected) {
            setIsDefinitelyConnected(true);
            getUser()
        } else {
            setIsDefinitelyConnected(false);
        }
    }, [address]);

    return { user }
}