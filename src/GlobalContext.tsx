import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

import { formProduksi, State } from "./data/dataType";
interface GlobalContextType {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
  stateFormProduksi: formProduksi;
  setStateFormProduksi: Dispatch<SetStateAction<formProduksi>>;
}
export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);
interface GlobalProviderProps {
  children: ReactNode;
}
export const globalState = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    console.log(Error);
    throw new Error("globalState must be used within a GlobalProvider");
  }
  return context;
};
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [state, setState] = useState<State>({
    actionHapusPengaduan: false,
    actionHapusPerangkat: false,
    yearChoiceed: "",
    actionLogOut: false,
    actionAddData: false,
    getId: undefined,
    getProductionId: undefined,
    path: "",
    loadingProduksi: false,
    dataReplies: [],
    dataComplaints: [],
    latitude: "",
    longitude: "",
    loading: false,
    loginToggle: false,
    registToggle: false,
    productionToggle: false,
    toggle: false,
    actionHapusProduksi:false
  });

  const [stateFormProduksi, setStateFormProduksi] = useState<formProduksi>({
    user_id:undefined,
    kecamatan: "",
    bulan: "",
    tahun: "",
    //
    jmlh_pd_tanaman_akhir_bln_lalu: undefined,
    jmlh_pd_panen: undefined,
    jmlh_pd_tanam: undefined,
    jmlh_pd_rusak: undefined,
    jmlh_pd_panen_akhir_bln_lap: undefined,
    // Hibrida - Bantuan Pemerintah //
    hbp_tanaman_akhir_bulan_lalu: undefined,
    hbp_panen: undefined,
    hbp_tanam: undefined,
    hbp_rusak: undefined,
    hbp_panen_akhir_bulan_lap: undefined,
    // Hibrida - Bantuan Pemerintah //
    // Hibrida - Non Bantuan Pemerintah //
    hnbp_tanaman_akhir_bulan_lalu: undefined,
    hnbp_panen: undefined,
    hnbp_tanam: undefined,
    hnbp_rusak: undefined,
    hnbp_panen_akhir_bulan_lap: undefined,
    // Hibrida - Non Bantuan Pemerintah //
    // Inbrida - Bantuan Pemerintah //
    ibp_tanaman_akhir_bulan_lalu: undefined,
    ibp_panen: undefined,
    ibp_tanam: undefined,
    ibp_rusak: undefined,
    ibp_panen_akhir_bulan_lap: undefined,
    // Inbrida - Bantuan Pemerintah //
    // Inbrida - Non Bantuan Pemerintah //
    inbp_tanaman_akhir_bulan_lalu: undefined,
    inbp_panen: undefined,
    inbp_tanam: undefined,
    inbp_rusak: undefined,
    inbp_panen_akhir_bulan_lap: undefined,
    // Inbrida - Non Bantuan Pemerintah //
    // Sawah Irigasi //
    si_tanaman_akhir_bulan_lalu: undefined,
    si_panen: undefined,
    si_tanam: undefined,
    si_rusak: undefined,
    si_panen_akhir_bulan_lap: undefined,
    // Sawah Irigasi //
    // Sawah Tadah Hujan //
    st_hujan_tanaman_akhir_bulan_lalu: undefined,
    st_hujan_panen: undefined,
    st_hujan_tanam: undefined,
    st_hujan_rusak: undefined,
    st_hujan_panen_akhir_bulan_lap: undefined,
    // sawah rawa pasang surut //
    srps_tanaman_akhir_bulan_lalu: undefined,
    srps_panen: undefined,
    srps_tanam: undefined,
    srps_rusak: undefined,
    srps_panen_akhir_bulan_lap: undefined,
    // sawah rawa pasang surut //
    // sawah rawa lebak //
    srl_tanaman_akhir_bulan_lalu: undefined,
    srl_panen: undefined,
    srl_tanam: undefined,
    srl_rusak: undefined,
    srl_panen_akhir_bulan_lap: undefined,
    // sawah rawa lebak //
  });
 

  return (
    <GlobalContext.Provider
      value={{ state, setState, stateFormProduksi, setStateFormProduksi }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
