import { useInput } from '@utils/hooks/useInput'
import { CreateNftWrapper, NftFormContainer, NftTitle, NftLabel } from './styled/createNft.styled'
import request from '@utils/request'
import { useState } from 'react'
import { FileInputBox, InputBox, TextArea } from '@components/common/input'
import { Button } from '@components/common/button'
import { LoadingSpinner } from '@components/common/loading/loading'
interface CreateNftProps {
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateNft = ({ setIsOpenModal }: CreateNftProps) => {
    const [isFocused, setIsFocused] = useState('')
    const [isDuplicated, setIsDuplicated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [nftImage, setNftImage] = useState('')
    const nftName = useInput('')
    const nftPrice = useInput('')
    const nftDescription = useInput('')

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const inputId = e.target.id
            setIsFocused(inputId)

            const { data } = await request.post('collection/check', {
                [`${inputId}`]: e.target.value,
            })
            !data ? setIsDuplicated(true) : setIsDuplicated(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <CreateNftWrapper>
                <NftFormContainer>
                    <NftTitle className="text-center">
                        Welcome! This is where you register your NFT.
                    </NftTitle>
                    <NftLabel htmlFor="NftName">NFT Name</NftLabel>
                    <InputBox
                        value={nftName.value}
                        onChange={nftName.onChange}
                        onInput={handleInputChange}
                        name="name"
                        icon="mdi:collection"
                        placeholder="Please write down the NFT name"
                    />

                    <NftLabel htmlFor="NftPrice">NFT Price</NftLabel>
                    <InputBox
                        value={nftPrice.value}
                        onChange={nftPrice.onChange}
                        onInput={handleInputChange}
                        name="price"
                        icon="mdi:collection"
                        placeholder="Please write down the NFT price"
                    />

                    <NftLabel htmlFor="NftDescription">Description</NftLabel>
                    <TextArea
                        value={nftDescription.value}
                        onChange={nftDescription.onChange}
                        id="description"
                        placeholder="Please introduce your NFT"
                    />
                    <NftLabel htmlFor="NftImage">대표 이미지 등록</NftLabel>
                    <FileInputBox state={nftImage} setState={setNftImage} />
                    {isLoading ? (
                        <Button type="submit" color="blue" disabled>
                            <LoadingSpinner /> 등록중...
                        </Button>
                    ) : (
                        <Button type="submit" color="blue">
                            컬렉션 등록
                        </Button>
                    )}
                </NftFormContainer>
            </CreateNftWrapper>
        </>
    )
}
