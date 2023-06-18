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
                <div className="p-4">
                    {(!modify)
                        ? <img className="w-36 h-36 rounded-full object-cover" src={user.userImg} />
                        : <FileInputCircle state={userImg} setState={setUserImg} />}
                </div>
                <div className="p-4 space-y-4 w-40">
                    {(!modify)
                        ? <h3 className="text-xl font-semibold">{user.name}</h3>
                        : <InputBox icon="fa-solid:user-edit" value={username.value} onChange={username.onChange} />}
                    <UserAddress onClick={handleCopy}>{slicedAddress}<Icon icon="bxs:copy" className="ml-1" /></UserAddress>
                    <div className="flex">
                        <Button {...(!modify) ? { color: "blue" } : { color: "green" }} fontSize="sm" onClick={handleUpdate} ><Icon icon="bxs:edit" className="mr-1 text-lg" />{(!modify) ? "수정하기" : "수정완료"}</Button>
                    </div>
                </div>
            </ProfileCardWrap>
            <Alert isOpenAlert={isOpenAlert} setIsOpenAlert={setIsOpenAlert} color="green">지갑 주소가 복사되었습니다</Alert>
        </>
    )
}




