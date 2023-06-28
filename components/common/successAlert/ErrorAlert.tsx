import { Icon } from '@iconify/react'
import { useState } from 'react'
import {
    AlertErrorWrapper,
    AlertErrorDiv,
    AlertErrorSvg,
    AlertErrorSecondDiv,
    AlertErrorSecondDiv2,
    AlertErrorSpan,
    AlertErrorP,
    AlertErrorSecondDiv3,
    AlertErrorSecondBtn,
} from './styled'

export const ErrorAlert = () => {
    const [visible, setVisible] = useState(true)

    const handleCloseAlert = () => {
        setVisible(false)
    }

    if (!visible) {
        return null
    }

    return (
        <>
            <AlertErrorWrapper>
                <AlertErrorDiv>
                    <AlertErrorSvg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                    </AlertErrorSvg>
                </AlertErrorDiv>

                <AlertErrorSecondDiv>
                    <AlertErrorSecondDiv2>
                        <AlertErrorSpan>Error</AlertErrorSpan>
                        <AlertErrorP>Error has occurred! Please try again</AlertErrorP>
                    </AlertErrorSecondDiv2>
                </AlertErrorSecondDiv>
                <AlertErrorSecondDiv3>
                    <AlertErrorSecondBtn onClick={handleCloseAlert}>
                    <Icon icon="bytesize:close" className="text-xl mr-3" />
                    </AlertErrorSecondBtn>
                </AlertErrorSecondDiv3>
            </AlertErrorWrapper>
        </>
    )
}
