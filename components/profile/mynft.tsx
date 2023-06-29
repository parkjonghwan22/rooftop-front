import { TokenData } from "@utils/types/nft.interface";
import { useIpfs } from '@utils/hooks/useIpfs';
import { MynftsWrap } from "./styled/Mynfts.styled";
import Image from "next/image";
import Link from "next/link";



const NFTItem = ({ token }: { token: TokenData }) => {
    const { metaData, imageUrl, isLoading } = useIpfs(token)


    if (isLoading) return <p>loading...</p> // 로딩 컴포넌트 필요
    return (
        <>
            <div className="group relative hover:animate-[wiggle_1s_ease-in-out_infinite] cursor-pointer mx-2 mt-3">
                <Link href={`/collections/${token.NFTaddress}/nft?id=${token.id}`}>
                    <div>
                        <Image
                            src={imageUrl ? imageUrl : 'https://dummyimage.com/480x480/ccc/000'}
                            alt="nft image"
                            width={1000}
                            height={1000}
                            className="object-fill w-20 h-20 mx-auto rounded-full border-2 dark:border-white"
                        />
                    </div>
                </Link>
                <div className="group-hover:opacity-100 transition-opacity opacity-0  absolute z-10 inline-block px-3 py-2 text-md text-gray-900 dark:text-green-500 bg-white dark:bg-gray-900 rounded-lg shadow-lg tooltip">
                    <span className="mr-2">#{token.tokenId}</span>
                    <span>{metaData.name}</span>
                </div>
            </div>
        </>
    )
}


export const MyNFT = ({ tokenData }: { tokenData: TokenData[] }) => {
    const sortedData = tokenData ? tokenData.sort((a, b) => b.id - a.id) : []

    return (
        <>
            <MynftsWrap>
                <div className="flex flex-wrap justify-center mt-2 ">
                    {sortedData.map((token) => (
                        <NFTItem key={token.id} token={token} />
                    ))}
                </div>
            </MynftsWrap>
        </>
    );
};
