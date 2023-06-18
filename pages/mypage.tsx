import { RootLayout } from "@components/layout/layout"
import { ProfileCard } from "@components/profile/profile";
import { useSign } from "@utils/hooks/useSign";
import { useEffect, useState } from "react";


const MyPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useSign()

    useEffect(() => {
        if (user) setIsLoading(false)
    }, [user])

    return (
        <RootLayout>
            {isLoading ? 
            <>Loading...</> 
            : <ProfileCard user={user} />
            }
        </RootLayout>
    )
}

export default MyPage