import { NavLink } from "@components/dropdown/styled/dropdown.styled";
import { Icon } from "@iconify/react";
import Link from "next/link";

export const CartButton = () => {
  return (
    <div className="ml-3">
      <button>
        <NavLink>
          <Link href="/mycart" className="flex item-center relative flex">
            <Icon
              icon="material-symbols:shopping-cart"
              className="w-8 h-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition duration-150"
            />
            <span className="absolute right-0 top-0 rounded-full bg-pink-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
              5
            </span>
          </Link>
        </NavLink>
      </button>
    </div>
  );
};
