import { TokenData } from '@utils/types/nft.interface'
import { CartType } from '@utils/types/user.interface'
import { useQuery } from 'react-query'

export const useIpfs = (token: TokenData | CartType ) => {
    const fetchMetadata = async (metadata: string) => {
        const ipfsUrl = metadata.replace('ipfs://', '')
        const response = await fetch(`https://ipfs.io/ipfs/${ipfsUrl}`)
        if (!response.ok) {
            throw new Error('메타 데이터를 가져오는데 실패했습니다')
        }
        return response.json()
    }

    const { data: metaData, isLoading } = useQuery(
        ['metadata', token.metadata],
        () => fetchMetadata(token.metadata),
        { cacheTime: 300000 }
    )

    const imageUrl = metaData?.ipfs.replace('ipfs://', 'https://ipfs.io/ipfs/');


    return { metaData, imageUrl, isLoading }
}
