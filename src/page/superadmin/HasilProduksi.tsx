import {useEffect, useRef, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Navbar from "../../components/SuperAdminComponents/Navbar";
import HasilProduksiSidebar from "../../components/sidebarComponents/HasilProduksiSidebar";
import { year } from "../../data/data";
import { useNavigate } from "react-router-dom";
import { useFetchProduksi } from "../../features/produksi/useFetchProduksi";
import { fullMonths } from "../../data/dataType";
import ExitPopup from "../../components/SuperAdminComponents/ExitPopUp";
import { globalState } from "../../GlobalContext";

const HasilProduksi = () => {
  const {state} = globalState()
  const [showYear, setShowYear] = useState<boolean>(false);

  const { filteredProduction, isLoading, setSearchInput } = useFetchProduksi();
 const [yearChoiceed, setYearChoiceed] = useState<string>("2024");
  const mappedData = fullMonths.map((month) => {

  const dataItems = filteredProduction.filter(
    (item) => item.bulan === month.name
  );
  const totalPendapatan = dataItems.reduce((acc, item) => {
    return acc + (Number(item.jumlah_padi_akhir_bulan) || 0);
  }, 0);

  return {
    name: month.name,
    pendapatan: totalPendapatan, 
  };
});

  const choiseYear = (year: string) => {
    setShowYear(!showYear);
    setYearChoiceed(year);
    setSearchInput(year);
  };
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShowYear(false);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if(yearChoiceed === "2024"){
      setSearchInput("2024")
    }
    console.log(mappedData);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
       <div
        className={` w-full h-[100vh] absolute   ${
          state.actionLogOut ? "bg-black opacity-50 z-20" : ""
        }`}
      ></div>
        <div className="">
          <ExitPopup />
        </div>
      <Navbar />

      <div className="relative ">
        <div className="flex overflow-y-hidden">
          <HasilProduksiSidebar bg={"bg-custom-gradient"} />
          <div className="h-[100vh] overflow-auto   w-full  pt-36 flex justify-center scrollbar-hide">
            <div className=" w-[85%]">
              <div className="flex justify-between text-[12px] font-bold text-[#858585]">
                <div className="flex ">
                  <p className="border-r-[1px] border-[#858585] pr-2">Admin</p>
                  <p className="border-l-[1px] border-[#858585] pl-2">
                    Hasil Produksi
                  </p>
                </div>
                <div className="flex">
                  <p className="border-r-[1px] border-[#858585] pr-2">
                    Accounts
                  </p>
                  <p className="border-l-[1px] border-[#858585] pl-2">
                    {sessionStorage.getItem("name")}
                  </p>
                </div>
              </div>
              <div className="w-full ">
                <div>
                  <div className="flex justify-between items-center mt-6">
                    <h3 className="font-bold text-[16px]">Hasil Produksi</h3>
                    <div className="  relative">
                      <button
                        onClick={() => setShowYear(!showYear)}
                        type="button"
                        className="w-[100px] h-[42px]  rounded-full bg-custom-gradient flex items-center justify-center gap-3"
                      >
                        <span>
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16 18H2V7H16M13 0V2H5V0H3V2H2C0.89 2 0 2.89 0 4V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H16C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18V4C18 3.46957 17.7893 2.96086 17.4142 2.58579C17.0391 2.21071 16.5304 2 16 2H15V0M14 11H9V16H14V11Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                        <p className="text-[10px] text-white">Filter</p>
                      </button>
                      <div
                        ref={ref}
                        className={`mt-12 absolute top-0 right-0 mr-1 bg-white z-[999999] ${
                          showYear ? "block" : "hidden"
                        }`}
                      >
                        <div className="scrollbar-hide max-w-24 h-40 border rounded-lg overflow-auto">
                          {year.map((data, index) => {
                            return (
                              <div
                                onClick={() => choiseYear(data.year)}
                                key={index}
                                className={`group w-24 h-8 border-b flex justify-center items-center text-[12px] cursor-pointer hover:bg-custom-gradient ${
                                  index === year.length - 1 ? "border-none" : ""
                                }`}
                              >
                                <p className="group-hover:text-white">
                                  {data.year}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-ful flex justify-center mt-10">
                    {isLoading && (
                      <div
                        className={`flex justify-center items-center w-full h-[50vh] mt-10 `}
                      >
                        <div className="loader-pengaduan"></div>
                      </div>
                    )}
                    {!isLoading && (
                      <div className="py-7 mt-7 w-full border border-[#F0F0F0] shadow-md rounded-xl  mb-10">
                        <div className="flex justify-between  h-10 items-center mx-10 my-">
                          <p className="font-bold">
                            Statistik Panen Kabupaten Sumbawa
                          </p>
                          <div className="flex gap-2">
                            <p>{yearChoiceed}</p>
                            <span>
                              <svg
                                width="18"
                                height="20"
                                viewBox="0 0 18 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16 18H2V7H16M13 0V2H5V0H3V2H2C0.89 2 0 2.89 0 4V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H16C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18V4C18 3.46957 17.7893 2.96086 17.4142 2.58579C17.0391 2.21071 16.5304 2 16 2H15V0M14 11H9V16H14V11Z"
                                  fill="black"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        <div className="bar-chart ">
                          <div className="h-[28rem] px-4 rounded-sm  flex flex-col flex-1">
                            <div className=" w-full flex-1 text-xs ">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  width={500}
                                  height={300}
                                  data={mappedData}
                                  margin={{
                                    top: 20,
                                    right: 10,
                                    left: -10,
                                    bottom: 0,
                                  }}
                                  barSize={30} // Adjust the bar size
                                >
                                  <defs>
                                    <linearGradient
                                      id="gradient1"
                                      x1="0"
                                      y1="0"
                                      x2="1"
                                      y2="1"
                                    >
                                      <stop offset="0%" stopColor="#9BEC00" />
                                      <stop offset="100%" stopColor="#06D001" />
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid
                                    strokeDasharray="3 3 0 0"
                                    vertical={false}
                                  />
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />

                                  <Bar
                                    dataKey="pendapatan"
                                    fill="url(#gradient1)"
                                    radius={[50, 50, 0, 0]}
                                  />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                        
                        <div className="w-full flex justify-center items-center mt-10 ">
                          <button
                            onClick={() =>
                              navigate("/hasil-produksi/list-produksi")
                            }
                            className="bg-custom-gradient px-7 py-2 rounded-full text-white"
                          >
                            Lainnya
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="pb-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HasilProduksi;
