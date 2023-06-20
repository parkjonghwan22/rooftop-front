export const CollectionBanner = () => {
    return (
        <div className="relative flex flex-col mb-10 items-center rounded-[20px] w-11/12 mx-auto p-4 bg-white dark:bg-gray-900 bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
            <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover" >
                <img src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png' className="absolute flex h-32 w-full justify-center rounded-xl bg-cover" /> 
                <div className="absolute -bottom-12 flex h-[120px] w-[120px] items-center justify-center rounded-full border-[4px] border-white bg-red-400 dark:!border-navy-700">
                    <img src='https://i.seadn.io/gcs/files/b0d52a4c13fdce69778cba661a1d756a.png?auto=format&dpr=1&w=384' alt="" className="h-full w-full rounded-full" />
                </div>
            </div> 
            <div className="mt-16 flex flex-col items-center">
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                collection name
                </h4>
                <p className="text-base font-normal text-gray-500">creator</p>
            </div> 
            <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-navy-700 dark:text-white">17</p>
                    <p className="text-sm font-normal text-gray-500">작품</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-navy-700 dark:text-white">111</p>
                    <p className="text-sm font-normal text-gray-500">최저 거래가</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-navy-700 dark:text-white">222</p>
                    <p className="text-sm font-normal text-gray-500">총 거래량</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-navy-700 dark:text-white">5%</p>
                    <p className="text-sm font-normal text-gray-500">작가 로열티</p>
                </div>
            </div>
        </div>  
    )
}