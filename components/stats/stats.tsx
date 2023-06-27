import { useState } from 'react'
import {
    RankingCollectionWrapper,
    TitleCollectionDiv,
    TitleCollectionDiv2,
    TitleCollectionH2,
    RankingFollowSvg,
} from './styled/stats.styled'

const Stats = () => {
    const [isFollow, setIsFollow] = useState(false)

    const followHandler = () => {
        setIsFollow((prevState) => !prevState)
    }

    return (
        <>
            <TitleCollectionDiv>
                <TitleCollectionDiv2>
                    <TitleCollectionH2>Collection stats</TitleCollectionH2>
                </TitleCollectionDiv2>
            </TitleCollectionDiv>
            <RankingCollectionWrapper>
                <div className="w-full overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xl font-semibold uppercase">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left pl-8 text-3xl">
                                        Collection
                                    </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left pl-8 text-3xl">
                                        Volume
                                    </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left text-3xl">
                                        Floor Price
                                    </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center text-3xl">Follow</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            <tr className="h-24">
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                            <img
                                                className="rounded-full"
                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                                                width="40"
                                                height="40"
                                                alt="Alex Shatov"
                                            />
                                        </div>
                                        <div className="font-medium text-2xl">Alex Shatov</div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-center font-normal pl-5 w-16 text-2xl">
                                            10.3
                                        </div>
                                        <div className="text-left font-normal pl-5 w-16 text-2xl">
                                            MATIC
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-center font-normal pl-5 w-1/4 text-2xl">
                                            150
                                        </div>
                                        <div className="text-left font-normal pl-5 w-1/4 text-2xl">
                                            MATIC
                                        </div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex justify-center text-lg text-center">
                                        <RankingFollowSvg
                                            viewBox="0 0 28 28"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="34"
                                            height="34"
                                            cursor="pointer"
                                            onClick={followHandler}
                                        >
                                            <path
                                                fill={isFollow ? 'red' : 'none'}
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                d="M12 8C12 8 12 8 12.7578 7C13.6343 5.84335 14.9398 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.4251 20.7209 11.285 20.2422 12C19.435 13.206 12 21 12 21M12 8C12 8 12 8 11.2422 7C10.3657 5.84335 9.06021 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 10.4251 3.27914 11.285 3.75777 12C4.56504 13.206 12 21 12 21"
                                            >
                                                <animate
                                                    fill="freeze"
                                                    attributeName="strokeDashoffset"
                                                    dur="0.5s"
                                                    values="30;0"
                                                />
                                            </path>
                                        </RankingFollowSvg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="h-24">
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                            <img
                                                className="rounded-full"
                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-07.jpg"
                                                width="40"
                                                height="40"
                                                alt="Mirko Fisuk"
                                            />
                                        </div>
                                        <div className="font-medium text-2xl">Philip Harbach</div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-center font-normal pl-5 w-16 text-2xl">
                                            6.6
                                        </div>
                                        <div className="text-left font-normal pl-5 w-16 text-2xl">
                                            MATIC
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-center font-normal pl-5 w-1/4 text-2xl">
                                            230.3
                                        </div>
                                        <div className="text-left font-normal pl-5 w-1/4 text-2xl">
                                            MATIC
                                        </div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-lg text-center">
                                        <div className="flex justify-center text-lg text-center">
                                            <RankingFollowSvg
                                                viewBox="0 0 28 28"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="34"
                                                height="34"
                                                cursor="pointer"
                                                onClick={followHandler}
                                            >
                                                <path
                                                    fill={isFollow ? 'red' : 'none'}
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    d="M12 8C12 8 12 8 12.7578 7C13.6343 5.84335 14.9398 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.4251 20.7209 11.285 20.2422 12C19.435 13.206 12 21 12 21M12 8C12 8 12 8 11.2422 7C10.3657 5.84335 9.06021 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 10.4251 3.27914 11.285 3.75777 12C4.56504 13.206 12 21 12 21"
                                                >
                                                    <animate
                                                        fill="freeze"
                                                        attributeName="strokeDashoffset"
                                                        dur="0.5s"
                                                        values="30;0"
                                                    />
                                                </path>
                                            </RankingFollowSvg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="h-24">
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                            <img
                                                className="rounded-full"
                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-08.jpg"
                                                width="40"
                                                height="40"
                                                alt="Olga Semklo"
                                            />
                                        </div>
                                        <div className="font-medium text-2xl">Mirko Fisuk</div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-center font-normal pl-5 w-16 text-2xl">
                                            12.2
                                        </div>
                                        <div className="text-left font-normal pl-5 w-16 text-2xl">
                                            MATIC
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-center font-normal pl-5 w-1/4 text-2xl">
                                            43.2
                                        </div>
                                        <div className="text-left font-normal pl-5 w-1/4 text-2xl">
                                            MATIC
                                        </div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-lg text-center">
                                        <div className="flex justify-center text-lg text-center">
                                            <RankingFollowSvg
                                                viewBox="0 0 28 28"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="34"
                                                height="34"
                                                cursor="pointer"
                                            >
                                                <path
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    d="M12 8C12 8 12 8 12.7578 7C13.6343 5.84335 14.9398 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.4251 20.7209 11.285 20.2422 12C19.435 13.206 12 21 12 21M12 8C12 8 12 8 11.2422 7C10.3657 5.84335 9.06021 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 10.4251 3.27914 11.285 3.75777 12C4.56504 13.206 12 21 12 21"
                                                >
                                                    <animate
                                                        fill="freeze"
                                                        attributeName="strokeDashoffset"
                                                        dur="0.5s"
                                                        values="30;0"
                                                    />
                                                </path>
                                            </RankingFollowSvg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="h-24">
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                            <img
                                                className="rounded-full"
                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-08.jpg"
                                                width="40"
                                                height="40"
                                                alt="Olga Semklo"
                                            />
                                        </div>
                                        <div className="font-medium text-2xl">Olga Semklo</div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-center font-normal pl-5 w-16 text-2xl">
                                            3.9
                                        </div>
                                        <div className="text-left font-normal pl-5 w-16 text-2xl">
                                            MATIC
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-center font-normal pl-5 w-1/4 text-2xl">
                                            10.4
                                        </div>
                                        <div className="text-left font-normal pl-5 w-1/4 text-2xl">
                                            MATIC
                                        </div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-lg text-center">
                                        <div className="flex justify-center text-lg text-center">
                                            <RankingFollowSvg
                                                viewBox="0 0 28 28"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="34"
                                                height="34"
                                                cursor="pointer"
                                            >
                                                <path
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    d="M12 8C12 8 12 8 12.7578 7C13.6343 5.84335 14.9398 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.4251 20.7209 11.285 20.2422 12C19.435 13.206 12 21 12 21M12 8C12 8 12 8 11.2422 7C10.3657 5.84335 9.06021 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 10.4251 3.27914 11.285 3.75777 12C4.56504 13.206 12 21 12 21"
                                                >
                                                    <animate
                                                        fill="freeze"
                                                        attributeName="strokeDashoffset"
                                                        dur="0.5s"
                                                        values="30;0"
                                                    />
                                                </path>
                                            </RankingFollowSvg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="h-24">
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                            <img
                                                className="rounded-full"
                                                src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg"
                                                width="40"
                                                height="40"
                                                alt="Burak Long"
                                            />
                                        </div>
                                        <div className="font-medium text-2xl">Burak Long</div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-center font-normal pl-5 w-16 text-2xl">
                                            7
                                        </div>
                                        <div className="text-left font-normal pl-5 w-16 text-2xl">
                                            MATIC
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-center font-normal pl-5 w-1/4 text-2xl">
                                            510
                                        </div>
                                        <div className="text-left font-normal pl-5 w-1/4 text-2xl">
                                            MATIC
                                        </div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-lg text-center">
                                        <div className="flex justify-center text-lg text-center">
                                            <RankingFollowSvg
                                                viewBox="0 0 28 28"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="34"
                                                height="34"
                                                cursor="pointer"
                                            >
                                                <path
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    d="M12 8C12 8 12 8 12.7578 7C13.6343 5.84335 14.9398 5 16.5 5C18.9853 5 21 7.01472 21 9.5C21 10.4251 20.7209 11.285 20.2422 12C19.435 13.206 12 21 12 21M12 8C12 8 12 8 11.2422 7C10.3657 5.84335 9.06021 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 10.4251 3.27914 11.285 3.75777 12C4.56504 13.206 12 21 12 21"
                                                >
                                                    <animate
                                                        fill="freeze"
                                                        attributeName="strokeDashoffset"
                                                        dur="0.5s"
                                                        values="30;0"
                                                    />
                                                </path>
                                            </RankingFollowSvg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </RankingCollectionWrapper>
        </>
    )
}

export default Stats
