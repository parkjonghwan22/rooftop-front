import { useState } from "react";
import { Icon } from "@iconify/react";
import { StyledOptions } from "@utils/types/style.interface";

const backgroundColors: StyledOptions = {
    red: "bg-red-500 hover:bg-red-700",
    orange: "bg-orange-500 hover:bg-orange-700",
    blue: "bg-blue-600 hover:bg-blue-800",
    green: "bg-green-600 hover:bg-green-800",
    purple: "bg-purple-500 hover:bg-purple-700",
    cyan: "bg-cyan-500 hover:bg-cyan-700",
    gray: "bg-gray-600 hover:bg-gray-800",
};

interface BannerProps {
    color: string
    children: React.ReactNode
}

export const Banner = ({ color, children }: BannerProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const closeBanner = () => {
        setIsOpen(false);
    };

    let bgColor = backgroundColors[color ? color : "gray"];

    return (
        <>
            {isOpen && (
                <div className={`${bgColor} fixed top-16 left-0 z-10 flex justify-between w-full p-4 transition duration-300 ease-in-out`}>
                    <div className="flex items-center mx-auto">
                        <Icon icon="fxemoji:warningsign" className="mr-2" />
                        <span className="flex items-center text-sm font-normal text-gray-100 dark:text-gray-100">
                            {children}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <button onClick={closeBanner}>
                            <Icon icon="ph:x" className="text-xl" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};