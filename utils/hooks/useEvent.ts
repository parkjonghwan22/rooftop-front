import request from "@utils/request";

export const useEvent = () => {

    const getAllEvents = async () => {
        try {
            const { data } = await request.get(`event?time=72&event=transfer`); // 시간 내의 transfer 이벤트
            return data;
        } catch (error: unknown) {
            throw new Error(error as string);
        }
    };

    const getTokenActivity = async (id: string | number) => {
        try {
            const { data } = await request.get(`event/${id}`);
            return data;
        } catch (error: unknown) {
            throw new Error(error as string);
        }
    }
    const getUserActivity = async (from: string) => {
        try {
            const { data } = await request.get(`event?from=${from}`);
            return data;
        } catch (error: unknown) {
            throw new Error(error as string);
        }
    }

    const getTradeSummary = async (NFTaddress: string, duration: number) => {
        try {
            const { data } = await request.get(`event/trade/${NFTaddress}?time=${duration}`)
            console.log(data)
            return data
        } catch (error: unknown) {
            throw new Error(error as string);
        }
    }


    return {
        getAllEvents,
        getTokenActivity,
        getUserActivity,
        getTradeSummary,
    };
};