import { formProduksi } from "../../data/dataType";

export const next1 = (
  stateFormProduksi: formProduksi,
  setStateFormProduksi: (
    updater: (prevState: formProduksi) => formProduksi
  ) => void
): boolean => {
  const updateState = (stateKey: keyof formProduksi, value: any) => {
    setStateFormProduksi((prevState) => ({
      ...prevState,
      [stateKey]: value,
    }));
  };
  let allFilled = false;

  if (
    stateFormProduksi.jmlh_pd_tanaman_akhir_bln_lalu &&
    stateFormProduksi.jmlh_pd_panen &&
    stateFormProduksi.jmlh_pd_tanam &&
    stateFormProduksi.jmlh_pd_rusak 
   
  ) {
    // Update nilai pada index 4
    const result =
      Number(stateFormProduksi.jmlh_pd_tanaman_akhir_bln_lalu) -
      Number(stateFormProduksi.jmlh_pd_panen) +
      Number(stateFormProduksi.jmlh_pd_tanam) -
      Number(stateFormProduksi.jmlh_pd_rusak);
    updateState("jmlh_pd_panen_akhir_bln_lap", result.toString());
    allFilled = true;
  } else {
    updateState("jmlh_pd_panen_akhir_bln_lap", "0");
  }
  return allFilled;
};
export const next2 = (
  stateFormProduksi: formProduksi,
  setStateFormProduksi: (
    updater: (prevState: formProduksi) => formProduksi
  ) => void
): boolean => {
  const updateState = (stateKey: keyof formProduksi, value: any) => {
    setStateFormProduksi((prevState) => ({
      ...prevState,
      [stateKey]: value,
    }));
  };
  let allFilledHbp = false;
  let allFieldHnbp = false;

  if (
    stateFormProduksi.hbp_tanaman_akhir_bulan_lalu &&
    stateFormProduksi.hbp_panen &&
    stateFormProduksi.hbp_tanam &&
    stateFormProduksi.hbp_rusak &&
    stateFormProduksi.kecamatan &&
    stateFormProduksi.bulan &&
    stateFormProduksi.tahun 
  ) {
    // Update nilai pada index 4
    const result =
      Number(stateFormProduksi.hbp_tanaman_akhir_bulan_lalu) -
      Number(stateFormProduksi.hbp_panen) +
      Number(stateFormProduksi.hbp_tanam) -
      Number(stateFormProduksi.hbp_rusak);
    updateState("hbp_panen_akhir_bulan_lap", result.toString());
    allFilledHbp = true;
  } else {
    updateState("hbp_panen_akhir_bulan_lap", "0");
  }
  if (
    stateFormProduksi.hnbp_tanaman_akhir_bulan_lalu &&
    stateFormProduksi.hnbp_panen &&
    stateFormProduksi.hnbp_tanam &&
    stateFormProduksi.hnbp_rusak
  ) {
    const result =
      Number(stateFormProduksi.hnbp_tanaman_akhir_bulan_lalu) -
      Number(stateFormProduksi.hnbp_panen) +
      Number(stateFormProduksi.hnbp_tanam) -
      Number(stateFormProduksi.hnbp_rusak);
    updateState("hnbp_panen_akhir_bulan_lap", result.toString());
    allFieldHnbp = true;
  } else {
    updateState("hnbp_panen_akhir_bulan_lap", "0");
  }
  return allFilledHbp && allFieldHnbp;
};
export const next3 = (
  stateFormProduksi: formProduksi,
  setStateFormProduksi: (
    updater: (prevState: formProduksi) => formProduksi
  ) => void
): boolean => {
  const updateState = (stateKey: keyof formProduksi, value: any) => {
    setStateFormProduksi((prevState) => ({
      ...prevState,
      [stateKey]: value,
    }));
  };
  let allFilledIbp = false;
  let allFieldInbp = false;

  if (
    stateFormProduksi.ibp_tanaman_akhir_bulan_lalu &&
    stateFormProduksi.ibp_panen &&
    stateFormProduksi.ibp_tanam &&
    stateFormProduksi.ibp_rusak
  ) {
    // Update nilai pada index 4
    const result =
      Number(stateFormProduksi.ibp_tanaman_akhir_bulan_lalu) -
      Number(stateFormProduksi.ibp_panen) +
      Number(stateFormProduksi.ibp_tanam) -
      Number(stateFormProduksi.ibp_rusak);
    updateState("ibp_panen_akhir_bulan_lap", result.toString());
    allFilledIbp = true;
  } else {
    updateState("ibp_panen_akhir_bulan_lap", "0");
  }
  if (
    stateFormProduksi.inbp_tanaman_akhir_bulan_lalu &&
    stateFormProduksi.inbp_panen &&
    stateFormProduksi.inbp_tanam &&
    stateFormProduksi.inbp_rusak
  ) {
    const result =
      Number(stateFormProduksi.inbp_tanaman_akhir_bulan_lalu) -
      Number(stateFormProduksi.inbp_panen) +
      Number(stateFormProduksi.inbp_tanam) -
      Number(stateFormProduksi.inbp_rusak);
    updateState("inbp_panen_akhir_bulan_lap", result.toString());
    allFieldInbp = true;
  } else {
    updateState("inbp_panen_akhir_bulan_lap", "0");
  }
  return allFilledIbp && allFieldInbp;
};
export const next4 = (
  stateFormProduksi: formProduksi,
  setStateFormProduksi: (
    updater: (prevState: formProduksi) => formProduksi
  ) => void
): boolean => {
  const updateState = (stateKey: keyof formProduksi, value: any) => {
    setStateFormProduksi((prevState) => ({
      ...prevState,
      [stateKey]: value,
    }));
  };
  let allFilledSi = false;
  let allFieldSt = false;
  if (
    stateFormProduksi.si_tanaman_akhir_bulan_lalu &&
    stateFormProduksi.si_panen &&
    stateFormProduksi.si_tanam &&
    stateFormProduksi.si_rusak
  ) {
    // Update nilai pada index 4
    const result =
      Number(stateFormProduksi.si_tanaman_akhir_bulan_lalu) -
      Number(stateFormProduksi.si_panen) +
      Number(stateFormProduksi.si_tanam) -
      Number(stateFormProduksi.si_rusak);
    updateState("si_panen_akhir_bulan_lap", result.toString());
    allFilledSi = true;
  } else {
    updateState("si_panen_akhir_bulan_lap", "0");
  }
  if (
    stateFormProduksi.st_hujan_tanaman_akhir_bulan_lalu &&
    stateFormProduksi.st_hujan_panen &&
    stateFormProduksi.st_hujan_tanam &&
    stateFormProduksi.st_hujan_rusak
  ) {
    const result =
      Number(stateFormProduksi.st_hujan_tanaman_akhir_bulan_lalu) -
      Number(stateFormProduksi.st_hujan_panen) +
      Number(stateFormProduksi.st_hujan_tanam) -
      Number(stateFormProduksi.st_hujan_rusak);
    updateState("st_hujan_panen_akhir_bulan_lap", result.toString());
    allFieldSt = true;
  } else {
    updateState("st_hujan_panen_akhir_bulan_lap", "0");
  }
  return allFilledSi && allFieldSt;
};
export const next5 = (
  stateFormProduksi: formProduksi,
  setStateFormProduksi: (
    updater: (prevState: formProduksi) => formProduksi
  ) => void
): boolean => {
  const updateState = (stateKey: keyof formProduksi, value: any) => {
    setStateFormProduksi((prevState) => ({
      ...prevState,
      [stateKey]: value,
    }));
  };

  let allFilledSrps = false;
  let allFilledSrl = false;

  // Check untuk "srps" fields
  if (
    stateFormProduksi.srps_tanaman_akhir_bulan_lalu &&
    stateFormProduksi.srps_panen &&
    stateFormProduksi.srps_tanam &&
    stateFormProduksi.srps_rusak
  ) {
    const result =
      Number(stateFormProduksi.srps_tanaman_akhir_bulan_lalu) -
      Number(stateFormProduksi.srps_panen) +
      Number(stateFormProduksi.srps_tanam) -
      Number(stateFormProduksi.srps_rusak);
    updateState("srps_panen_akhir_bulan_lap", result.toString());

    allFilledSrps = true; // Semua field srps terisi
  } else {
    updateState("srps_panen_akhir_bulan_lap", "0");
  }

  // Check untuk "srl" fields
  if (
    stateFormProduksi.srl_tanaman_akhir_bulan_lalu &&
    stateFormProduksi.srl_panen &&
    stateFormProduksi.srl_tanam &&
    stateFormProduksi.srl_rusak 
    
  ) {
    const result =
      Number(stateFormProduksi.srl_tanaman_akhir_bulan_lalu) -
      Number(stateFormProduksi.srl_panen) +
      Number(stateFormProduksi.srl_tanam) -
      Number(stateFormProduksi.srl_rusak);
    updateState("srl_panen_akhir_bulan_lap", result.toString());
    allFilledSrl = true; // Semua field srl terisi
  } else {
    updateState("srl_panen_akhir_bulan_lap", "0");
  }

  // Mengembalikan true jika semua field srps dan srl sudah terisi
  return allFilledSrps && allFilledSrl;
};
