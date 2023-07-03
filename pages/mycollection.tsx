import { CollectionInfo, CreateCollection, AddNewCollection } from "@components/collection";
import { LoadingSpinner2 } from "@components/common/loading";
import { RootLayout } from "@components/layout/layout"
import { useSign } from "@utils/hooks/useSign";


const MyCollection = () => {
    const { user, isLoading } = useSign()

    return (
        <RootLayout>
            {isLoading ?
                <LoadingSpinner2 />
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