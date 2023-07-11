import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import tw from "tailwind-styled-components";

export const UserAddress = ({ address }: { address: string }) => {

  const AddressWrapper = tw.span`
    flex justify-center items-center text-gray-200 rounded-lg text-center font-medium px-4 py-2 bg-gray-700 dark:bg-gray-900 hover:bg-black hover:text-white cursor-pointer
`;
  const slicedAddress = address.slice(0, 6) + "..." + address.slice(-4);


  const handleCopy = () => {
    if (!address) return
    navigator.clipboard.writeText(address);
    toast.success("Address is Copied");
  };

  return (
    <AddressWrapper onClick={handleCopy}>
      {slicedAddress}
        <Icon icon="bxs:copy" className="ml-1" />
    </AddressWrapper>
  );
};
