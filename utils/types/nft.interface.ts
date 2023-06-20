export type NftMeta = {
    name: string
    description: string
    image: string
}

export type PinataRes = {
    IpfsHash: string
    PinSize: number
    Timestamp: string
    isDuplicate: boolean
}
