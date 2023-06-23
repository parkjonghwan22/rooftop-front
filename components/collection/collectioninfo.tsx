import { useEffect, useState } from 'react'
import request from '@utils/request'
import {
    SectionWrap,
    SectionA,
    SectionB,
    Logo,
    CollectionName,
    Description,
    CollectionDatas,
} from './styled/collectioninfo.styled'
import { Icon } from '@iconify/react'
import { Button } from '@components/common/button'
import { Modal } from '@components/common/modal/Modal'
import { CreateNft } from '@components/collection/createNft'
import axios from 'axios'

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
    const [isOpenModal, setIsOpenModal] = useState(false)
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
                    <SectionB>
                        <Button
                            onClick={() => {
                                setIsOpenModal(true)
                            }}
                            color="blue"
                            size="w-28 h-10"
                        >
                            <Icon icon="carbon:intent-request-create" className="text-lg mr-1.5" />
                            New NFT
                        </Button>
                    </SectionB>
                </SectionWrap>

            ))}
            <Modal
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                width="20rem"
                height="1.5rem"
            >
                <CreateNft
                    setIsOpenModal={setIsOpenModal}
                    collectionAddress={collections[0].address}
                    royalty={collections[0].creatorFee}
                />
            </Modal>
        </>
    )
}
