import tw from 'tailwind-styled-components'
import { Icon } from '@iconify/react'


export const CollectionStat = ({ value, label }: {value : string | number, label : string}) => {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-navy-700 dark:text-white">{value}</p>
        <p className="text-sm font-normal text-gray-500">{label}</p>
      </div>
    );
};
  