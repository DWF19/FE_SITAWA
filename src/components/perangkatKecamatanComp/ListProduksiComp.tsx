import React, { useEffect, useRef, useState } from "react";
import { formProduksi } from "../../data/dataType";
import { useNavigate } from "react-router-dom";
import { useFetchUser } from "../../features/user/useFetchUser";
import { useDeleteProduksi } from "../../features/produksi/useDeleteProduksi";
import { globalState } from "../../GlobalContext";
interface DataProduksiProps {
  filteredProduction: formProduksi[];
  isLoading: boolean;
}
const ListProduksiComp: React.FC<DataProduksiProps> = ({
  filteredProduction,
  isLoading,
}) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { filteredUsers } = useFetchUser();
  const { setState } = globalState();

  const deleteHandler = (id: number) => {
    console.log(id);
    
    setState((prevState) => {
      return {
        ...prevState,
        actionHapusProduksi: !prevState.actionHapusProduksi,
        getId: Number(id),
      };
    });
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setClickedIndex(null);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    
    <div className="relative">
     
      {isLoading && (
        <div
          className={`flex justify-center items-center w-full h-[50vh] mt-10 `}
        >
          <div className="loader-pengaduan"></div>
        </div>
      )}
      {!isLoading && (
        <div className="border rounded-lg border-[#F0F0F0] mt-10">
          <div className="">
            <div className="bg-white shadow-md rounded-lg overflow-hidden py-3">
              <table className="min-w-full">
                <thead className="">
                  <tr>
                    <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Nama Desa
                    </th>
                    <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Bulan
                    </th>
                    <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Tahun
                    </th>
                    <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                {filteredProduction.map((item, index) => {
                  return (
                    <tbody className="border-y border-[#F0F0F0]">
                      <tr className="" key={index}>
                        <td className="text-center px-4 py-2 whitespace-nowrap text-xs  text-gray-500 ">
                          {item.kecamatan}
                        </td>

                        <td className="text-center px-4 py-2 whitespace-nowrap text-xs text-gray-500 ">
                          {filteredUsers.map((user) =>
                            user.id === item.user_id ? user.email : ""
                          )}
                        </td>
                        <td className="text-center px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                          {item.bulan}
                        </td>
                        <td className="text-center px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                          {item.tahun}
                        </td>

                        <td className="text-center px-4 py-2 whitespace-nowrap text-xs font-medium">
                          <div className="relative inline-block text-left">
                            <button
                              onClick={() => setClickedIndex(index)}
                              type="button"
                            >
                              <span>
                                <svg
                                  width="20px"
                                  height="20px"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z"
                                    fill="#1C274C"
                                  />
                                  <path
                                    d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                                    fill="#1C274C"
                                  />
                                  <path
                                    opacity="0.5"
                                    d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                                    fill="#1C274C"
                                  />
                                </svg>
                              </span>
                            </button>
                            {clickedIndex == index && (
                              <div
                                ref={ref}
                                className="origin-top-right absolute right-full  w-[63px] h-[55px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                <button
                                  onClick={() =>
                                    navigate(`/laporan-produksi/${item.id}`)
                                  }
                                  className="text-white block h-1/2 bg-custom-gradient w-full rounded-t-md"
                                >
                                  Lihat
                                </button>
                                <button
                                  onClick={() =>
                                    deleteHandler(item.id ? item.id : 0)
                                  }
                                  className="block h-1/2 w-full"
                                >
                                  Hapus
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
              <p className="py-4 ml-14 text-xs font-bold">
                {filteredProduction.length} Laporan Hasil Produksi
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProduksiComp;
