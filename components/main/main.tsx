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
  return (
    <div className="mx-auto flex flex-col items-center">
      <Slide />
      <Category />
      <Collection />
    </div>
  );
};

export default Main;
