import { Icon } from '@iconify/react'
import { useState } from 'react'
import { Transition } from '@headlessui/react'

interface TabItem {
    title: string;
    category: string;
    question: string;
    answer: string;
}

interface TabContentProps {
    header: string;
    items: TabItem[];
    isTabOpen: boolean;
    toggleTab: () => void;
}


const partA = {
    header: 'RoofTop 이용방법',
    items: [
        {
            title: "이용성",
            category: "NFT",
            question: "대체 불가능 토큰(NFT)이 무엇인가요?",
            answer: "대체 불가능 토큰(NFT)은 블록체인 관리 소유권을 갖춘 고유한 디지털 아이템입니다. NFT의 종류는 다양합니다."
        },
        {
            title: "접근성",
            category: "관심목록",
            question: "관심 목록에 Collection을 추가하고 싶어요",
            answer: "해당 Collection 페이지에 들어가서 관심 추가버튼을 누르면 My Profile에서 확인 할 수 있습니다."
        },
        {
            title: "사용성",
            category: "대량구매",
            question: "대량구매를 하고싶어요",
            answer: "해당 Collection에 들어가서 , 가격을 설정하시고 Sweap 기능을 이용하여 장바구니에 담아서 한번에 구매를 해보세요!"
        },
        {
            title: "접근성",
            category: "지갑연결",
            question: "지갑연결은 어떻게하나요?",
            answer: "우측 상단에 Connect 버튼을 눌러서 MetaMask와 연결해보세요! Roof-Top은 Mumbai NetWork 환경에서 사용이 가능합니다."
        },
    ]
};

const partB = {
    header: '유효성 검사에 관한 질문',
    items: [
        {
            title: "신뢰성",
            category: "컨트랙트",
            question: "컨트랙트는 표준을 준수했나요?",
            answer: "스마트 컨트랙트는 ERC-721 표준을 준수했어요."
        },
        {
            title: "신뢰성",
            category: "컨트랙트",
            question: "Etherscan에 소스코드가 등록되어 있나요?",
            answer: "스마트 컨트랙트의 소스코드가 Etherscan에 공개되어 있어요."
        },
        {
            title: "접근성",
            category: "컨트랙트",
            question: "Token URI 접근이 가능한가요?",
            answer: "스마트 컨트랙트의 컨트랙트 주소와 토큰 ID를 통해 Token URI 정보를 확인할 수 있어요."
        },
        {
            title: "접근성",
            category: "메타데이터",
            question: "기준시간 안에 메타데이터를 가져올 수 있나요?",
            answer: "Token URI 정보를 통해 메타데이터를 가져올 수 있어요."
        },
        {
            title: "영속성",
            category: "메타데이터",
            question: "메타데이터 저장소가 분산되어 있나요?",
            answer: "메타데이터는 탈중앙화된 서버에 저장되어 있어요 (Decentralized)."
        }
    ]
};

const partC = {
    header: 'NFT',
    items: [
        {
            title: "접근성",
            category: "컬렉션",
            question: "컬렉션은 어떻게 만드나요?",
            answer: "지갑을 연결하신 뒤에 우측상단에 탭을 누른 후 My Collection에서 만들 수 있습니다.",
        },
        {
            title: "보장성",
            category: "컬렉션",
            question: "크리에이터에 대한 수수료는 어떻게 되나요?",
            answer: "Roof-Top에서는 크리에이터에 대한 수수료를 0%, 2.5%, 5%로 각각 설정할 수 있습니다.",
        },
        {
            title: "기능성",
            category: "NFT",
            question: "저의 NFT는 어디에 저장되나요?",
            answer: "NFT는 탈중앙화된 서버에 저장되어 있습니다.",
        },
        {
            title: "기능성",
            category: "NFT",
            question: "NFT를 판매하고 싶어요.",
            answer: "자신이 소유한 NFT를 판매하고 싶으시면 My Collection에서 자유롭게 경매 등록이 가능합니다.",
        },
    ],
};

