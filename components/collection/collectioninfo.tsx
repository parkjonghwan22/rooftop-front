import { useEffect, useState } from 'react'
import request from '@utils/request'
import {
    SectionWrap,
    SectionA,
    Logo,
    CollectionName,
    Description,
    CollectionDatas,
} from './styled/collectioninfo.styled'
import { Mint } from '@components/mint/mint'

interface Collection {
    address: string
    creator: string
    name: string
    symbol: string
    description: string
    url: string
    creatorFee: string
    logo: string
}

export const CollectionInfo = ({ address }: { address: string }) => {
    const [collections, setCollections] = useState<Collection[]>([])

    const getCollections = async () => {
        try {
            const { data } = await request.get(`collection/${address}`)
            // console.log(data);
            if (data) setCollections(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCollections()
    }, [address])

    if (collections.length === 0) return null

    return (
        <>
            {collections.map((collection) => (
                <SectionWrap key={collection.address}>
                    <Logo
                        src={collection.logo}
                        link={collection.url}
                        collectionAddress={collection.address}
                    />
                    <SectionA>
                        <CollectionName name={collection.name} verified={true} />
                        <Description description={collection.description} />
                        <CollectionDatas
                            creatorFee={collection.creatorFee}
                            totalVolume={0}
                            floorPrice={0}
                            follows={0}
                        />
                    </SectionA>
                </SectionWrap>
            ))}
            {/* <Mint collectionAddress={collections[0].address} royalty={collections[0].creatorFee} /> */}
        </>
    )
}
