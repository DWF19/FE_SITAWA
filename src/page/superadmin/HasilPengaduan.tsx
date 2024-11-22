import Navbar from "../../components/SuperAdminComponents/Navbar";
import PengaduanSidebar from "../../components/sidebarComponents/PengaduanSidebar";

import BalasPengaduan from "../../components/SuperAdminComponents/BalasPengaduan";
import ExitPopup from "../../components/SuperAdminComponents/ExitPopUp";
import { globalState } from "../../GlobalContext";




const HasilPengaduan = () => {
  const { state } = globalState();

  return (
    <div className="">
       <div
        className={` w-full h-[100vh] absolute   ${
          state.actionLogOut ? "bg-black opacity-50 z-20" : ""
        }`}
      ></div>
      <div
        className={`w-full h-full absolute ${
          state.toggle ? "z-20" : ""
        }`}
      ></div>
        <div className="">
          <ExitPopup />
        </div>
      <Navbar />
      <div className="relative ">
        <div className="flex overflow-y-hidden">
          <PengaduanSidebar bg={"bg-custom-gradient"} />
          <div className="h-[100vh] overflow-auto   w-full  pt-36 flex justify-center scrollbar-hide">
            <div className=" w-[85%]">
              <div className="flex justify-between text-[12px] font-bold text-[#858585]">
                <div className="flex ">
                  <p className="border-r-[1px] border-[#858585] pr-2">Admin</p>
                  <p className="border-x-[1px] border-[#858585] px-2">
                    Perangkat Desa
                  </p>
                  <p className="border-l-[1px] border-[#858585] pl-2">
                    Detail Pengaduan
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
              <div>
                <h3 className="font-bold text-[16px] mt-6">
                  Pengaduan Masyarakat
                </h3>
              </div>

              <BalasPengaduan />
              <div className="pb-10"></div>
            </div>
          </div>
        </div>
        <div className="tabel-pengaduan "></div>
      </div>
    </div>
  );
};

export default HasilPengaduan;
