import { StyledOptions, StyledProps } from "@utils/types/style.interface";

const backgroundColors: StyledOptions = {
    red: "bg-red-500",
    orange: "bg-red-500",
    blue: "bg-blue-600",
    green: "bg-green-600",
    yellow: "bg-yellow-500",
    gray: "bg-gray-100",
  };
  
  const textSizes: StyledOptions = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
  };
  
  interface ButtonProps extends StyledProps {
    type?: "button" | "submit" | "reset" | undefined;
    size?: string;
    onClick?: () => any;
    disabled?: boolean;
  }
  
  export const Button = ({ onClick, type, color, size, fontSize, disabled, children }: ButtonProps) => {
    const buttonStyled: string = `flex items-center justify-center py-2.5 px-2.5 mr-3 focus:outline-none hover:bg-gray-400 rounded text-white mt-4 md:mt-0 transition duration-300 ease-in-out`;

    let bgColor = backgroundColors[color ? color : "gray"];
    let txtSize = textSizes[fontSize ? fontSize : "sm"];

    if (!type) type = "button"
    if (!size) size = "w-full"
    return <button type={type} onClick={onClick} disabled={disabled} className={`${bgColor} ${txtSize} ${size} ${buttonStyled}`}>{children}</button>;
  };
  