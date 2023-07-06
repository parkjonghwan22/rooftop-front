import { NextPage } from "next";
import { RootLayout } from "@components/layout/layout";
import { Airdrop } from "@components/airdrop/airdrop";
import request from "@utils/request";
import { useQuery } from "react-query";
import { LoadingSpinner2 } from "@components/common/loading";

const Home: NextPage = () => {
  const getAirdropEvents = async () => {
    try {
      const { data } = await request.get(`airdrop/`);
      return data;
    } catch (error: unknown) {
      throw new Error(error as string);
    }
  };

  const { data: airdropData, isLoading: airdropLoading } = useQuery(
    ["airdropEvents"],
    () => getAirdropEvents()
  );

  const isLoading = airdropLoading
  if (isLoading || !airdropData) return <LoadingSpinner2 />;

  return (
    <RootLayout>
      <Airdrop airdropData={airdropData} />
    </RootLayout>
  );
};

export default Home;
