import tw from "tailwind-styled-components";
import Image from "next/image";
import { CollectionData } from "@utils/types/collection.interface";

interface CollectionProps {
  collectionDatas: CollectionData[]
}

const CategoryItem = ({ collection }: { collection : CollectionData }) => {

  const TdStyled = tw.td`
    py-4 whitespace-no-wrap border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600
`
  return (
    <tr>
      <TdStyled className="px-4">
        <div className="text-center">1</div>
      </TdStyled>
      <TdStyled>
        <div className="w-20 h-20 ml-2">
          <Image
            src={collection.logo ? collection.logo : 'https://dummyimage.com/480x480/ccc/000'}
            alt="test"
            width={1000}
            height={1000}
            className="object-fill w-20 h-20 border-2 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
          />
        </div>
      </TdStyled>
      <TdStyled className="px-6">
        <div className="text-lg leading-5 font-medium text-gray-900 dark:text-gray-200 mb-3">{collection.name}</div>
        <div className="text-sm leading-5 text-gray-900 dark:text-gray-200">Floor : {collection.floorPrice}</div>
        <div className="text-sm leading-5 text-gray-400">Volume : {collection.totalVolume}</div>
      </TdStyled>
      <TdStyled className="px-4">
        <div className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-600 text-white">
          +0.05%
        </div>
      </TdStyled>
    </tr>
  )
}



