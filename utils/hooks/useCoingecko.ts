import axios from 'axios'
import { useEffect, useState } from 'react'

export const useCoingecko = () => {
    const [maticPrice, setMaticPrice] = useState<number | undefined>() // 1 MATIC 가격
    const [amount, setAmount] = useState<number | undefined>() // 내가가지고있는 MATIC 이랑 1 MATIC 가격 곱하기

    const API_URL = 'https://api.coingecko.com/api/v3/coins/markets'
    const CURRENCY = 'krw'
    const COIN_ID = 'matic-network'
    const TARGET_PRICE = 3 // 환산받을 MATIC

    /**
     * Coingecko Test
     */
    const fetchData = async () => {
        await axios.get(`${API_URL}?vs_currency=${CURRENCY}&ids=${COIN_ID}`).then((response) => {
            if (!response.data) {
                alert('API 서버로부터 데이터 가져오기 실패')
                return
            }
            console.log('matic response data : ', response.data)

            setMaticPrice(response.data[0].current_price)
            console.log('현재 1matic 가격 836: ', maticPrice)

            if (maticPrice !== undefined) {
                setAmount(TARGET_PRICE * maticPrice)
            }
        })
    }

    /**
     * Coingecko Test End
     *  */

    useEffect(() => {
        fetchData()
    }, [maticPrice])

    return { amount, maticPrice }
}
