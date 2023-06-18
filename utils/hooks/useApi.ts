import axios from "axios";
import { useEffect, useState } from "react";

export const useGetListOpenSea = () => {
    // f00239c6421f4175bcf6c114bfa366be
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        await axios
            .get(
                `https://api.opensea.io/api/v1/assets?`,
                {
                    headers: {
                        'x-api-key': 'f00239c6421f4175bcf6c114bfa366be',
                    },
                }
            )
            .then((response) => {
                setData(response.data.assets)
                if (response.data.assets) setIsLoading(false)
            })
            .catch(console.error);
    }
    

    useEffect(() => {
        fetchData()
    }, [])

    return { isLoading, data }
}
