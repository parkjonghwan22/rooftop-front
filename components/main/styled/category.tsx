import tw from "tailwind-styled-components";
import Image from "next/image";

const Category = () => {
  return (
    <>
      <div className="mx-auto w-full h-650 mt-10">
        <div className="shadow-lg rounded-sm  border-gray-200">
          <header className=" border-b border-gray-100">
            <div className="flex bg-gray-200 opacity-90 w-1/6 rounded-lg justify-center text-center">
              <h2 className="font-semibold text-2xl w-1/2 px-2 py-1">
                Trending
              </h2>
              <h2 className="font-semibold  text-2xl w-1/2 px-2 py-1">Top</h2>
            </div>
          </header>
          <div className="flex ">
            <table className="w-full">
              <thead className="text-xm font-semibold uppercase text-gray-400">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">#</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Collection</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Floor price</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Volume</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="cursor-pointer">
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-xl font-bold">1</div>
                      <div className="w-24 h-24">
                        <Image
                          src="http://localhost:3000/test.png"
                          alt="test"
                          width={1000}
                          height={1000}
                          className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold">Space Cat</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold ">0.01 ETH</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-xl font-bold text-center">1.2 ETH</div>
                  </td>
                </tr>
                <tr className="cursor-pointer">
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-xl font-bold">2</div>
                      <div className="w-24 h-24">
                        <Image
                          src="http://localhost:3000/test2.png"
                          alt="test"
                          width={1000}
                          height={1000}
                          className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold">Space Cat</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold ">0.01 ETH</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-xl font-bold text-center">1.2 ETH</div>
                  </td>
                </tr>
                <tr className="cursor-pointer">
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-xl font-bold">3</div>
                      <div className="w-24 h-24">
                        <Image
                          src="http://localhost:3000/test3.png"
                          alt="test"
                          width={1000}
                          height={1000}
                          className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold">Space Cat</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold ">0.01 ETH</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-xl font-bold text-center">1.2 ETH</div>
                  </td>
                </tr>
                <tr className="cursor-pointer">
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-xl font-bold">4</div>
                      <div className="w-24 h-24">
                        <Image
                          src="http://localhost:3000/test.png"
                          alt="test"
                          width={1000}
                          height={1000}
                          className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold">Space Cat</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold ">0.01 ETH</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-xl font-bold text-center">1.2 ETH</div>
                  </td>
                </tr>
                <tr className="cursor-pointer">
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-xl font-bold">5</div>
                      <div className="w-24 h-24">
                        <Image
                          src="http://localhost:3000/test2.png"
                          alt="test"
                          width={1000}
                          height={1000}
                          className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold">Space Cat</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold ">0.01 ETH</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-xl font-bold text-center">1.2 ETH</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="md:w-full md:visible w-0 invisible  ">
              <thead className="text-xm font-semibold uppercase text-gray-400 ">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">#</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Collection</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left">Floor price</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Volume</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="cursor-pointer">
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-xl font-bold">4</div>
                      <div className="w-24 h-24">
                        <Image
                          src="http://localhost:3000/test5.png"
                          alt="test"
                          width={1000}
                          height={1000}
                          className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold">Space Cat</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold ">0.01 ETH</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-xl font-bold text-center">1.2 ETH</div>
                  </td>
                </tr>
                <tr className="cursor-pointer">
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-xl font-bold">5</div>
                      <div className="w-24 h-24">
                        <Image
                          src="http://localhost:3000/test6.png"
                          alt="test"
                          width={1000}
                          height={1000}
                          className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold">Space Cat</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold ">0.01 ETH</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-xl font-bold text-center">1.2 ETH</div>
                  </td>
                </tr>
                <tr className="cursor-pointer">
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-xl font-bold">6</div>
                      <div className="w-24 h-24">
                        <Image
                          src="http://localhost:3000/test7.png"
                          alt="test"
                          width={1000}
                          height={1000}
                          className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold">Space Cat</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold ">0.01 ETH</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-xl font-bold text-center">1.2 ETH</div>
                  </td>
                </tr>
                <tr className="cursor-pointer">
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-xl font-bold">7</div>
                      <div className="w-24 h-24">
                        <Image
                          src="http://localhost:3000/test8.png"
                          alt="test"
                          width={1000}
                          height={1000}
                          className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold">Space Cat</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold ">0.01 ETH</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-xl font-bold text-center">1.2 ETH</div>
                  </td>
                </tr>
                <tr className="cursor-pointer">
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-xl font-bold">8</div>
                      <div className="w-24 h-24">
                        <Image
                          src="http://localhost:3000/test5.png"
                          alt="test"
                          width={1000}
                          height={1000}
                          className="object-fill w-24 h-24 border-2 ml-10 rounded-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold">Space Cat</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left text-xl font-bold ">0.01 ETH</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-xl font-bold text-center">1.2 ETH</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
