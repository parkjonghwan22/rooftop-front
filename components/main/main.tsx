import Category from './styled/category'
import Collection from './styled/collection'
import Slide from './styled/slide'
import { useQueryClient, useQuery } from 'react-query'
import { useCoingecko } from '@utils/hooks/useCoingecko'

const Main = () => {
    // const { data: maticPriceData, isLoading: maticPriceLoading } = useQuery(
    //     'maticPrice',
    //     useCoingecko
    // )
    // console.log('maticPriceData :', maticPriceData?.maticPrice)

    return (
        <div className="mx-auto flex flex-col items-center">
            <Slide />
            <Category />
            <Collection />
        </div>
    )
}

export default Main
