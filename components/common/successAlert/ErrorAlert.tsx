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
    AlertErrorCloseSvg,
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
                        <AlertErrorP>Your NFT image capacity is too large</AlertErrorP>
                    </AlertErrorSecondDiv2>
                </AlertErrorSecondDiv>
                <AlertErrorSecondDiv3>
                    <AlertErrorSecondBtn onClick={handleCloseAlert}>
                        <AlertErrorCloseSvg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <g
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-width="1"
                            >
                                <path
                                    strokeDasharray="60"
                                    strokeDashoffset="60"
                                    d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
                                >
                                    <animate
                                        fill="freeze"
                                        attributeName="strokeDashoffset"
                                        dur="0.5s"
                                        values="60;0"
                                    />
                                </path>
                                <path
                                    strokeDasharray="8"
                                    strokeDashoffset="8"
                                    d="M12 12L16 16M12 12L8 8M12 12L8 16M12 12L16 8"
                                >
                                    <animate
                                        fill="freeze"
                                        attributeName="strokeDashoffset"
                                        begin="0.6s"
                                        dur="0.2s"
                                        values="8;0"
                                    />
                                </path>
                            </g>
                        </AlertErrorCloseSvg>
                    </AlertErrorSecondBtn>
                </AlertErrorSecondDiv3>
            </AlertErrorWrapper>
        </>
    )
}
