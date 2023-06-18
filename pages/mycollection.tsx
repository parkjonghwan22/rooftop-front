import { CollectionInfo, CreateCollection, AddNewCollection } from "@components/collection";
import { RootLayout } from "@components/layout/layout"
import { useSign } from "@utils/hooks/useSign";
import { useEffect, useState } from "react";


// 로딩 컴포넌트 필요

const MyCollection = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useSign()

    useEffect(() => {
        if (user) setIsLoading(false)
    }, [user])

    return (
        <RootLayout>
            {isLoading ?
                <>Loading...</>
                : (!user?.hasCollection) ? <CreateCollection />
                    : <>
                        <AddNewCollection />
                        <CollectionInfo address={user.address} />
                    </>
            }
        </RootLayout>
    )
}

export default MyCollection