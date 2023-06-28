import { NextPage } from "next";
import { RootLayout } from "@components/layout/layout";
import Main from "@components/main/main";

const Home: NextPage = () => {



  return (
    <RootLayout>
      <Main />
    </RootLayout>
  );
};

export default Home;
