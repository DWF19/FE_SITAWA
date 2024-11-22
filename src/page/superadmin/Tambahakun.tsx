
import { useEffect } from "react";
import Navbar from "../../components/SuperAdminComponents/Navbar";
import PerangkatSidebar from "../../components/sidebarComponents/PerangkatSidebar";
import TambahhAkunPopUp from "../../components/SuperAdminComponents/TambahAkunPopUp";
import TambahAkunComp from "../../components/SuperAdminComponents/TambahAkunComp";
import { globalState } from "../../GlobalContext";

const Tambahakun = () => {
  const {state}= globalState()
  
  return (
    <div className="relative">
      <div className={`w-full h-[100vh] absolute opacity-50 bg-black z-20 ${
          state.registToggle ? "block" : "hidden"
        }`}></div>
        <div
        className={`w-full h-full absolute ${
          state.toggle ? "z-20" : ""
        }`}
      ></div>
      <div className={state.registToggle ? "block" : "hidden"}>
          <TambahhAkunPopUp />
        </div>
      <Navbar />
      <div className="relative ">
        
        <div className="flex overflow-y-hidden">
          <PerangkatSidebar bg={"bg-custom-gradient"} />
          <div className="h-[100vh] overflow-auto   w-full  pt-36 flex justify-center scrollbar-hide">
            <div className=" w-[85%]">
              <div className="flex justify-between text-[12px] font-bold text-[#858585]">
                <div className="flex ">
                  <p className="border-r-[1px] border-[#858585] pr-2">Admin</p>
                  <p className="border-x-[1px] border-[#858585] px-2">
                    Perangkat Kecamatan
                  </p>
                  <p className="border-l-[1px] border-[#858585] pl-2">
                    Tambah Akun
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
              <TambahAkunComp />
              <div className="pb-10"></div>
            </div>
          </div>
        </div>
        <div className="tabel-pengaduan "></div>
      </div>
    </div>
  );
};

export default Tambahakun;
