
import {globalState } from "../../GlobalContext";
import PerangkatSidebar from "../../components/sidebarComponents/PerangkatSidebar";

import Navbar from "../../components/SuperAdminComponents/Navbar";
import PopUpPerangkat from "../../components/SuperAdminComponents/PopUpPerangkat";
import ComponentPerangkat from "../../components/SuperAdminComponents/ComponentPerangkat";
import ExitPopup from "../../components/SuperAdminComponents/ExitPopUp";

const PerangkatDesa = () => {
  const { state } = globalState();
  return (
    <div className="relative">
      <div
        className={` w-full h-[100vh] absolute   ${
          state.actionHapusPerangkat ? "bg-black opacity-50 z-20" : ""
        }`}
      ></div>
      <div className="">
        <PopUpPerangkat />
      </div>
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
          <PerangkatSidebar bg={"bg-custom-gradient"} />
          <div className="h-[100vh] overflow-auto   w-full  pt-36 flex justify-center scrollbar-hide">
            <div className=" w-[85%]">
              <div className="flex justify-between text-[12px] font-bold text-[#858585]">
                <div className="flex ">
                  <p className="border-r-[1px] border-[#858585] pr-2">Admin</p>
                  <p className="border-l-[1px] border-[#858585] pl-2">
                    Perangkat Kecamatan
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
              <ComponentPerangkat />
              <div className="pb-10"></div>
            </div>
          </div>
        </div>
        <div className="tabel-pengaduan "></div>
      </div>
    </div>
  );
};

export default PerangkatDesa;
