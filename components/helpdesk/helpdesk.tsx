import { Icon } from '@iconify/react'
import { useState } from 'react'
import { Transition } from '@headlessui/react'

export const HelpDesk = () => {
    const [isTabOpen, setIsTabOpen] = useState(false)
    const [isNftTabOpen, setIsNftTabOpen] = useState(false)
    const [isAirDrop, setIsAirDrop] = useState(false)
    const [isRoofTop , setIsRoofTop] = useState(false)
    const toggleTab = (tabName: string) => {
        if (tabName === 'validityTab') {
            setIsTabOpen(!isTabOpen)
        }
        if (tabName === 'nftTab') {
            setIsNftTabOpen(!isNftTabOpen)
        }
        if (tabName === 'airDropTab') {
            setIsAirDrop(!isAirDrop)
        }
        if (tabName === 'roofTopTab') {
            setIsRoofTop(!isRoofTop)
        }
    }

    return (
        <>
            <div className="h-screen bg-purple-50 dark:bg-gray-700 grid place-items-center">
                <div className="w-3/4 h-screen mx-auto border">
                    <div className="bg-white dark:bg-gray-600 h-screen p-10 shadow-sm rounded-lg overflow-y-auto">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                            안녕하세요! 저희 ROOFTOP에 오신 것을 진심으로 환영합니다.
                        </h3>
                        <p className="text-sm font-semibold text-gray-500 my-3 dark:text-gray-200">
                            자주묻는 질문들을 정리해 두었습니다.
                        </p>

                        <div className="h-1 w-full mx-auto border-b my-5"></div>

                         {/* RoofTop 관련 */}
                         <div className="transition w-full border rounded-lg shadow-sm">
                            <div
                                className="w-full cursor-pointer transition flex space-x-5 px-5 items-center h-16 border border-indigo-200 rounded-lg
                            dark:text-gray-500 dark:bg-gray-800"
                                onClick={() => toggleTab('roofTopTab')}
                            >
                                <Icon icon="icons8:checked" className="text-2xl text-indigo-500" />
                                <h3 className="font-semibold text-gray-600 dark:text-white">
                                    RoofTop 이용방법
                                </h3>
                            </div>
                            <Transition.Root className="w-full my-16 space-y-4" show={isRoofTop}>
                                <Transition.Child
                                    enter="transition-all ease-in-out duration-500 delay-[200ms]"
                                    enterFrom="opacity-0 translate-y-[-10px]"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition-all ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0 translate-y-[-10px]"
                                >
                                    {(styles) => (
                                        <div
                                            className={`grid gap-4 px-5 overflow-y-auto ${
                                                isRoofTop ? 'max-h-96' : 'max-h-0'
                                            }`}
                                            style={{
                                                ...styles,
                                                transitionProperty: 'opacity, transform',
                                            }}
                                        >
                                            <ul className="w-full grid grid-cols-2 gap-4 dark:text-gray-500">
                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            이용성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            NFT
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            대체 불가능 토큰(NFT)가 무엇인가요?
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                        대체 불가능 토큰(NFT)은 블록체인 관리 소유권을 갖춘 고유한 디지털 아이템입니다. NFT의 종류는 다양합니다.
                                                        </span>
                                                    </div>
                                                </li>

                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            접근성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            관심목록
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            관심 목록에 Collection을 추가하고 싶어요
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                            해당 Collection 페이지에 들어가서 관심 추가버튼을 누르면
                                                            My Profile에서 확인 할 수 있습니다.
                                                        </span>
                                                    </div>
                                                </li>

                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            사용성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            대량구매
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            대량구매를 하고싶어요
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                            해당 Collection에 들어가서 , 가격을 설정하시고 Sweap 기능을 이용하여
                                                            장바구니에 담아서 한번에 구매를 해보세요!
                                                        </span>
                                                    </div>
                                                </li>
                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            접근성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            지갑연결
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            지갑연결은 어떻게하나요?
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                            우측 상단에 Connect 버튼을 눌러서 MetaMask와 연결해보세요!
                                                            Roof-Top은 Mumbai NetWork 환경에서 사용이 가능합니다.
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </Transition.Child>
                            </Transition.Root>
                        </div>
                        {/* RoofTop 관련 */}

                        {/* 유효성 검사 */}
                        <div className="transition mt-20 w-full border rounded-lg shadow-sm">
                            <div
                                className="cursor-pointer transition flex space-x-5 px-5 items-center h-16 border border-indigo-200 rounded-lg
                                dark:text-gray-500 dark:bg-gray-800"
                                onClick={() => toggleTab('validityTab')}
                            >
                                <Icon icon="icons8:checked" className="text-2xl text-indigo-500" />
                                <h3 className="font-semibold text-gray-600 dark:text-white">
                                    유효성 검사에 관한 질문
                                </h3>
                            </div>
                            <Transition.Root className="w-full my-16 space-y-4" show={isTabOpen}>
                                <Transition.Child
                                    enter="transition-all ease-in-out duration-500 delay-[200ms]"
                                    enterFrom="opacity-0 translate-y-[-10px]"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-out duration-100"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    {(styles) => (
                                        <div
                                            className={`grid gap-4 px-5 pt-0 overflow-y-auto ${
                                                isTabOpen ? 'max-h-96' : 'max-h-0'
                                            }`}
                                            style={{
                                                ...styles,
                                                transitionProperty: 'opacity, transform',
                                            }}
                                        >
                                            <ul className="w-full grid grid-cols-2 gap-4 dark:text-gray-500">
                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            신뢰성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            컨트랙트
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            컨트랙트는 표준을 준수했나요?
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                            스마트 컨트랙트는 ERC-721 표준을
                                                            준수했어요
                                                        </span>
                                                    </div>
                                                </li>

                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            신뢰성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            컨트랙트
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            Etherscan에 소스코드가 등록되어 있나요?
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                            스마트 컨트랙트의 소스코드가 Etherscan에
                                                            공개되어 있어요
                                                        </span>
                                                    </div>
                                                </li>

                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            접근성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            컨트랙트
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            Token URI 접근이 가능한가요?
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                            스마트 컨트랙트의 컨트랙트 주소와 토큰
                                                            ID를 통해 Token URI 정보를 확인할 수
                                                            있어요
                                                        </span>
                                                    </div>
                                                </li>

                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            접근성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            메타데이터
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4 ">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            기준시간 안에 메타데이터를 가져올 수
                                                            있나요?
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                            Token URI 정보를 통해 메타데이터를
                                                            가져올 수 있어요
                                                        </span>
                                                    </div>
                                                </li>

                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            영속성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            메타데이터
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            메타데이터 저장소가 분산되어 있나요?
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                            메타데이터는 탈중앙화된 서버에 저장되어
                                                            있어요 (Decentralized)
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </Transition.Child>
                            </Transition.Root>
                        </div>
                        {/* 유효성 검사 */}

                        {/* NFT 관련 */}
                        <div className="transition w-full mt-20 border rounded-lg shadow-sm">
                            <div
                                className="w-full cursor-pointer transition flex space-x-5 px-5 items-center h-16 border border-indigo-200 rounded-lg
                                dark:text-gray-500 dark:bg-gray-800"
                                onClick={() => toggleTab('nftTab')}
                            >
                                <Icon icon="icons8:checked" className="text-2xl text-indigo-500" />
                                <h3 className="font-semibold text-gray-600 dark:text-white">
                                    NFT
                                </h3>
                            </div>
                            <Transition.Root className="w-full my-16 space-y-4" show={isNftTabOpen}>
                                <Transition.Child
                                    enter="transition-all ease-in-out duration-500 delay-[200ms]"
                                    enterFrom="opacity-0 translate-y-[-10px]"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition-all ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0 translate-y-[-10px]"
                                >
                                    {(styles) => (
                                        <div
                                            className={`grid gap-4 px-5 overflow-y-auto ${
                                                isNftTabOpen ? 'max-h-96' : 'max-h-0'
                                            }`}
                                            style={{
                                                ...styles,
                                                transitionProperty: 'opacity, transform',
                                            }}
                                        >
                                            <ul className="w-full grid grid-cols-2 gap-4 dark:text-gray-500">
                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            접근성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            컬렉션
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            컬렉션은 어떻게 만드나요?
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                            지갑을 연결하신 뒤에 우측상단에 탭을
                                                            누른 후 My Collection에서 만들수
                                                            있습니다
                                                        </span>
                                                    </div>
                                                </li>

                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            보장성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            컬렉션
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            크리에이터에 대한 수수료는 어떻게되나요?
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                            Roof-Top에서는 크리에이터에 대한
                                                            수수료를 0% 2.5% 5%로 각각 설정할수
                                                            있습니다.
                                                        </span>
                                                    </div>
                                                </li>

                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            기능성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            NFT
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            저의 NFT는 어디에 저장되나요?
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                            NFT는 탈중앙화된 서버에 저장되어
                                                            있습니다.
                                                        </span>
                                                    </div>
                                                </li>

                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            기능성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            NFT
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            NFT를 판매 하고 싶어요
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                            자신이 소유한 NFT를 판매하고 싶으시면 My
                                                            Collection에서 자유롭게 경매등록이
                                                            가능합니다.
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </Transition.Child>
                            </Transition.Root>
                        </div>
                        {/* NFT 관련 */}

                        {/* AirDrop 관련 */}
                        <div className="transition w-full mt-20 border rounded-lg shadow-sm">
                            <div
                                className="w-full cursor-pointer transition flex space-x-5 px-5 items-center h-16 border border-indigo-200 rounded-lg
                                dark:text-gray-500 dark:bg-gray-800"
                                onClick={() => toggleTab('airDropTab')}
                            >
                                <Icon icon="icons8:checked" className="text-2xl text-indigo-500" />
                                <h3 className="font-semibold text-gray-600 dark:text-white">
                                    AirDrop
                                </h3>
                            </div>
                            <Transition.Root className="w-full my-16 space-y-4" show={isAirDrop}>
                                <Transition.Child
                                    enter="transition-all ease-in-out duration-500 delay-[200ms]"
                                    enterFrom="opacity-0 translate-y-[-10px]"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition-all ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0 translate-y-[-10px]"
                                >
                                    {(styles) => (
                                        <div
                                            className={`grid gap-4 px-5 overflow-y-auto ${
                                                isAirDrop ? 'max-h-96' : 'max-h-0'
                                            }`}
                                            style={{
                                                ...styles,
                                                transitionProperty: 'opacity, transform',
                                            }}
                                        >
                                            <ul className="w-full grid grid-cols-2 gap-4 dark:text-gray-500">
                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            접근성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            AirDrop
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            AirDrop이 무엇인가요?
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                            AirDrop을 통해 다른사람에게 나의 NFT를 보낼수있습니다.
                                                        </span>
                                                    </div>
                                                </li>

                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            접근성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            AirDrop
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            AirDrop을 받고싶어요!
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                            AirDrop에 참여하고싶다면 메뉴 상단에 AirDrop에 들어가서
                                                            신청할수있습니다.
                                                        </span>
                                                    </div>
                                                </li>

                                                <li className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-600">
                                                    <div className="flex items-center jusitify-center">
                                                        <span className="font-semibold text-md dark:text-white">
                                                            접근성
                                                        </span>
                                                        <span className="font-thin mr-2 ml-2 dark:text-white">
                                                            |
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-white">
                                                            AirDrop
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mt-4">
                                                        <Icon
                                                            icon="octicon:question-24"
                                                            className="mr-2 text-xl dark:text-white"
                                                        />
                                                        <span className="text-sm dark:text-white">
                                                            NFT를 받기위한 조건
                                                        </span>
                                                    </div>
                                                    <div className="h-1 w-full mx-auto border-b my-5"></div>
                                                    <div className="">
                                                        <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                            참가자 10명에게 AirDrop이 지급되며, 참가자가 10명 이상일 경우
                                                            거래량이 많은분들 한해서 지급됩니다.
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </Transition.Child>
                            </Transition.Root>
                        </div>
                        {/* AirDrop 관련 */}

                    </div>
                </div>
            </div>
        </>
    )
}
