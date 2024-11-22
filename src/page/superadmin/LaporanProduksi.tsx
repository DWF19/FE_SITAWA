import { useContext, useEffect, useRef, useState } from "react";
import PopUp from "../../components/SuperAdminComponents/PopUp";
import { GlobalContext, globalState } from "../../GlobalContext";
import Navbar from "../../components/SuperAdminComponents/Navbar";
import HasilProduksiSidebar from "../../components/sidebarComponents/HasilProduksiSidebar";
import { year } from "../../data/data";
import TabelProduksi from "../../components/SuperAdminComponents/TabelProduksi";
import LaporanProduksiComp from "../../components/SuperAdminComponents/LaporanProduksiComp";
import ExitPopup from "../../components/SuperAdminComponents/ExitPopUp";

const LaporanProduksi = () => {
  const [showYear, setShowYear] = useState<boolean>(false);

  const context = useContext(GlobalContext);
  if (!context) {
    console.error("Global context not found");
    return; 
  }
  const { state, setState } = globalState();

  const choiseYear = (year: string) => {
    setShowYear(!showYear);
    setState((prevState) => {
      return {
        ...prevState,
        yearChoiceed: year,
      };
    });
    console.log(state.yearChoiceed);
  };
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShowYear(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  return (
    <div>
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
                  <p className="border-x-[1px] border-[#858585] pl-2 pr-2">
                    Hasil produksi
                  </p>
                  <p className="border-x-[1px] border-[#858585] px-2">
                    List hasil produksi
                  </p>
                  <p className="border-l-[1px] border-[#858585] pl-2">
                    Laporan
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
                <div className="flex justify-between items-center my-10 ">
                  <h3 className="font-bold text-[16px]">Hasil Produksi</h3>
                  
                </div>
               <LaporanProduksiComp/>
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

export default LaporanProduksi;
