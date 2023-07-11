import { useInput } from '@utils/hooks/useInput'
import { CreateNftWrapper, NftFormContainer, NftTitle, NftLabel } from './styled/createNft.styled'
import React, { useState } from 'react'
import { InputBox, PriceInputBox, TextArea } from '@components/common/input'
import { Button, NFTGenerator } from '@components/common/button'
import { LoadingSpinner } from '@components/common/loading'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FileNftInputBox } from '@components/common/input/fileNftInputBox'
import { useMint } from '@utils/hooks/useMint'

interface MintProps {
    collectionAddress: string
    royalty: string
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    collectionDescription: string;
}

export const CreateNft = ({ setIsOpenModal, collectionAddress, royalty, collectionDescription }: MintProps) => {
    const { mintNFT, listNFT } = useMint(collectionAddress)
    const [isLoading, setIsLoading] = useState(false)
    const [nftImage, setNftImage] = useState('')
    const [metaData, setMetaData] = useState('')
    const [latestTokenId, setLatestTokenId] = useState<number>()
    
    const nftName = useInput('')
    const nftPrice = useInput('')
    const nftDescription = useInput('')


    const handleMintNFT = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (!nftImage) return

            const body = JSON.stringify({
                name: nftName.value,
                description: nftDescription.value,
                image: nftImage,
            })
            toast.info('Data is loading...');

            const response = await fetch('/api/verify', { method: 'POST', body })
            const data = await response.json()
            const tokenURI = `ipfs://${data.IpfsHash}`
            setMetaData(tokenURI)
            const tokenId = await mintNFT(tokenURI)
            if (tokenId) {
                setLatestTokenId(tokenId)
                setIsLoading(false)
                toast.success(`NFT Minting completed successfully`)
            }
        } catch (e: unknown) {
            console.error(e as Error)
        }
    }


    const handleListNFT = async () => {
        if (!latestTokenId || !metaData) return
        setIsLoading(true)

        const nft = {
            collectionAddress, 
            latestTokenId, 
            price: nftPrice.value as string | number,
            metaData, 
            royalty
        }

        const response = await listNFT(nft)
        if (response?.statusText === "Created") {
            toast.success("Your NFT Listed on Market")
            setIsLoading(false)
            setIsOpenModal(false)
        }
    }
    

    return (
        <>
            <CreateNftWrapper>
                <NftFormContainer onSubmit={handleMintNFT}>
                    <NftTitle className="text-center">
                        List NFT on your Collection
                    </NftTitle>
                    <NftLabel htmlFor="NftName">NFT Name</NftLabel>
                    <InputBox
                        value={nftName.value}
                        onChange={nftName.onChange}
                        name="name"
                        icon="ri:nft-fill"
                        placeholder="Please write down the NFT name"
                    />

                    <NftLabel htmlFor="NftPrice">NFT Price</NftLabel>
                    <PriceInputBox
                        value={nftPrice.value}
                        onChange={nftPrice.onChange}
                        name="price"
                        icon="cryptocurrency-color:matic"
                        placeholder="0.000"
                    />
                    <NftLabel htmlFor="NftDescription">Description</NftLabel>
                    <TextArea
                        value={nftDescription.value}
                        onChange={nftDescription.onChange}
                        id="description"
                        placeholder="Please introduce your NFT"
                    />
                    <NftLabel htmlFor="NftImage">Add Image</NftLabel>
                    <NFTGenerator state={nftImage} setState={setNftImage} description={collectionDescription} />
                    <FileNftInputBox
                        state={nftImage}
                        setState={setNftImage}
                        id="file-upload"
                        name="file-upload"
                        type="file"
                    />
                    {isLoading && (
                        <Button type="submit" color="blue" disabled>
                            <LoadingSpinner /> Uploading...
                        </Button>
                    )}
                    {!isLoading && !latestTokenId && (
                        <Button type="submit" color="blue">
                            Create NFT
                        </Button>
                    )}
                    {!isLoading && latestTokenId && (
                        <Button onClick={handleListNFT} color="green">
                            List NFT on Market
                        </Button>
                    )}
                </NftFormContainer>
            </CreateNftWrapper>
        </>
    )
}
