import Footer from "@components/footer/footer";
import Header from "@components/header/header";

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="pt-10">{children}</div>;
};

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="md:container md:mx-auto px-4">
        <ContentLayout>{children}</ContentLayout>
      </div>
      <Footer />
    </>
  );
};
