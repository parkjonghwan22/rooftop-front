export interface CollectionData {
    _id: string;
    address: string;
    creator: string;
    name: string;
    symbol: string;
    description: string;
    url: string;
    creatorFee: string;
    logo: string;
    verified?: string;
    floorPrice?: number;
    totalVolume?: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}


export interface TokenData {
    id: number;
    seller: string;
    NFTaddress: string;
    tokenId: number;
    price: number;
    metadata: string;
    sold: boolean;
    creatorFee: number;
    openingPrice: number;
    auctionEndTime: number;
    highestBidder: string;
    highestBid: number;
}

export interface ActivityData {
    _id: string;
    id: number;
    from: string;
    to: string;
    NFTaddress: string;
    tokenId: number;
    price: number;
    event: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface MetaData {
    name: string;
    desription: string;
    ipfs: string;
    imageUrl? : string;
}