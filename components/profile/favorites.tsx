import { CollectionData } from '@utils/types/nft.interface'
import Image from 'next/image'
import Link from 'next/link'
import { useQueryClient } from 'react-query'
import { useAccount } from 'wagmi'
import { FavoriteWrap } from './styled/Favorites.styled'

interface CollectionProps {
    collectionData: CollectionData[]
}

export const Favorites = ({ collectionData }: CollectionProps) => {
    const { address } = useAccount()

    if (!address || !collectionData) return null

    console.log('collectionData :: ', collectionData)

    const filteredCollectionData = collectionData.filter((collection: CollectionData) =>
        collection.favorite.includes(address)
    )

    console.log('filteredCollectionData :: ', filteredCollectionData)

    return (
        <>
            <FavoriteWrap>
                <div className="flex flex-wrap justify-center mt-2">
                    {filteredCollectionData.map((collection: CollectionData) => (
                      <Link href={`/collections/${collection.address}`}>
                        <div className="w-40 hover:transform hover:scale-105 transition duration-300 cursor-pointer mx-2 my-3 border-2 rounded-lg">
                            <div>
                                <Image
                                    src={collection.logo}
                                    alt="test"
                                    width={1000}
                                    height={1000}
                                    className="object-fill w-42 h-32 mx-auto rounded-t-lg"
                                />
                            </div>
                            <div className="rounded-b-lg w-42 h-12 mx-auto bg-white dark:bg-gray-900 shadow-lg opacity-90 ">
                                <div className="text-sm text-center pt-4 pb-4 font-bold">
                                    {collection.name}
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </FavoriteWrap>
        </>
    )
}
