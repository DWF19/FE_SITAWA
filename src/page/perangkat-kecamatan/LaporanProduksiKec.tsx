import React from 'react'
import NavKec from '../../components/perangkatKecamatanComp/NavKec';
import NavKecamatanComp from '../../components/perangkatKecamatanComp/NavKecamatanComp';
import LaporanProduksiKecComp from '../../components/perangkatKecamatanComp/LaporanProduksiKecComp';
import ExitPopup from '../../components/SuperAdminComponents/ExitPopUp';
import { globalState } from '../../GlobalContext';

const LaporanProduksiKec = () => {
  const { state } = globalState();
    return (
        <div>
          <div
        className={` w-full h-[100vh] absolute   ${
          state.actionLogOut ? "bg-black opacity-50 z-20" : "hidden"
        }`}
      ></div>
        <div className="">
          <ExitPopup />
        </div>
          <NavKec />
    
          <div className="relative ">
            <div className="flex overflow-y-hidden">
            <NavKecamatanComp bg={"bg-custom-gradient"} />
              <div className="h-[100vh] overflow-auto   w-full  pt-36 flex justify-center scrollbar-hide">
                <div className=" w-[85%]">
                  <div className="flex justify-between text-[12px] font-bold text-[#858585]">
                    <div className="flex ">
                      <p className="border-r-[1px] border-[#858585] pr-2">Perangkat Kecamatan</p>
                      <p className="border-x-[1px] border-[#858585] pl-2 pr-2">
                        Hasil produksi
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
                   <LaporanProduksiKecComp/>
                  </div>
                  <div className="pb-10"></div>
                </div>
              </div>
            </div>
            <div className="tabel-pengaduan "></div>
          </div>
        </div>
      );
}

export default LaporanProduksiKec