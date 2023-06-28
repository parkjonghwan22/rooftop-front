import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { StyledProps } from "utils/types/style.interface";
import { ReSaleContent, ReSaleWrapper } from "./styled/Resale.styled";

interface ResaleProps extends StyledProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReSaleModal = ({
  isOpenModal,
  setIsOpenModal,
  children,
  width,
  height,
}: ResaleProps) => {
  const ResaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (
        ResaleRef.current &&
        !ResaleRef.current.contains(e.target as HTMLElement)
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
    <ReSaleWrapper>
      <ReSaleContent ref={ResaleRef} width={width} height={height}>
        <Icon
          icon="ph:x"
          onClick={() => setIsOpenModal(false)}
          className="ml-auto text-lg cursor-pointer mt-2 mr-2 hover:animate-tada"
        />
        {children}
      </ReSaleContent>
    </ReSaleWrapper>
  ) : null;
};
