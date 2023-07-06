import request from "@utils/request";
import { CollectionData } from "@utils/types/nft.interface";

export const useCollection = () => {

    const getAllCollections = async () => {
        try {
          const { data } = await request.get(`collection`);
          return data as CollectionData[]
        } catch (error: unknown) {
          throw new Error(error as string);
        }
      };

    const getCollection = async (collectionAddress: string) => {
        try {
          const { data } = await request.get(`collection/${collectionAddress}`);
          return data[0] as CollectionData;
        } catch (error: unknown) {
          throw new Error(error as string);
        }
      }

    return {
        getAllCollections,
        getCollection,
    };
};