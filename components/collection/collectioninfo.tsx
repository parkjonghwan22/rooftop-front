import { useEffect, useState } from 'react'
import request from '@utils/request'
import { SectionWrap, SectionA, SectionB, Logo, CollectionName, Description, CollectionDatas } from './styled/collectioninfo.styled'
import { Icon } from '@iconify/react'
import { Button } from '@components/common/button'
import { Modal } from '@components/common/modal/Modal'
import { CreateNft } from '@components/collection/createNft'
import { CollectionData } from '@utils/types/nft.interface'



export const CollectionInfo = ({ address }: { address: string }) => {
    const [collections, setCollections] = useState<CollectionData[]>([])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isIndex , setIsIndex] = useState(0)

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
            {collections.map((collection,index) => (
                <SectionWrap key={collection.address}>
                    <Logo
                        src={collection.logo}
                        link={collection.url}
                        collectionAddress={collection.address}
                    />
                    <SectionA>
                        <CollectionName name={collection.name} verified={collection.verified} />
                        <Description description={collection.description} />
                        <CollectionDatas
                            creatorFee={collection.creatorFee}
                            totalVolume={collection.totalVolume}
                            floorPrice={collection.floorPrice}
                            follows={0}
                        />
                    </SectionA>
                    <SectionB>
                        <Button
                            onClick={() => {
                                setIsOpenModal(true)
                                setIsIndex(index)
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
                    collectionAddress={collections[isIndex].address}
                    royalty={collections[isIndex].creatorFee}
                />
            </Modal>
        </>
    )
}
