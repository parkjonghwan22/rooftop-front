import Image from 'next/image'
import Link from 'next/link'
import tw from 'tailwind-styled-components'
import { useWindowSize } from '@utils/hooks/useWindowSize'
import { Icon } from '@iconify/react'
import { VerifiedMarker } from '@components/common/marker/verify'

export const SectionWrap = tw.div`
    flex flex-row w-full p-6 mb-6 rounded-lg bg-white dark:border-gray-700 dark:bg-gray-800 shadow
`

export const SectionA = tw.div`
    flex flex-col px-6 w-4/5
`

export const SectionB = tw.div`
    flex w-1/5 flex-row-reverse items-center
`

interface LogoProps {
    src: string
    link: string
    collectionAddress: string
}

export const Logo = ({ src, link, collectionAddress }: LogoProps) => {
    return (
        <div className="min-w-40 cursor-pointer">
            {/* <Link href={{ pathname: `${link}`, query: { ca: `${collectionAddress}` }}} as={link}> */}
            <Link href={`collections/${collectionAddress}`}>
                <Image
                    src={src}
                    alt=""
                    width={200}
                    height={200}
                    className="w-40 h-40 rounded-md object-cover"
                />
            </Link>
        </div>
    )
}

export const CollectionName = ({ name, verified }: { name: string; verified: boolean }) => {
    return (
        <div className="flex h-8 flex-row items-center">
            <div className="text-3xl font-semibold mr-1.5">{name}</div>
            {verified && <VerifiedMarker />}
        </div>
    )
}

export const Description = ({ description }: { description: string }) => {
    return <div className="py-1.5 text-sm text-gray-500 dark:text-gray-400">{description}</div>
}

interface CollectionProps {
    totalVolume: number
    floorPrice: number
    creatorFee: string
    follows: number
}

export const CollectionDatas = ({
    totalVolume,
    floorPrice,
    creatorFee,
    follows,
}: CollectionProps) => {
    const windowSize = useWindowSize()
    const isScreenSmall = windowSize.width < 820

    return (
        <div className="mt-2 flex flex-row items-center space-x-6 invisible w-0 lg:visible lg:w-full">
            {!isScreenSmall && (
                <>
                    <CollectionData
                        data={totalVolume}
                        icon="ri:exchange-box-fill"
                        text="총 거래량"
                    />
                    <CollectionData data={floorPrice} icon="game-icons:token" text="최저 거래가" />
                    <CollectionData
                        data={creatorFee}
                        icon="heroicons-solid:receipt-tax"
                        text="작가 로열티"
                    />
                    <CollectionData data={follows} icon="mdi:heart" text="팔로워" />
                </>
            )}
        </div>
    )
}

const CollectionData = ({
    data,
    text,
    icon,
}: {
    data: number | string
    text: string
    icon: string
}) => {
    return (
        <div className="flex h-20 w-36 flex-col items-center justify-center rounded-md border border-dashed border-gray-300 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
            <div className="flex flex-row items-center justify-center">
                <Icon icon={icon} className="mr-2 text-gray-500/95 dark:text-gray-400 text-lg" />
                <span className="font-bold text-gray-700 dark:text-gray-300">{data}</span>
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">{text}</div>
        </div>
    )
}
