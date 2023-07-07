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
    const getUserActivity = async (to: string) => {
        try {
            const { data } = await request.get(`event?to=${to}`);
            return data;
        } catch (error: unknown) {
            throw new Error(error as string);
        }
    }

    // const getLeaderBoard = async (to: string[]) => {
    //     try {
    //       const result: any[] = [];
      
    //       for (const item of to) {
    //         const { data } = await request.get(`event?time=24&to=${item}`);
    //         result.push(...data);
    //       }
      
    //       return result;
    //     } catch (error: unknown) {
    //       throw new Error(error as string);
    //     }
    //   }

    const getLeaderBoard = async (to: string[]) => {
        try {
          const result: any[] = [];
      
          for (const item of to) {
            const { data } = await request.get(`event?airdrop=${item}`);
            result.push(...data);
          }
      
          return result;
        } catch (error: unknown) {
          throw new Error(error as string);
        }
      }

    const getTradeSummary = async (NFTaddress: string, duration: number) => {
        try {
            const { data } = await request.get(`event/trade/${NFTaddress}?time=${duration}`)
            // console.log(data)
            return data
        } catch (error: unknown) {
            throw new Error(error as string);
        }
    }


    return {
        getAllEvents,
        getTokenActivity,
        getUserActivity,
        getLeaderBoard,
        getTradeSummary,
    };
};