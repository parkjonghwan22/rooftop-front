import { ShowAddress, ShowBalance } from '@components/addressInfo'
import { StyledOptions, StyledProps } from '@utils/types/style.interface'
import { Icon } from '@iconify/react'
import tw from 'tailwind-styled-components'

const Logo = tw.svg`
  w-10 h-10 text-white p-2 bg-red-500 rounded-full
`

export const TitleContainer = () => {
    return (
        <div className="flex items-center">
            <Logo
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-8 h-8 text-white p-2 bg-red-500 rounded-full"
                viewBox="0 0 24 24"
            >
                <path d="M19 16h3L12 7L2 16h3l7-6.31L19 16M7 8.81V7H4v4.5l3-2.69Z"></path>
            </Logo>
            <span className="pl-2 self-center hidden lg:block lg:text-xl font-semibold whitespace-nowrap dark:text-white">
                ROOFTOP
            </span>
        </div>
    )
}

export const HeaderLink = tw.div`
    font-semibold text-lg lg:text-xl cursor-pointer ml-3 lg:ml-6
`

const backgroundColors: StyledOptions = {
    red: 'bg-red-500',
    orange: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    gray: 'bg-gray-100',
}

const textSizes: StyledOptions = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
}

const textColors: StyledOptions = {
    white: 'text-white',
    black: 'text-black',
    gray: 'text-gray-900',
}

interface ButtonProps extends StyledProps {
    onClick: () => void
}



export const Button = ({ onClick, backgroundColor, color, fontSize, children }: ButtonProps) => {
    const buttonStyled: string = `inline-flex items-center order-0 py-1.5 px-3 mr-3 focus:outline-none hover:bg-gray-400 rounded text-base mt-4 md:mt-0 transition duration-300 ease-in-out`

    let bgColor = backgroundColors[backgroundColor ? backgroundColor : 'gray']
    let txtSize = textSizes[fontSize ? fontSize : 'sm']
    let txtColor = textColors[color ? color : 'black']

    return (
        <button onClick={onClick} className={`${bgColor} ${txtSize} ${txtColor} ${buttonStyled}`}>
            {children}
        </button>
    )
}

export const HeaderUserInfo = () => {
    const HeaderUserInfoStyled = tw.div`
    text-sm flex items-center md:space-x-3 py-2 px-3 mr-5 rounded-full text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-300 hover:dark:bg-gray-500 cursor-pointer
  `

    return (
        <HeaderUserInfoStyled>
            <ShowAddress />
            <ShowBalance />
        </HeaderUserInfoStyled>
    )
}
