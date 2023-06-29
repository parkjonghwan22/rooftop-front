import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { StyledProps } from "utils/types/style.interface";
import { AuctionContent, AuctionWrapper } from "./styled/Auction.styled";


interface AuctionProps extends StyledProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuctionModal = ({
  isOpenModal,
  setIsOpenModal,
  children,
  width,
  height,
}: AuctionProps) => {
  const AuctionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (
        AuctionRef.current &&
        !AuctionRef.current.contains(e.target as HTMLElement)
      ) {
        setIsOpenModal(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        setIsOpenModal(false);
      }
    };

    document.addEventListener("mousedown", handleClose);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClose);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOpenModal]);

  return isOpenModal ? (
    <AuctionWrapper>
      <AuctionContent ref={AuctionRef} width={width} height={height}>
        <Icon
          icon="ph:x"
          onClick={() => setIsOpenModal(false)}
          className="ml-auto text-lg cursor-pointer mt-2 mr-2 hover:animate-tada"
        />
        {children}
      </AuctionContent>
    </AuctionWrapper>
  ) : null;
};