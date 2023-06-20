import type { NextPage } from "next";
import Image from "next/image";
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
