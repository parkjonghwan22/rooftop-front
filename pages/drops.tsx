import { NextPage } from "next";
import { RootLayout } from "@components/layout/layout";
import { Airdrop } from "@components/airdrop/airdrop";

const Home: NextPage = () => {



  return (
    <RootLayout>
      <Airdrop />
    </RootLayout>
  );
};

export default Home;
