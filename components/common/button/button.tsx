import { StyledOptions, StyledProps } from "@utils/types/style.interface";

const backgroundColors: StyledOptions = {
    red: "bg-red-500 hover:bg-red-700",
    orange: "bg-red-500 hover:bg-orange-700",
    blue: "bg-blue-600 hover:bg-blue-800",
    green: "bg-green-600 hover:bg-green-800",
    yellow: "bg-yellow-500 hover:bg-yellow-700",
    purple: "bg-purple-500 hover:bg-purple-700",
    cyan: "bg-cyan-500 hover:bg-cyan-700",
    gray: "bg-gray-100 hover:bg-gray-400",
  };
  
  const textSizes: StyledOptions = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
  };

  const fontWeights: StyledOptions = {
    bold: "font-bold",
    semiBold: "font-semibold"
  }
  
  interface ButtonProps extends StyledProps {
    type?: "button" | "submit" | "reset" | undefined;
    size?: string;
    onClick?: () => any;
    disabled?: boolean;
    important?: string;
  }
  
  export const Button = ({ onClick, type, color, size, fontSize, fontWeight, disabled, children, important }: ButtonProps) => {
    if (important) important = `!${important}`
    const buttonStyled: string = `flex items-center justify-center py-2.5 px-2.5 mr-3 focus:outline-none rounded text-white mt-4 md:mt-0 transition duration-300 ease-in-out ${important}`;

    let bgColor = backgroundColors[color ? color : "gray"];
    let weight = fontWeights[fontWeight? fontWeight : ""]
    let txtSize = textSizes[fontSize ? fontSize : "sm"];

    if (!type) type = "button"
    if (!size) size = "w-full"
    return <button type={type} onClick={onClick} disabled={disabled} className={`${important} ${bgColor} ${txtSize} ${weight} ${size} ${buttonStyled}`}>{children}</button>;
  };
  