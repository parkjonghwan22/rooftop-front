import { ActivityData } from "@utils/types/nft.interface";
import { TdStyled, ThStyled } from "./styled/Activity.styled";
import { TimeStamp } from "@components/common/timestamp/timestamp";
import { UserAddress } from "@components/common/copy/address";


export const Activity = ({ activity }: { activity: ActivityData[] }) => {


  if (!activity) return <></>
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="rounded-b-lg shadow overflow-hidden dark:border-gray-800 dark:shadow-gray-700 max-h-[500px] overflow-y-scroll">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <ThStyled>Event</ThStyled>
                  <ThStyled>From</ThStyled>
                  <ThStyled>To</ThStyled>
                  <ThStyled>Price</ThStyled>
                  <ThStyled>Date</ThStyled>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {activity.slice().reverse().map((item, index) => (
                  <tr key={index}>
                    <TdStyled>{item.event}</TdStyled>
                    <TdStyled >
                      <UserAddress address={item.from} />
                    </TdStyled>
                    <TdStyled>
                      <UserAddress address={item.to} />
                    </TdStyled>
                    <TdStyled className="font-bold">{item.price / (10 ** 18)} MATIC</TdStyled>
                    <TdStyled><TimeStamp timestamp={item.createdAt} /></TdStyled>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
