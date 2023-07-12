import Image from "next/image";
import { UserType } from "@utils/types/user.interface";
import { ProfileCardWrap, UserAddress } from "./styled/Profile.styled";
import { Icon } from "@iconify/react";
import { Button } from "@components/common/button";
import { useState } from "react";
import { useInput } from "@utils/hooks/useInput";
import { InputBox } from "@components/common/input";
import { FileInputCircle } from "@components/common/input/fileinputcircle";
import request from "@utils/request";
import { Alert } from "@components/common/alert";
import { MyNFT, Activity, Favorites } from "./index"
import { ActivityData, CollectionData, TokenData } from "@utils/types/nft.interface";

interface ProfileProps {
  user: UserType | null;
  tokenData: TokenData[]
  activity: ActivityData[]
  collectionData : CollectionData[]
}

export const ProfileCard = ({ user, tokenData, activity,collectionData}: ProfileProps) => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [modify, setModify] = useState(false);
  const [userImg, setUserImg] = useState<string>("");
  const [activeTab, setActiveTab] = useState("nfts");

  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  // console.log("collectionData : ",collectionData)

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const username = useInput(user?.name);
  const slicedAddress =
    user!.address.slice(0, 6) + "..." + user!.address.slice(-4);

  const handleUpdate = async () => {
    setModify((prevState) => !prevState);

    if (modify) {
      const res = await request.put("auth/update", {
        address: user!.address,
        name: username.value,
        userImg: userImg,
      });
      if (res.status === 200) {
        window.location.reload();
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(user!.address);
    setIsOpenAlert(true);
  };

  if (!user) return <></>;
  return (
    <>
      <ProfileCardWrap>
        <div className="absolute top-5 right-5 w-28">
          <Button
            {...(!modify ? { color: "blue" } : { color: "green" })}
            fontSize="sm"
            onClick={handleUpdate}
          >
            <Icon icon="bxs:edit" className="mr-1 text-lg" />
            {!modify ? "Edit" : "Confirm"}
          </Button>
        </div>
        <div className="flex justify-center">
          <div className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110">
            {!modify ? (
              <Image
                src={user.userImg}
                alt="user"
                width={200}
                height={200}
                className="w-full h-full rounded-full"
              />
            ) : (
              <FileInputCircle state={userImg} setState={setUserImg} />
            )}
          </div>
        </div>
        <div className="mt-16">
          {!modify ? (
            <h1 className="font-bold text-center text-3xl">{user.name}</h1>
          ) : (
            <div className="flex items-center justify-center">
              <InputBox
                value={username.value}
                onChange={username.onChange}
                fontSize="xl"
              />
            </div>
          )}

          <div className="my-5 px-6">
            <UserAddress onClick={handleCopy}>
              {slicedAddress}
              <Icon icon="bxs:copy" className="ml-1" />
            </UserAddress>
          </div>
          <div className="flex justify-between items-center px-6 ">
            <div
              className={`text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-t-lg transition duration-150 ease-in font-medium text-sm text-center w-full py-3 cursor-pointer ${
                activeTab === "nfts"
                  ? "bg-red-500 dark:bg-gray-600 text-white"
                  : ""
              }`}
              onClick={() => handleTabClick("nfts")}
            >
              My NFTs
            </div>
            <div
              className={`text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-t-lg transition duration-150 ease-in font-medium text-sm text-center w-full py-3 cursor-pointer ${
                activeTab === "activity"
                  ? "bg-red-500 dark:bg-gray-600 text-white "
                  : ""
              }`}
              onClick={() => handleTabClick("activity")}
            >
              Activity
            </div>
            <div
              className={`text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-t-lg transition duration-150 ease-in font-medium text-sm text-center w-full py-3 cursor-pointer ${
                activeTab === "favorites"
                  ? "bg-red-500 dark:bg-gray-600 text-white "
                  : ""
              }`}
              onClick={() => handleTabClick("favorites")}
            >
              Favorites
            </div>
          </div>
        </div>
        <div className=" mx-auto ml-6 mr-6 dark:bg-gray-600 shadow rounded-b-lg border-t-2 dark:border-t-2 dark:border-gray-900">
          {activeTab === "nfts" && <MyNFT tokenData={tokenData} activity={activity}/>}
          {activeTab === "activity" && <Activity activity={activity} />}
          {activeTab === "favorites" && <Favorites collectionData = {collectionData}/>}
        </div>
      </ProfileCardWrap>
      <Alert
        isOpenAlert={isOpenAlert}
        setIsOpenAlert={setIsOpenAlert}
        color="green"
      >
        지갑 주소가 복사되었습니다
      </Alert>
    </>
  );
};