const partD = {
    header: 'AirDrop',
    items: [
        {
            title: "접근성",
            category: "AirDrop",
            question: "AirDrop이 무엇인가요?",
            answer: "AirDrop을 통해 다른 사람에게 나의 NFT를 보낼 수 있습니다.",
        },
        {
            title: "접근성",
            category: "AirDrop",
            question: "AirDrop을 받고 싶어요!",
            answer: "AirDrop에 참여하고 싶다면 메뉴 상단에 AirDrop에 들어가서 신청할 수 있습니다.",
        },
        {
            title: "접근성",
            category: "AirDrop",
            question: "NFT를 받기 위한 조건",
            answer: "참가자 10명에게 AirDrop이 지급되며, 참가자가 10명 이상일 경우 거래량이 많은 분들 한해서 지급됩니다.",
        },
    ],
};




const TabContent = ({ header, items, isTabOpen, toggleTab }: TabContentProps) => {

    return (
        <div className="transition w-full border rounded-lg shadow-sm mb-10">
            <div
                className="w-full cursor-pointer transition flex space-x-5 px-5 items-center h-16 border border-indigo-200 rounded-lg dark:text-gray-500 dark:bg-gray-800"
                onClick={toggleTab}
            >
                <Icon icon="icons8:checked" className="text-2xl text-indigo-500" />
                <h3 className="font-semibold text-gray-600 dark:text-white">{header}</h3>
            </div>
            <Transition.Root className="w-full my-16 space-y-4" show={isTabOpen}>
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
                            className={`grid gap-4 px-5 overflow-y-auto ${isTabOpen ? 'max-h-96' : 'max-h-0'
                                }`}
                            style={{
                                ...styles,
                                transitionProperty: 'opacity, transform',
                            }}
                        >
                            <ul className="w-full grid grid-cols-2 gap-4 dark:text-gray-500">
                                {items.map((item) => (
                                    <li
                                        key={item.title}
                                        className="flex flex-col flex-nowrap border rounded-lg bg-slate-50 p-4 flex-shrink-0 mb-3 dark:bg-gray-700"
                                    >
                                        <div className="flex items-center justify-center">
                                            <span className="font-semibold text-md dark:text-white">{item.title}</span>
                                            <span className="font-thin mr-2 ml-2 dark:text-white">|</span>
                                            <span className="text-xs text-gray-500 dark:text-white">{item.category}</span>
                                        </div>
                                        <div className="flex items-center mt-4">
                                            <Icon
                                                icon="octicon:question-24"
                                                className="mr-2 text-xl dark:text-white"
                                            />
                                            <span className="text-sm dark:text-white">{item.question}</span>
                                        </div>
                                        <div className="h-1 w-full mx-auto border-b my-5"></div>
                                        <div className="">
                                            <span className="mt-2 text-lg overflow-hidden whitespace-wrap dark:text-white">
                                                {item.answer}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Transition.Child>
            </Transition.Root>
        </div>
    );
};

export const HelpDesk = () => {
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const toggleTab = (tab: string) => {
        setActiveTab(activeTab === tab ? null : tab);
    };

    return (
        <>
            <div className="h-screen bg-purple-50 dark:bg-gray-700 grid place-items-center">
                <div className="w-3/4 h-screen mx-auto">
                    <div className="bg-white dark:bg-gray-600 h-screen p-10 shadow-sm rounded-lg overflow-y-auto">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                            안녕하세요! 저희 ROOFTOP에 오신 것을 진심으로 환영합니다.
                        </h3>
                        <p className="text-sm font-semibold text-gray-500 my-3 dark:text-gray-200">
                            자주묻는 질문들을 정리해 두었습니다.
                        </p>

                        <div className="h-1 w-full mx-auto border-b my-5"></div>

                        <TabContent
                            header={partA.header}
                            items={partA.items}
                            isTabOpen={activeTab === partA.header}
                            toggleTab={() => toggleTab(partA.header)}
                        />

                        <TabContent
                            header={partB.header}
                            items={partB.items}
                            isTabOpen={activeTab === partB.header}
                            toggleTab={() => toggleTab(partB.header)}
                        />

                        <TabContent
                            header={partC.header}
                            items={partC.items}
                            isTabOpen={activeTab === partC.header}
                            toggleTab={() => toggleTab(partC.header)}
                        />

                        <TabContent
                            header={partD.header}
                            items={partD.items}
                            isTabOpen={activeTab === partD.header}
                            toggleTab={() => toggleTab(partD.header)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
