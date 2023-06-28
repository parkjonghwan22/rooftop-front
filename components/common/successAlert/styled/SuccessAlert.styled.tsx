import tw from 'tailwind-styled-components'

export const AlertSuccessWrapper = tw.div`
flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-500 animate-slideRight
`

export const AlertSuccessFirstDiv = tw.div`
flex items-center justify-center w-12 bg-emerald-500 rounded-lg
`
export const AlertSuccessSvg = tw.svg`
w-6 h-6 text-white fill-current
`
export const AlertSecondDiv = tw.div`
    px-4 py-2 -mx-3
`

export const AlertSecondDiv2 = tw.div`
    mx-5
`

export const AlertSecondDiv3 = tw.div`
    flex ml-8 
`

export const AlertSecondBtn = tw.button`
    px-2 py-2 -mx-3 ml-8 cursor-pointer flex items-center justify-center
`

export const AlertSecondSpan = tw.span`
    font-semibold text-emerald-500 dark:text-emerald-400
`

export const AlertSecondP = tw.p`
    text-sm text-gray-600 dark:text-gray-200
`
