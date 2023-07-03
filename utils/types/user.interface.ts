export interface UserType {
  address: string;
  name: string;
  userImg: string;
  createdAt: string;
  hasCollection: boolean;
  verified: boolean;
}

export interface CartType {
  _id: string,
  seller: string,
  shopper: string,
  id: number,
  NFTaddress: string,
  tokenId: number,
  price: number,
  metadata: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}