import { CollectionInfo, CreateCollection, AddNewCollection } from "@components/collection";
import { RootLayout } from "@components/layout/layout"
import { useSign } from "@utils/hooks/useSign";
import { useEffect, useState } from "react";


// 로딩 컴포넌트 필요

const MyCollection = () => {
    const { user, isLoading } = useSign()

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