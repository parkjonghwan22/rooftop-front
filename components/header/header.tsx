import {
  TitleContainer,
  Button,
} from "./styled/Header.styled";
import { Icon } from "@iconify/react";
import { Modal } from "@components/common/modal/Modal";
import { useEffect, useState } from "react";
import ConnectWallet from "@components/sign/connect";
import { useAccount, useDisconnect } from "wagmi";
import { DropDownBtn } from "@components/dropdown/dropdown";
import request from "@utils/request";
import { LoadingSpinner } from "@components/common/loading/loading";
import { UserType } from "@utils/types/user.interface";
import Link from "next/link";
import { CartButton } from "@components/common/button";
import { SearchContainer, SearchBox } from "@components/common/search/search";

const Header = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDefinitelyConnected, setIsDefinitelyConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);


  const getUser = async () => {
    try {
      const { data } = await request.post("auth/sign", {
        address: address,
      });
      if (data.address) setUser(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      setIsDefinitelyConnected(true);
      getUser();
    } else {
      setIsDefinitelyConnected(false);
    }
  }, [address]);


  return (
    <>
      <header>
        <div className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 opacity-90 fixed top-0 left-0 right-0">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="/">
              <TitleContainer />
            </Link>
            <SearchContainer>
              <SearchBox />           
            </SearchContainer>
            <div className="flex items-center">
            {!isDefinitelyConnected && 
            <Button
                color="white"
                backgroundColor="red"
                fontSize="md"
                onClick={() => { setIsOpenModal(true) }}
              >
                <Icon icon="akar-icons:link-chain" className="w-4 h-4 mr-1" />
                Connect
            </Button> }
              {isDefinitelyConnected &&
                (isLoading ? <LoadingSpinner /> : <DropDownBtn user={user} />)}
            {isDefinitelyConnected && <CartButton /> }   
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
    </>
  )

};
export default Header;
