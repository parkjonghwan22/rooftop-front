import Image from 'next/image'
import { UserType } from "@utils/types/user.interface"
import { ProfileCardWrap, UserAddress } from "./styled/Profile.styled"
import { Icon } from '@iconify/react';
import { Button } from "@components/common/button";
import { useState } from "react";
import { useInput } from "@utils/hooks/useInput";
import { InputBox } from "@components/common/input";
import { FileInputCircle } from "@components/common/input/fileinputcircle";
import request from "@utils/request";
import { Alert } from "@components/common/alert";



export const ProfileCard = ({ user }: { user: UserType | null }) => {
    const [isOpenAlert, setIsOpenAlert] = useState(false)
    const [modify, setModify] = useState(false)
    const [userImg, setUserImg] = useState<string>("")
    const username = useInput(user?.name);
    const slicedAddress = user!.address.slice(0, 6) + "..." + user!.address.slice(-4);

    const handleUpdate = async () => {
        setModify(prevState => !prevState);

        if (modify) {
            const res = await request.put('auth/update', {
                address: user!.address,
                name: username.value,
                userImg: userImg
            })
            if (res.status === 200) {
                window.location.reload();
            }
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(user!.address);
        setIsOpenAlert(true)
    }


    if (!user) return <></>
    return (
        <>
            <ProfileCardWrap>
                <div className="absolute top-5 right-5 w-28">
                    <Button {...(!modify) ? { color: "blue" } : { color: "green" }} fontSize="sm" onClick={handleUpdate}>
                        <Icon icon="bxs:edit" className="mr-1 text-lg" />{(!modify) ? "Edit" : "Confirm"}
                    </Button>     
                </div>      
                <div className="flex justify-center">
                    <div className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110">
                        {(!modify)
                        ? <Image src={user.userImg} alt="user" width={200} height={200} className="w-full h-full rounded-full" />
                        : <FileInputCircle state={userImg} setState={setUserImg} />}
                    </div>
                </div>
                <div className="mt-16">
                    {(!modify)
                        ? <h1 className="font-bold text-center text-3xl">{user.name}</h1>
                        : <div className="flex items-center justify-center">
                            <InputBox value={username.value} onChange={username.onChange} fontSize="xl" />
                        </div>}

                    <div className="my-5 px-6">
                        <UserAddress onClick={handleCopy}>{slicedAddress}<Icon icon="bxs:copy" className="ml-1" /></UserAddress>
                    </div>
                    <div className="flex justify-between items-center my-5 px-6">
                        <a href="" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">My NFTs</a>
                        <a href="" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Activity</a>
                        <a href="" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Favorites</a>
                    </div>
                </div>
            </ProfileCardWrap>
            <Alert isOpenAlert={isOpenAlert} setIsOpenAlert={setIsOpenAlert} color="green">지갑 주소가 복사되었습니다</Alert>
        </>
    )
}
