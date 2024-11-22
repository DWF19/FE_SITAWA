import React from "react";
import NavKecamatanComp from "../../components/perangkatKecamatanComp/NavKecamatanComp";
import NavKec from "../../components/perangkatKecamatanComp/NavKec";
import PopUpProduction from "../../components/perangkatKecamatanComp/PopUpProduction";
import { globalState } from "../../GlobalContext";
import EditAkunKecamatan from "../superadmin/EditAkunKecamatan";
import EditAkunKecamatanComp from "../../components/perangkatKecamatanComp/EditAkunKecamatanComp";
import ExitPopup from "../../components/SuperAdminComponents/ExitPopUp";

const EditProfilKecamatan = () => {
  const { state } = globalState();
  return (
    <div className="relative">
      <div
        className={` w-full h-[100vh] absolute   ${
          state.actionLogOut ? "bg-black opacity-50 z-20" : ""
        }`}
      ></div>
      <div
        className={` w-full h-[100vh] absolute   ${
          state.toggle ? "z-20" : ""
        }`}
      ></div>
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
                  <p className="border-x-[1px] border-[#858585] px-2">
                    Beranda
                  </p>
                  <p className="border-l-[1px] border-[#858585] pl-2">
                    Edit Profile
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
                  <h3 className="font-bold text-[16px]">Edit Profile</h3>
                </div>
                <EditAkunKecamatanComp />
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

export default EditProfilKecamatan;
