import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useFetchProduksi } from "../../features/produksi/useFetchProduksi";
import { fullMonths } from "../../data/dataType";
import { useNavigate } from "react-router-dom";

export default function StatistikPanen() {
  const navigate = useNavigate();
  const { filteredProduction, isLoading, setSearchInput } = useFetchProduksi();
  const [yearChoiceed] = useState<string>("2024");

  const mappedData = fullMonths.map((month) => {
    const dataItem = filteredProduction.find(
      (item) => item.bulan === month.name
    );
    return {
      name: month.name,
      pendapatan: dataItem ? Number(dataItem.jumlah_padi_akhir_bulan) || 0 : 0,
    };
  });
  useEffect(() => {
    setSearchInput("2024");
  }, []);
  return (
    <div className="pb-10">
      <h1 className="mt-5 font-bold text-[16px]">Hasil Produksi</h1>
      <div className=" mt-7 w-full border border-[#F0F0F0] shadow-md rounded-xl  mb-10">
        <div className="flex justify-between my-5 items-center mx-10">
          <p className="font-bold">Statistik Panen Kabupaten Sumbawa</p>
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
              {!isLoading && (
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
                    <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
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
              )}
              {isLoading && <div className="w-full h-full bg-slate-200 animate-shimmer bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 bg-[length:400%_100%]"></div>}
            </div>
          </div>
        </div>
        
        <div className={`w-full flex justify-center items-center my-10 ${isLoading ? "invisible" : ""}`}>
          <button onClick={()=>navigate('/hasil-produksi')} className="bg-custom-gradient text-white px-5 py-1 rounded-md">
            Selengkapnya
          </button>
        </div>
      </div>
    </div>
  );
}
