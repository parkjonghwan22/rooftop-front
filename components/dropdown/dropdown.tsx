import { DarkModeToggle } from "@components/common/button";
import { DropDownWrapper, Button, MenuWrapper, TopContainer, NavContainer, NavLink } from "./styled/dropdown.styled";
import { ShowBalance } from "@components/addressInfo";
import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useDisconnect } from "wagmi";
import { useRouter } from "next/router";




export const DropDownBtn = ({ user }: any) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const slicedAddress = `${user?.address.slice(0, 7)}`;


    return (
        <DropDownWrapper>
            <Button onClick={() => setIsOpenMenu(((prevState)=>!prevState))}>
                <img className="w-8 h-8 mr-2 ml-1 rounded-full" src={user.userImg} />
                {slicedAddress}
                <svg className="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Button>
            {isOpenMenu && <DropDownMenu setIsOpenMenu={setIsOpenMenu} />}
        </DropDownWrapper>
    )
};


interface MenuProps {
    setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}


const DropDownMenu = ({ setIsOpenMenu }: MenuProps) => {
    const { disconnect } = useDisconnect();
    const router = useRouter();
    
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        disconnect()
        router.push('/');
    }

    useEffect(() => {
        const handleClose = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as HTMLElement)) {
                setIsOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClose);
        return () => {
            document.removeEventListener("mousedown", handleClose);
        };
    }, [setIsOpenMenu]);

    return (
        <MenuWrapper ref={menuRef}>
            <TopContainer>
                <ShowBalance />
            </TopContainer>
            <NavContainer>
                <NavLink>
                    <Link href="/mypage" className="flex item-center">
                        <Icon icon="iconoir:ethereum-circle" className="text-lg mr-2" />Profile
                    </Link>
                </NavLink>
                <NavLink>
                    <Link href="/mycollection" className="flex item-center">
                        <Icon icon="mdi:collection" className="text-lg mr-2" />My Collections
                    </Link>
                </NavLink>
                <NavLink>
                    <Link href="/helpdesk" className="flex item-center">
                        <Icon icon="streamline:interface-help-customer-support-1-customer-headset-help-microphone-phone-support" className="text-lg mr-2" />Help Desk
                    </Link>
                </NavLink>
                <NavLink>
                    <button className="flex item-center" onClick={handleLogout}>
                        <Icon icon="akar-icons:link-chain" className="text-lg mr-2" />Disconnect
                    </button>
                </NavLink>
            </NavContainer>
            <div className="py-2">
                <NavLink><DarkModeToggle /></NavLink>
            </div>
        </MenuWrapper>
    )
}