"use client"
import React from 'react'
import { Icon } from '@iconify/react';
import { useTheme } from "next-themes";


export const DarkModeToggle = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    

    return (
        <label className="relative inline-flex items-center mr-5 cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={theme === "dark"}
                onChange={() => theme === "dark" ? setTheme('light') : setTheme('dark')}
            />
            <div className="w-14 h-7 bg-gray-200 rounded-full flex items-center peer dark:bg-gray-700 peer-focus:ring-3 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600">
            {theme === "dark" 
            ? <Icon icon="material-symbols:light-mode" className="ml-1.5 text-md font-medium text-gray-200" /> 
            : <Icon icon="iconamoon:mode-dark-fill" className="ml-auto mr-1.5 text-md font-medium text-gray-500" />}
            </div>
        </label>
    )
}
