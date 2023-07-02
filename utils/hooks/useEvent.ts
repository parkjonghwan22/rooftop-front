import request from "@utils/request";
import { useEffect } from "react";

export const useEvent = () => {
    const getTradeSummary = async (NFTaddress: string, duration: number) => {
        try {
            const { data } = await request.get(`event/trade/${NFTaddress}?time=${duration}`)
            console.log(data)
        } catch (error: unknown) {
            throw new Error(error as string);
        }
    }

    
    return { getTradeSummary }
}