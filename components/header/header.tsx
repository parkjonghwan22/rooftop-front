import { TitleContainer, Button, HeaderLink } from './styled/Header.styled'
import { Icon } from '@iconify/react'
import { Modal } from '@components/common/modal/Modal'
import { useEffect, useState } from 'react'
import ConnectWallet from '@components/sign/connect'
import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { DropDownBtn } from '@components/dropdown/dropdown'
import { LoadingSpinner } from '@components/common/loading'
import { UserType } from '@utils/types/user.interface'
import Link from 'next/link'
import { CartButton } from '@components/common/button'
import { SearchContainer, SearchBox } from '@components/common/search/search'
import { useSign } from '@utils/hooks/useSign'
import { useScroll } from '@utils/hooks/useScroll'
import { Banner } from '@components/common/banner/banner'

const Header = () => {
    const { user, isLoading, isConnected } = useSign()
    const { isScrolling } = useScroll()
    const { disconnect } = useDisconnect()
    const { chain } = useNetwork()
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <>
            <header>
            <div className={`border-gray-200 px-4 lg:px-6 py-2.5 opacity-90 fixed top-0 left-0 right-0 z-10 ${!isScrolling ? 'bg-transparent' : 'bg-white dark:bg-gray-800'}`}>
                    <div className="flex flex-wrap justify-around items-center mx-auto max-w-screen-xl">
                        <div className="flex items-center">
                            <Link href="/">
                                <TitleContainer />
                            </Link>
                            <Link href="/rankings">
                                <HeaderLink>Collections</HeaderLink>
                            </Link>
                            <Link href="/drops">
                                <HeaderLink>Airdrop</HeaderLink>
                            </Link>
                        </div>
                        <SearchContainer>
                            <SearchBox />
                        </SearchContainer>
                        <div className="flex items-center">
                            {!isConnected && (
                                <Button
                                    color="white"
                                    backgroundColor="red"
                                    fontSize="md"
                                    onClick={() => {
                                        setIsOpenModal(true)
                                    }}
                                >
                                    <Icon icon="akar-icons:link-chain" className="w-4 h-4 mr-1" />
                                    Connect
                                </Button>
                            )}
                            {isConnected &&
                                (isLoading ? <LoadingSpinner /> : <DropDownBtn user={user} />)}
                            {isConnected && <CartButton />}
                        </div>
                    </div>
                </div>
            </header>
            {!isConnected && (
                <Modal
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    width="20rem"
                    height="1.5rem"
                >
                    <ConnectWallet />
                </Modal>
            )}
            {isConnected && chain && chain.id !== 80001 && (
                <Banner color="red">To use Rooftop, please switch to Mumbai network</Banner>
            )}
        </>
    )
}
export default Header
