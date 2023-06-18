import tw from "tailwind-styled-components"
import { Icon } from '@iconify/react';
import { InputType } from "@utils/types/input.interface";


export const InputBox = ({ name, value, onChange, onInput, placeholder, icon }: InputType) => {

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none"><Icon icon={icon} className="text-gray-500 dark:text-gray-300" /></div>
            <input value={value} onChange={onChange} onInput={onInput} placeholder={placeholder} id={name} name={name} 
                className="pl-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5  dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-300" 
            />
        </div>
    )
}


