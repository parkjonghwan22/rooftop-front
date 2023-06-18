import { Icon } from "@iconify/react";
import { useAccount } from "wagmi";

export const ShowAddress = () => {

  const { address } = useAccount()
  const slicedAddress = `${address?.slice(0, 7)}`;
  if (!address) return null

  return (
    <>
      <Icon icon="formkit:ethereum" className="text-lg" />
      <div>{slicedAddress}</div>
    </>
  )
}
