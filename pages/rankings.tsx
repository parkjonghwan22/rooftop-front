import { RootLayout } from '@components/layout/layout'
import Stats from '@components/stats/stats'
import request from '@utils/request'
import { useQuery } from 'react-query'

const Rankings = () => {
    const getAllCollectionData = async () => {
        try {
            const { data } = await request.get(`collection/`)
            console.log('getAllCollectionData : ', data)
            return data
        } catch (error: unknown) {
            throw new Error(error as string)
        }
    }

    const { data: allCollectionData, isLoading: getAllCollectionLoading } = useQuery(
        ['allCollection'],
        () => getAllCollectionData()
    )

    const isLoading = getAllCollectionLoading

    if (isLoading || !allCollectionData) return <p>Loading...</p> // 로딩 컴포넌트쫌!!!

    return (
        <RootLayout>
            <Stats collectionDatas={allCollectionData}/>
        </RootLayout>
    )
}

export default Rankings
