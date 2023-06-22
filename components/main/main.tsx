import Category from "./styled/category";
import Collection from "./styled/collection";
import Slide from "./styled/slide";
import { useQueryClient, useQuery } from "react-query";
import { useCoingecko } from "@utils/hooks/useCoingecko";
import { Button } from "@components/common/button";
import { useState } from "react";
import { LoadingModal } from "@components/common/modal/LoadingModal";
import { LoadingSpinner2 } from "@components/common/loading/loading2";

const Main = () => {
  // const { data: maticPriceData, isLoading: maticPriceLoading } = useQuery(
  //     'maticPrice',
  //     useCoingecko
  // )
  // console.log('maticPriceData :', maticPriceData?.maticPrice)
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
      <LoadingModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        width="87rem"
        height="1.5rem"
      >
        <LoadingSpinner2 />
      </LoadingModal>
    </div>
  );
};

export default Main;
