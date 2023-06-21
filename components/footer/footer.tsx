import { Icon } from '@iconify/react'
import Link from 'next/link'
import tw from 'tailwind-styled-components'

const Logo = tw.svg`
  w-10 h-10 text-white p-2 bg-red-500 rounded-full mr-4
`

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 mt-20">
            <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-10 h-10 text-white p-2 bg-red-500 rounded-full"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl dark:text-white">ROOFTOP</span>
                </a>
                <p className="text-md text-gray-500 sm:ml-6 sm:mt-0 mt-4">
                    © 2023 KGA - Blockchain 8
                </p>
                <div className="grid grid-cols-3 divide-x divide-slate-500 sm:ml-auto sm:mt-0 mt-4">
                    <Link
                        href="https://github.com/ambious12"
                        className="text-gray-400 flex items-center pl-5"
                    >
                        <Icon icon="bi:github" />
                        <span className="text-gray-500 ml-1 text-sm">Kim Hong Tae</span>
                    </Link>
                    <Link
                        href="https://github.com/nazzzo"
                        className="text-gray-400 flex items-center pl-3 pr-1"
                    >
                        <Icon icon="bi:github" />
                        <span className="text-gray-500 ml-1 text-sm">Kim Joo Hyung</span>
                    </Link>
                    <Link
                        href="https://github.com/parkjonghwan22"
                        className="text-gray-400 flex items-center pl-4"
                    >
                        <Icon icon="bi:github" />
                        <span className="text-gray-500 ml-1 text-sm">Park Jong Hwan</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
