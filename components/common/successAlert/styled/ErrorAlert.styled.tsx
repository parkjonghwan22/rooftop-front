import tw from 'tailwind-styled-components'

export const AlertErrorWrapper = tw.div`
    flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-500 animate-slideRight
`

export const AlertErrorDiv = tw.div`
    flex items-center justify-center w-12 bg-red-500 rounded-lg
`

export const AlertErrorSvg = tw.svg`
    w-6 h-6 text-white fill-current
`

export const AlertErrorSecondDiv = tw.div`
    px-4 py-2 -mx-3
`

export const AlertErrorSecondDiv2 = tw.div`
    mx-5
`

export const AlertErrorSecondDiv3 = tw.div`
    flex ml-8
`

export const AlertErrorSecondBtn = tw.button`
px-2 py-2 -mx-1 cursor-pointer flex items-center justify-center
`

export const AlertErrorSpan = tw.span`
    font-semibold text-red-500 dark:text-red-400
`

export const AlertErrorP = tw.p`
    text-sm text-gray-600 dark:text-gray-200
`
