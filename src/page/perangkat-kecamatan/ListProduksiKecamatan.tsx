import React, { useEffect } from "react";
import Navbar from "../../components/SuperAdminComponents/Navbar";
import PopUpProduction from "../../components/perangkatKecamatanComp/PopUpProduction";
import NavKecamatanComp from "../../components/perangkatKecamatanComp/NavKecamatanComp";
import { globalState } from "../../GlobalContext";
import ListProduksiComp from "../../components/perangkatKecamatanComp/ListProduksiComp";

import { useFetchForKecamatan } from "../../features/produksi/useFetchForKecamatan";
import { useNavigate } from "react-router-dom";
import NavKec from "../../components/perangkatKecamatanComp/NavKec";
import ExitPopup from "../../components/SuperAdminComponents/ExitPopUp";
import DeleteProduksiPopUp from "../../components/perangkatKecamatanComp/DeleteProduksiPopUp";
import { useFetchUser } from "../../features/user/useFetchUser";

const ListProduksiKecamatan = () => {
  const navigate = useNavigate();
  const { filteredProduction, isLoading, setSearchInput } =
    useFetchForKecamatan();
  const { state } = globalState();
  useEffect(() => {
    setSearchInput(`${sessionStorage.getItem("id")}`);
   
  }, [filteredProduction]);
  return (
    <div className="relative">
      <div
        className={` w-full h-[100vh] absolute   ${
          state.actionLogOut ? "bg-black opacity-50 z-20" : ""
        }`}
      ></div>
      <div
        className={` w-full h-[100vh] absolute   ${
          state.actionHapusProduksi ? "bg-black opacity-50 z-20" : ""
        }`}
      ></div>
      <div className="">
        <DeleteProduksiPopUp />
      </div>
      <div className="">
        <ExitPopup />
      </div>
      <NavKec />
      <div className="relative ">
        <div className={`${state.productionToggle ? "" : "hidden"}`}>
          <PopUpProduction />
        </div>

        <div className="flex overflow-y-hidden">
          <NavKecamatanComp bg={"bg-custom-gradient"} />
          <div className="h-[100vh] overflow-auto relative w-full  pt-36 flex justify-center scrollbar-hide ">
            <div
              className={`w-full h-full absolute flex justify-center items-center ${
                state.loadingProduksi ? "block" : "hidden"
              }`}
            >
              <div className="loader-produksi"></div>
            </div>
            <div className=" w-[85%]">
              <div className="flex justify-between text-[12px] font-bold text-[#858585]">
                <div className="flex ">
                  <p className="border-r-[1px] border-[#858585] pr-2">
                    Perangkat Kecamatan
                  </p>
                  <p className="border-l-[1px] border-[#858585] pl-2">
                    Beranda
                  </p>
                </div>
                <div className="flex">
                  <p className="border-r-[1px] border-[#858585] pr-2">
                    Accounts
                  </p>
                  <p className="border-l-[1px] border-[#858585] pl-2">
                    Kecamatan
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mt-6 ">
                  <h3 className="font-bold text-[16px]">Hasil Produksi</h3>
                  <div
                    onClick={() => navigate("/buat-produksi")}
                    className="flex items-center justify-center bg-custom-gradient gap-2 py-2 px-3 rounded-md cursor-pointer"
                  >
                    <span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.29412 8.82353V7.64706H13.5294V8.82353H5.29412ZM5.29412 12.3529V11.1765H13.5294V12.3529H5.29412ZM5.29412 15.8824V14.7059H13.5294V15.8824H5.29412ZM16.4706 5.88235V3.52941H14.1176V2.35294H16.4706V0H17.6471V2.35294H20V3.52941H17.6471V5.88235H16.4706ZM0 20V1.17647H12.8506V2.35294H1.17647V18.8235H17.6471V7.14941H18.8235V20H0Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <p className="text-[12px] text-white">Buat Laporan</p>
                  </div>
                </div>
                <ListProduksiComp
                  filteredProduction={filteredProduction}
                  isLoading={isLoading}
                />
              </div>
              <div className="pb-10"></div>
            </div>
          </div>
        </div>
        <div className="tabel-pengaduan "></div>
      </div>
    </div>
  );
};

export default ListProduksiKecamatan;
