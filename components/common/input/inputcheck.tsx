import { Icon } from "@iconify/react";

interface InputCheckProps {
  id: string
  isFocused: string
  isDuplicated: boolean
}

export const InputCheck = ({ id, isFocused, isDuplicated}: InputCheckProps) => {
  return id === isFocused ? (isDuplicated ? 
  <div className="flex items-center px-2 text-sm text-green-600 dark:text-green-400 transition delay-300 duration-300 ease-in-out"><Icon icon="icon-park-solid:check-one" className="mr-1 text-md" />사용하실 수 있습니다</div> : 
  <div className="flex items-center px-2 text-sm text-red-500 transition delay-300 duration-300 ease-in-out"><Icon icon="mdi:warning-circle" className="mr-1 text-md" />이미 사용중입니다</div>): <></>
}