const Category = ({ collectionDatas }: CollectionProps) => {




  {/* <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
Inactive
</span> */}

  return (
    <div className="flex flex-col w-3/4 mt-20">
      <header className=" border-b border-gray-100 dark:bg-gray-800 dark:border-gray-500 rounded-t-lg text-gray-700 dark:text-gray-100">
        <div className="px-5 py-4 flex">
          <h2 className="font-semibold text-3xl mr-10">Trending</h2>
          <h2 className="font-semibold  text-3xl">Top</h2>
        </div>
      </header>
      <div className="lg:w-1/2 lg:flex">
        <table className="min-w-full lg:w-full">
          <tbody className="container">
          {collectionDatas.map((collection) => (
            <CategoryItem key={collection._id} collection={collection} />
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category;



// const Category = () => {
//   return (
//     <>
//       <div className="mx-auto w-full h-650 mt-10">
//         <div className="shadow-lg rounded-sm  border-gray-200">
// <header className=" border-b border-gray-100 dark:bg-gray-800 rounded-t-lg">
//   <div className="px-5 py-4 flex">
//     <h2 className="font-semibold text-3xl mr-10">Trending</h2>
//     <h2 className="font-semibold  text-3xl">Top</h2>
//   </div>
// </header>
//           <div className="flex ">
//             <table className="w-full">
//               <thead className="text-xm font-semibold uppercase text-gray-400">
//                 <tr>
//                   <th className="p-2">
//                     <div className="font-semibold text-left">#</div>
//                   </th>
//                   <th className="p-2">
//                     <div className="font-semibold text-left">Collection</div>
//                   </th>
//                   <th className="p-2">
//                     <div className="font-semibold text-left">Floor price</div>
//                   </th>
//                   <th className="p-2">
//                     <div className="font-semibold text-center">Volume</div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="cursor-pointer">
//                   <td className="p-2">
//                     <div className="flex items-center">
//                       <div className="text-xl font-bold">1</div>
//                       <div className="w-24 h-24">
//                         <Image
//                           src="http://localhost:3000/test.png"
//                           alt="test"
//                           width={1000}
//                           height={1000}
//                           className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold">Space Cat</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold ">0.01 ETH</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-xl font-bold text-center">1.2 ETH</div>
//                   </td>
//                 </tr>
//                 <tr className="cursor-pointer">
//                   <td className="p-2">
//                     <div className="flex items-center">
//                       <div className="text-xl font-bold">2</div>
//                       <div className="w-24 h-24">
//                         <Image
//                           src="http://localhost:3000/test2.png"
//                           alt="test"
//                           width={1000}
//                           height={1000}
//                           className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold">Space Cat</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold ">0.01 ETH</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-xl font-bold text-center">1.2 ETH</div>
//                   </td>
//                 </tr>
//                 <tr className="cursor-pointer">
//                   <td className="p-2">
//                     <div className="flex items-center">
//                       <div className="text-xl font-bold">3</div>
// <div className="w-24 h-24">
//   <Image
//     src="http://localhost:3000/test3.png"
//     alt="test"
//     width={1000}
//     height={1000}
//     className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
//   />
// </div>
//                     </div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold">Space Cat</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold ">0.01 ETH</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-xl font-bold text-center">1.2 ETH</div>
//                   </td>
//                 </tr>
//                 <tr className="cursor-pointer">
//                   <td className="p-2">
//                     <div className="flex items-center">
//                       <div className="text-xl font-bold">4</div>
//                       <div className="w-24 h-24">
//                         <Image
//                           src="http://localhost:3000/test.png"
//                           alt="test"
//                           width={1000}
//                           height={1000}
//                           className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold">Space Cat</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold ">0.01 ETH</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-xl font-bold text-center">1.2 ETH</div>
//                   </td>
//                 </tr>
//                 <tr className="cursor-pointer">
//                   <td className="p-2">
//                     <div className="flex items-center">
//                       <div className="text-xl font-bold">5</div>
//                       <div className="w-24 h-24">
//                         <Image
//                           src="http://localhost:3000/test2.png"
//                           alt="test"
//                           width={1000}
//                           height={1000}
//                           className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold">Space Cat</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold ">0.01 ETH</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-xl font-bold text-center">1.2 ETH</div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table className="md:w-full md:visible w-0 invisible  ">
//               <thead className="text-xm font-semibold uppercase text-gray-400 ">
//                 <tr>
//                   <th className="p-2">
//                     <div className="font-semibold text-left">#</div>
//                   </th>
//                   <th className="p-2">
//                     <div className="font-semibold text-left">Collection</div>
//                   </th>
//                   <th className="p-2">
//                     <div className="font-semibold text-left">Floor price</div>
//                   </th>
//                   <th className="p-2">
//                     <div className="font-semibold text-center">Volume</div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="cursor-pointer">
//                   <td className="p-2">
//                     <div className="flex items-center">
//                       <div className="text-xl font-bold">4</div>
//                       <div className="w-24 h-24">
//                         <Image
//                           src="http://localhost:3000/test5.png"
//                           alt="test"
//                           width={1000}
//                           height={1000}
//                           className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold">Space Cat</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold ">0.01 ETH</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-xl font-bold text-center">1.2 ETH</div>
//                   </td>
//                 </tr>
//                 <tr className="cursor-pointer">
//                   <td className="p-2">
//                     <div className="flex items-center">
//                       <div className="text-xl font-bold">5</div>
//                       <div className="w-24 h-24">
//                         <Image
//                           src="http://localhost:3000/test6.png"
//                           alt="test"
//                           width={1000}
//                           height={1000}
//                           className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold">Space Cat</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold ">0.01 ETH</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-xl font-bold text-center">1.2 ETH</div>
//                   </td>
//                 </tr>
//                 <tr className="cursor-pointer">
//                   <td className="p-2">
//                     <div className="flex items-center">
//                       <div className="text-xl font-bold">6</div>
//                       <div className="w-24 h-24">
//                         <Image
//                           src="http://localhost:3000/test7.png"
//                           alt="test"
//                           width={1000}
//                           height={1000}
//                           className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold">Space Cat</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold ">0.01 ETH</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-xl font-bold text-center">1.2 ETH</div>
//                   </td>
//                 </tr>
//                 <tr className="cursor-pointer">
//                   <td className="p-2">
//                     <div className="flex items-center">
//                       <div className="text-xl font-bold">7</div>
//                       <div className="w-24 h-24">
//                         <Image
//                           src="http://localhost:3000/test8.png"
//                           alt="test"
//                           width={1000}
//                           height={1000}
//                           className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold">Space Cat</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold ">0.01 ETH</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-xl font-bold text-center">1.2 ETH</div>
//                   </td>
//                 </tr>
//                 <tr className="cursor-pointer">
//                   <td className="p-2">
//                     <div className="flex items-center">
//                       <div className="text-xl font-bold">8</div>
//                       <div className="w-24 h-24">
//                         <Image
//                           src="http://localhost:3000/test5.png"
//                           alt="test"
//                           width={1000}
//                           height={1000}
//                           className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold">Space Cat</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-left text-xl font-bold ">0.01 ETH</div>
//                   </td>
//                   <td className="p-2 whitespace-nowrap">
//                     <div className="text-xl font-bold text-center">1.2 ETH</div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };