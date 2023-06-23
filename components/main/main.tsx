import Category from './styled/category'
import Collection from './styled/collection'
import Slide from './styled/slide'
import { useState } from 'react'
import axios from 'axios'
import config from '../../config'
import { useQuery } from 'react-query'

const Main = () => {
    const [maticPrice, setMaticPrice] = useState() // 1 MATIC 가격

    const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets'
    const CURRENCY = 'krw'
    const COIN_ID = 'matic-network'

    const fetchMaticData = async () => {
        await axios
            .get(`${COINGECKO_API_URL}?vs_currency=${CURRENCY}&ids=${COIN_ID}`)
            .then((response) => {
                if (!response.data) {
                    alert('API 서버로부터 데이터 가져오기 실패')
                    return
                }
                setMaticPrice(response.data[0].current_price)
            })
    }

    const { data: maticCurrencyPrice, isLoading: isMaticLoading } = useQuery(
        ['maticPrice'],
        () => {
            fetchMaticData()
        },
        {
            refetchInterval: 60 * 60 * 1000,
        }
    )
    return (
        <div className="mx-auto flex flex-col items-center">
            <Slide />
            <Category />
            <Collection />
        </div>
    )
}

export default Main
