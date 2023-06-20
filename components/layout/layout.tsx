import Footer from "@components/footer/footer";
import Header from "@components/header/header";

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="pt-40">{children}</div>;
};

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen justify-between">
            <div>
                <Header />
                <div className="md:container md:mx-auto px-4">
                    <ContentLayout>{children}</ContentLayout>
                </div>
            </div>
            <Footer />
        </div>
    );
};
