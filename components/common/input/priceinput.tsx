import { Icon } from '@iconify/react'
import { InputType } from '@utils/types/input.interface'

export const PriceInputBox = ({ name, value, onChange, onInput, placeholder, icon }: InputType) => {
    const inputStyled: string = `pl-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5  dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-300`

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                <Icon icon={icon} className="text-gray-500 dark:text-gray-300" />
            </div>
            <input
                type="number"
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onInput={onInput}
                step="0.001"
                min="0"
                className={`${inputStyled}`}
            />
        </div>
    )
}
