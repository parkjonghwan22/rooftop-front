import tw from 'tailwind-styled-components'
import { Icon } from '@iconify/react'


export const CollectionStat = ({ value, label }: { value: string | number, label: string }) => {
  return (
    <>
      <div className="group relative flex flex-col items-center justify-center cursor-pointer">
        <p className="text-md lg:text-2xl font-bold text-navy-700 dark:text-white">{value}</p>
        <p className="text-sm hidden lg:block font-normal text-gray-500">{label}</p>
      </div>
      <div className="absolute group-hover:opacity-100 transition-opacity opacity-0 z-10 inline-block px-3 py-2 text-md text-gray-900 dark:text-green-500 bg-white dark:bg-gray-900 rounded-lg shadow-lg tooltip">
        <span>{label}</span>
      </div>
    </>
  );
};