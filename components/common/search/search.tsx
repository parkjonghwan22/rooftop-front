import { Icon } from '@iconify/react'
import tw from 'tailwind-styled-components'

export const SearchContainer = tw.nav`
   flex flex-wrap items-center text-base justify-center w-0 md:w-450 invisible md:visible
`

export const SearchBox = () => {
    return (
        <>
            <div className="flex justify-center items-center border rounded-xl border-gray-200 dark:border-gray-600 overflow-hidden dark:bg-gray-700">
                <div className="xl:w-96">
                    <div className="input-group relative flex items-stretch w-full">
                        <input
                            type="search"
                            className="form-control relative flex-auto min-w-0 block w-full px-3 py-2 text-sm bg-transparent dark:placeholder-gray-400 dark:text-gray-300 transition ease-in-out m-0 focus:text-gray-700  focus:outline-none"
                            placeholder="Search collection"
                        />
                        <button
                            className="px-3.5 py-1 bg-transparent text-gray-600 dark:text-white font-medium text-xs leading-tight uppercase focus:outline-none active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                            type="button"
                        >
                            <Icon icon="iconamoon:search-bold" className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
