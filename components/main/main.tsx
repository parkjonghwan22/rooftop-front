import Category from "./styled/category";
import Collection from "./styled/collection";
import Slide from "./styled/slide";
import { useState } from "react";
import { LoadingModal } from "@components/common/modal/LoadingModal";
import { LoadingSpinner2 } from "@components/common/loading/loading2";
import { Button } from "@components/common/button";
import { BidModal } from "@components/common/modal/BidModal";
import Bid from "@components/collection/bid";

const Main = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="mx-auto flex flex-col items-center">
      <Slide />
      <Category />
      <Collection />
      <Button
        onClick={() => {
          setIsOpenModal(true);
        }}
        color="blue"
        size="w-150 h-16"
      >
        loading test
      </Button>
      {/* <LoadingModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        width="87rem"
        height="1.5rem"
      >
        <LoadingSpinner2 />
      </LoadingModal> */}
      <Button
        onClick={() => {
          setIsOpenModal(true);
        }}
        color="red"
        size="w-150 h-16"
      >
        입찰버튼
      </Button>
      <BidModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        width="87rem"
        height="1.5rem"
      >
        <Bid />
      </BidModal>
    </div>
  );
};

export default Main;
