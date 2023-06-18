import Header from "@components/header/header"

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="pt-10">{children}</div>
}

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="md:container md:mx-auto px-4">
            <Header />
            <ContentLayout>{children}</ContentLayout>
        </div>
    )
}

