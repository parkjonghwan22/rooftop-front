import { useEffect, useRef, useState } from "react";
import { AlertContent } from "./styled";
import { StyledOptions, StyledProps } from "utils/types/style.interface";
import { Icon } from '@iconify/react';

interface AlertProps extends StyledProps {
  isOpenAlert: boolean;
  setIsOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const backgroundColors: StyledOptions = {
  red: "bg-red-500",
  orange: "bg-red-500",
  green: "bg-green-600",
  yellow: "bg-yellow-500",
  gray: "bg-gray-100",
};

export const Alert = ({ isOpenAlert, setIsOpenAlert, children, width, height, color }: AlertProps) => {
  const AlertRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (AlertRef.current && !AlertRef.current.contains(e.target as HTMLElement)) {
        setIsOpenAlert(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        setIsOpenAlert(false);
      }
    };

    document.addEventListener("mousedown", handleClose);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClose);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOpenAlert]);

  useEffect(() => {
    if (isOpenAlert) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false) 
        setIsOpenAlert(false)}
        , 4000);

    }
  }, [isOpenAlert]);

  let bgColor = backgroundColors[color ? color : "red"];


  return isVisible ? (
      <AlertContent
        ref={AlertRef}
        className={`${bgColor} ${width} ${height} ${
          isVisible ? "transition-opacity duration-300 ease-in-out opacity-90" : "transition-opacity-0"
        }`}      >
        {children}
      </AlertContent>
  ) : null;
};
