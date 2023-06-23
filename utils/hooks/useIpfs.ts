import { TokenData } from "@utils/types/collection.interface";
import { useQuery } from "react-query"

export const useIpfs = (token: TokenData) => {

    const fetchMetadata = async (metadata: string) => {
        const ipfsUrl = metadata.replace('ipfs://', '');
        const response = await fetch(`https://ipfs.io/ipfs/${ipfsUrl}`);
        if (!response.ok) {
            throw new Error('메타 데이터를 가져오는데 실패했습니다');
        }
        return response.json();
    };


    const fetchImageData = async (ipfs: string) => {
        if (!ipfs) return
        const ipfsUrl = ipfs.replace('ipfs://', '');
        const response = await fetch(`https://ipfs.io/ipfs/${ipfsUrl}`);
        if (!response.ok) {
            throw new Error('이미지 데이터를 가져오는데 실패했습니다');
        }
        const imageData = await response.blob();
        const imageUrl = URL.createObjectURL(imageData);
        return imageUrl;
    };

    const { data: metaData, isLoading: isMetadataLoading, } = useQuery(['metadata', token.metadata], () => fetchMetadata(token.metadata));
    const { data: imageUrl, isLoading: isImageLoading } = useQuery(['image', metaData?.ipfs], () => fetchImageData(metaData?.ipfs));

    const isLoading = isMetadataLoading || isImageLoading;

    return { metaData, imageUrl, isLoading }
}