import { useEffect, useRef } from "react";
import { ModalWrapper, ModalContent } from "./styled/modal.styled";
import { Icon } from "@iconify/react";
import { StyledProps } from "utils/types/style.interface";

interface ModalProps extends StyledProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal = ({
  isOpenModal,
  setIsOpenModal,
  children,
  width,
  height,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as HTMLElement)
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
    <ModalWrapper>
      <ModalContent ref={modalRef} width={width} height={height}>
        <Icon
          icon="ph:x"
          onClick={() => setIsOpenModal(false)}
          className="ml-auto text-xl cursor-pointer"
        />
        {children}
      </ModalContent>
    </ModalWrapper>
  ) : null;
};
