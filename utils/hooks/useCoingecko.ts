import axios from 'axios'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

export const useCoinGecko = () => {
    const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets'
    const CURRENCY = 'krw'
    const COIN_ID = 'matic-network'

    const fetchMaticData = async () => {
        const response = await axios.get(
            `${COINGECKO_API_URL}?vs_currency=${CURRENCY}&ids=${COIN_ID}`
        )
        if (!response) {
            throw new Error('이미지 데이터를 가져오는데 실패했습니다')
        }
        return response.data[0].current_price
    }
    // ================================ //
    const getHistoricalPrice = async (date: string,price:number) => {
        console.log("price" , price)
        try {
            const response = await axios.get(
                `https://api.coingecko.com/api/v3/coins/${COIN_ID}/history`,
                {
                    params: {
                        date,
                        localization: false,
                    },
                }
            )
           console.log("response" , response)
            console.log("price 222" , price)
           
            if (response.data) {
                console.log(112222)
                const maticHistoryPrice = response.data.market_data.current_price.krw     
                const convertedPrice = ((price / 10 ** 18) * maticHistoryPrice).toFixed(3)
                console.log(convertedPrice)
                return maticHistoryPrice
            }

        } catch (e) {
            console.error(e)
        }
    }
    // ================================ //


    // const { data: maticHistoryPrice, isLoading: maticHistoryLoading } = useQuery(
    //     ['maticHistoryPrice', parsedDate],
    //     () => {
    //         return getHistoricalPrice(parsedDate as string)
    //     },
    //     {
    //         cacheTime: 60 * 60 * 24 * 1000,
    //         enabled: !!parsedDate,
    //     }
    // )

    const { data: maticCurrencyPrice, isLoading: isGeckoLoading } = useQuery(
        ['maticPrice'],
        () => {
            return fetchMaticData()
        },
        {
            cacheTime: 60 * 60 * 24 * 1000,
            enabled: true,
        }
    )

    const convertKRW = (maticAmount: number) => {
        if (!isGeckoLoading && maticCurrencyPrice) {
            return ((maticAmount / 10 ** 18) * maticCurrencyPrice).toFixed(3) // 소수점 3자리까지
        }
    }

    return { isGeckoLoading, maticCurrencyPrice, convertKRW , getHistoricalPrice}
}
