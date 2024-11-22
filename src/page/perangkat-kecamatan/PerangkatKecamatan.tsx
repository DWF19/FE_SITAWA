import NavKecamatanComp from "../../components/perangkatKecamatanComp/NavKecamatanComp";
import FormHasilProduksi from "../../components/perangkatKecamatanComp/FormHasilProduksi";
import { globalState } from "../../GlobalContext";
import PopUpProduction from "../../components/perangkatKecamatanComp/PopUpProduction";
import NavKec from "../../components/perangkatKecamatanComp/NavKec";
import ExitPopup from "../../components/SuperAdminComponents/ExitPopUp";
const PerangkatKecamatan = () => {
  const {state} = globalState()
  
  return (
    <div className="relative">
        <div
        className={` w-full h-[100vh] absolute   ${
          state.productionToggle ? "bg-black opacity-50 z-20" : ""
        }`}
      ></div>
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
      <NavKec/>
      <div className="relative ">
      <div
          className={`${
            state.productionToggle ? "" : "hidden"
          }`}
        >
          <PopUpProduction/>
        </div>
     
        <div className="flex overflow-y-hidden">
          <NavKecamatanComp bg={"bg-custom-gradient"} />
          <div className="h-[100vh] overflow-auto relative w-full  pt-36 flex justify-center scrollbar-hide ">
            <div className={`w-full h-full absolute flex justify-center items-center ${state.loadingProduksi ? "block" : "hidden"}`}>
              <div className="loader-produksi"></div>
            </div>
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
                    Kecamatan
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mt-6 ">
                  <h3 className="font-bold text-[16px]">
                    Hasil Produksi
                  </h3>
                  <div className="flex items-center">
                    <span className="text-[red]">*</span>
                    <p className="text-[12px]">Jika field kosong silahkan inputkan 0</p>
                  </div>
                </div>
                <FormHasilProduksi />
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

export default PerangkatKecamatan;
