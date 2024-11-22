import { useState, useContext, useEffect } from "react";
import { bulan, dataKecamatan } from "../../data/data";
import { globalState } from "../../GlobalContext";
import { fieldProduksi, formProduksi } from "../../data/dataType";
import { next1, next2, next3, next4, next5 } from "./valueForm";
import { useAddProduksi } from "../../features/produksi/useAddProduksi";
import { set } from "date-fns";
import { useFetchProduksi } from "../../features/produksi/useFetchProduksi";
import { useFetchUser } from "../../features/user/useFetchUser";

const FormHasilProduksi = () => {
  const [getText, setText] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [submitToggle, setSubmitToggle] = useState<boolean>(false);
  const [showMonth, setShowMonth] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [nextToggle1, setNextToggle1] = useState<boolean>(false); // [nextToggle1]
  const [nextToggle2, setNextToggle2] = useState<boolean>(false); // [nextToggle2]
  const [nextToggle3, setNextToggle3] = useState<boolean>(false); // [nextToggle3]
  const [nextToggle4, setNextToggle4] = useState<boolean>(false); // [nextToggle4]
  const { state, setState } = globalState();
  const { stateFormProduksi, setStateFormProduksi } = globalState();
  const mutation = useAddProduksi();
  const { filteredProduction, isLoading } = useFetchProduksi();
  const { filteredUsers } = useFetchUser();
  const updateState = (stateKey: keyof formProduksi, value: any) => {
    setStateFormProduksi((prevState) => ({
      ...prevState,
      [stateKey]: value,
    }));
  };
  const loading = () => {
    setState((prevState) => {
      return {
        ...prevState,
        loadingProduksi: !prevState.loadingProduksi,
      };
    });
  };
  const monthFiltered = filteredProduction
    .filter((item) => item.user_id === Number(sessionStorage.getItem("id")))
    .map((item) => item.bulan);
  const yearFiltered = filteredProduction
    .filter((item) => item.user_id === Number(sessionStorage.getItem("id")))
    .map((item) => item.tahun);
  const addressFiltered = filteredUsers
    .filter((item) => item.id === Number(sessionStorage.getItem("id")))
    .map((item) => item.address);

  const nexttoggle1 = () => {
    if (
      monthFiltered.includes(month) &&
      yearFiltered.includes(stateFormProduksi.tahun)
    ) {
      alert(`Laporan bulan ${monthFiltered} ${yearFiltered} sudah ada`);
      return;
    } else if (!addressFiltered.includes(getText)) {
      alert("sesuaikan kecamatannya");
      return;
    } else {
      updateState("kecamatan", getText);
      updateState("bulan", month);
      next1(stateFormProduksi, setStateFormProduksi);
      console.log(next1(stateFormProduksi, setStateFormProduksi));

      loading();
      setTimeout(() => {
        loading();
      }, 500);

      setNextToggle1(!nextToggle1);
    }
  };
  const prevtoggle1 = () => {
    loading();
    setTimeout(() => {
      loading();
    }, 500);

    setNextToggle1(!nextToggle1);
  };

  const nexttoggle2 = () => {
    next2(stateFormProduksi, setStateFormProduksi);
    loading();
    setTimeout(() => {
      loading();
    }, 500); // Delay 2000ms (2 detik)

    setNextToggle2(!nextToggle2);
  };
  const prevtoggle2 = () => {
    loading();
    setTimeout(() => {
      loading();
    }, 500);
    setNextToggle2(!nextToggle2);
  };

  const nexttoggle3 = () => {
    next3(stateFormProduksi, setStateFormProduksi);
    loading();
    setTimeout(() => {
      loading();
    }, 500); // Delay 2000ms (2 detik)

    setNextToggle3(!nextToggle3);
  };
  const prevtoggle3 = () => {
    loading();
    setTimeout(() => {
      loading();
    }, 500);

    setNextToggle3(!nextToggle3);
  };
  const nexttoggle4 = () => {
    next4(stateFormProduksi, setStateFormProduksi);
    loading();
    setTimeout(() => {
      loading();
    }, 500); // Delay 2000ms (2 detik)

    setNextToggle4(!nextToggle4);
  };
  const prevtoggle4 = () => {
    loading();
    setTimeout(() => {
      loading();
    }, 500);
    setNextToggle4(!nextToggle4);
  };
  const checkIndex = (text: string) => {
    setText(text);
    setShowOptions(!showOptions);
  };
  const checkMonth = (text: string) => {
    setMonth(text);
    setShowMonth(!showMonth);
  };
  const filteredData = dataKecamatan
    .map((data) => data.kecamatan)
    .filter((kecamatan) =>
      kecamatan.toLowerCase().includes(getText.toLowerCase())
    );

  const saveData = (e: any) => {
    next5(stateFormProduksi, setStateFormProduksi);
    e.preventDefault();
    const allDataCompleted = () => {
      return (
        next1(stateFormProduksi, setStateFormProduksi) &&
        next2(stateFormProduksi, setStateFormProduksi) &&
        next3(stateFormProduksi, setStateFormProduksi) &&
        next4(stateFormProduksi, setStateFormProduksi) &&
        next5(stateFormProduksi, setStateFormProduksi)
      );
    };
    if (!allDataCompleted()) {
      alert("Lengkapi semua data");
    } else {
      setSubmitToggle(!submitToggle);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate({
      user_id: Number(sessionStorage.getItem("id")),
      kecamatan: stateFormProduksi.kecamatan,
      bulan: stateFormProduksi.bulan,
      tahun: stateFormProduksi.tahun,

      jumlah_padi_akhir_bulan_lalu:
        stateFormProduksi.jmlh_pd_tanaman_akhir_bln_lalu,
      jumlah_padi_panen: stateFormProduksi.jmlh_pd_panen,
      jumlah_padi_tanam: stateFormProduksi.jmlh_pd_tanam,
      jumlah_padi_rusak: stateFormProduksi.jmlh_pd_rusak,
      jumlah_padi_akhir_bulan: stateFormProduksi.jmlh_pd_panen_akhir_bln_lap,

      jenis_padi_akhir_bulan_lalu_hibrida:
        stateFormProduksi.hbp_tanaman_akhir_bulan_lalu,
      jenis_padi_panen_hibrida: stateFormProduksi.hbp_panen,
      jenis_padi_tanam_hibrida: stateFormProduksi.hbp_tanam,
      jenis_padi_rusak_hibrida: stateFormProduksi.hbp_rusak,
      jenis_padi_akhir_bulan_hibrida:
        stateFormProduksi.hbp_panen_akhir_bulan_lap,

      jenis_padi_akhir_bulan_lalu_non_hibrida:
        stateFormProduksi.hnbp_tanaman_akhir_bulan_lalu,
      jenis_padi_panen_non_hibrida: stateFormProduksi.hnbp_panen,
      jenis_padi_tanam_non_hibrida: stateFormProduksi.hnbp_tanam,
      jenis_padi_rusak_non_hibrida: stateFormProduksi.hnbp_rusak,
      jenis_padi_akhir_bulan_non_hibrida:
        stateFormProduksi.hnbp_panen_akhir_bulan_lap,

      jenis_padi_akhir_bulan_lalu_inbrida:
        stateFormProduksi.ibp_tanaman_akhir_bulan_lalu,
      jenis_padi_panen_inbrida: stateFormProduksi.ibp_panen,
      jenis_padi_tanam_inbrida: stateFormProduksi.ibp_tanam,
      jenis_padi_rusak_inbrida: stateFormProduksi.ibp_rusak,
      jenis_padi_akhir_bulan_inbrida:
        stateFormProduksi.ibp_panen_akhir_bulan_lap,

      jenis_padi_akhir_bulan_lalu_non_inbrida:
        stateFormProduksi.inbp_tanaman_akhir_bulan_lalu,
      jenis_padi_panen_non_inbrida: stateFormProduksi.inbp_panen,
      jenis_padi_tanam_non_inbrida: stateFormProduksi.inbp_tanam,
      jenis_padi_rusak_non_inbrida: stateFormProduksi.inbp_rusak,
      jenis_padi_akhir_bulan_non_inbrida:
        stateFormProduksi.inbp_panen_akhir_bulan_lap,

      sawah_irigasi_akhir_bulan_lalu:
        stateFormProduksi.si_tanaman_akhir_bulan_lalu,
      sawah_irigasi_panen: stateFormProduksi.si_panen,
      sawah_irigasi_tanam: stateFormProduksi.si_tanam,
      sawah_irigasi_rusak: stateFormProduksi.si_rusak,
      sawah_irigasi_akhir_bulan: stateFormProduksi.si_panen_akhir_bulan_lap,

      sawah_tadah_hujan_akhir_bulan_lalu:
        stateFormProduksi.st_hujan_tanaman_akhir_bulan_lalu,
      sawah_tadah_hujan_panen: stateFormProduksi.st_hujan_panen,
      sawah_tadah_hujan_tanam: stateFormProduksi.st_hujan_tanam,
      sawah_tadah_hujan_rusak: stateFormProduksi.st_hujan_rusak,
      sawah_tadah_hujan_akhir_bulan:
        stateFormProduksi.st_hujan_panen_akhir_bulan_lap,

      sawah_pasang_surut_akhir_bulan_lalu:
        stateFormProduksi.srps_tanaman_akhir_bulan_lalu,
      sawah_pasang_surut_panen: stateFormProduksi.srps_panen,
      sawah_pasang_surut_tanam: stateFormProduksi.srps_tanam,
      sawah_pasang_surut_rusak: stateFormProduksi.srps_rusak,
      sawah_pasang_surut_akhir_bulan:
        stateFormProduksi.srps_panen_akhir_bulan_lap,

      sawah_lebak_akhir_bulan_lalu:
        stateFormProduksi.srl_tanaman_akhir_bulan_lalu,
      sawah_lebak_panen: stateFormProduksi.srl_panen,
      sawah_lebak_tanam: stateFormProduksi.srl_tanam,
      sawah_lebak_rusak: stateFormProduksi.srl_rusak,
      sawah_lebak_akhir_bulan: stateFormProduksi.srl_panen_akhir_bulan_lap,
    });
  };

  useEffect(() => {
    if (mutation.status === "pending") {
      setState((prevState) => {
        return {
          ...prevState,
          toggle: true,
        };
      });
    }
  }, [mutation.status, filteredProduction]);

  return (
    <div>
       <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-20 ${
            isLoading ? "" : "hidden"
          }`}
        >
          <div className="loader-pengaduan"></div>
        </div>

    <div className={`w-full h-full border-l border-r mt-3 ${isLoading ? "hidden" : ""}`}>
      <form className="form-produksi" action="">
        <div className={state.loadingProduksi ? "hidden" : ""}>
          <div className={`${nextToggle1 ? "hidden" : ""}`}>
            <div className="border-y">
              <p className="my-1 ml-10">Laporan Hasil Produksi</p>
            </div>
            <div className="flex justify-center ">
              <div className="pt-5 ">
                <label className="" htmlFor="">
                  Kecamatan
                </label>
                <div className="flex items-center border w-[659px] h-[39px] border-[#F0F0F0] outline-none rounded-lg mt-1 px-6">
                  <input
                    onClick={() => setShowOptions(true)}
                    className=" w-[659px] outline-none  text-[14px]"
                    type="text"
                    // placeholder="Keacamatan"
                    value={getText}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <span onClick={() => setShowOptions(!showOptions)}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_2582_26)">
                        <path
                          d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"
                          fill="#9BEC00"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2582_26">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                </div>
                <div
                  className={`scrollbar-hide ${
                    showOptions ? "block" : "hidden"
                  }  max-h-[117px] overflow-auto`}
                >
                  {filteredData.map((data, index) => {
                    return (
                      <div
                        onClick={() => checkIndex(data)}
                        key={index}
                        className="group flex items-center border w-[659px] h-[39px] hover:bg-custom-gradient  border-[#F0F0F0] outline-none rounded-lg px-6 cursor-pointer"
                      >
                        <p className="text-[14px] group-hover:text-white">
                          {data}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="py-2">
                <label htmlFor="">Bulan</label>
                <div className="flex items-center border w-[659px] h-[39px] border-[#F0F0F0] outline-none rounded-lg mt-1 px-6">
                  <input
                    onClick={() => setShowMonth(true)}
                    className=" w-[659px] outline-none  text-[14px]"
                    type="text"
                    placeholder=""
                    value={month}
                    // onChange={(e) => setMonth(e.target.value)}
                  />
                  <span onClick={() => setShowMonth(!showMonth)}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_2582_26)">
                        <path
                          d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"
                          fill="#9BEC00"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2582_26">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                </div>
                <div
                  className={`scrollbar-hide ${
                    showMonth ? "block" : "hidden"
                  }  max-h-[117px] overflow-auto`}
                >
                  {bulan.map((data, index) => {
                    return (
                      <div
                        onClick={() => checkMonth(data)}
                        key={index}
                        className="group flex items-center border w-[659px] h-[39px] hover:bg-custom-gradient  border-[#F0F0F0] outline-none rounded-lg px-6 cursor-pointer"
                      >
                        <p className="text-[14px] group-hover:text-white">
                          {data}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="pt-2 pb-5">
                <label htmlFor="">Tahun</label>
                <div className="flex items-center border w-[659px] h-[39px] border-[#F0F0F0] outline-none rounded-lg mt-1 px-6">
                  <input
                    onChange={(e) => updateState("tahun", e.target.value)}
                    className=" w-[659px] outline-none  text-[14px]"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={nextToggle1 ? "hidden" : ""}>
            <div className="border-y b">
              <p className="my-1 ml-10">Jumlah Padi</p>
            </div>
            {fieldProduksi.map((data, index) => {
              return (
                <div key={index} className="flex justify-center">
                  <div className="py-2">
                    <label htmlFor="">{data}</label>
                    <div className="flex items-center border w-[659px] h-[39px] border-[#F0F0F0] outline-none rounded-lg mt-1 px-6">
                      <input
                        placeholder="*
Jika field kosong silahkan inputkan 0"
                        onChange={
                          index == 0
                            ? (e) =>
                                updateState(
                                  "jmlh_pd_tanaman_akhir_bln_lalu",
                                  e.target.value
                                )
                            : index == 1
                            ? (e) =>
                                updateState("jmlh_pd_panen", e.target.value)
                            : index == 2
                            ? (e) =>
                                updateState("jmlh_pd_tanam", e.target.value)
                            : index == 3
                            ? (e) =>
                                updateState("jmlh_pd_rusak", e.target.value)
                            : (e) =>
                                updateState(
                                  "jmlh_pd_panen_akhir_bln_lap",
                                  e.target.value
                                )
                        }
                        className="w-[659px] outline-none text-[14px]"
                        type="number"
                        readOnly={index === 4}
                        value={
                          index === 4
                            ? stateFormProduksi.jmlh_pd_panen_akhir_bln_lap ===
                              undefined
                              ? 0
                              : stateFormProduksi.jmlh_pd_panen_akhir_bln_lap
                            : undefined
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-center  ">
              <p className="text-[12px] text-red-500 w-[659px] pb-2">
                Dihitung otomatis
              </p>
            </div>
            <div className="flex justify-center pb-3 border-b">
              <p
                onClick={nexttoggle1}
                className="px-8 py-2 bg-custom-gradient text-white rounded-md cursor-pointer"
              >
                Selanjutnya
              </p>
            </div>
          </div>
        </div>

        {/*------------------ Hibrida ---------------------------*/}
        <div
          className={` ${state.loadingProduksi ? "hidden" : ""} ${
            nextToggle1 ? "" : "hidden"
          } ${nextToggle2 ? "hidden" : ""}`}
        >
          <div className="border-y">
            <p className="my-1 ml-10">Jumlah Padi</p>
          </div>
          <div className="flex justify-center">
            <p>Hibrida - Bantuan Pemerintah</p>
          </div>
          {fieldProduksi.map((data, index) => {
            return (
              <div key={index} className="flex justify-center ">
                <div className="py-2">
                  <label htmlFor="">{data}</label>
                  <div className="flex items-center border w-[659px] h-[39px] border-[#F0F0F0] outline-none rounded-lg mt-1 px-6">
                    <input
                      placeholder="*
Jika field kosong silahkan inputkan 0"
                      onChange={
                        index == 0
                          ? (e) =>
                              updateState(
                                "hbp_tanaman_akhir_bulan_lalu",
                                e.target.value
                              )
                          : index == 1
                          ? (e) => updateState("hbp_panen", e.target.value)
                          : index == 2
                          ? (e) => updateState("hbp_tanam", e.target.value)
                          : index == 3
                          ? (e) => updateState("hbp_rusak", e.target.value)
                          : (e) =>
                              updateState(
                                "hbp_panen_akhir_bulan_lap",
                                e.target.value
                              )
                      }
                      readOnly={index === 4}
                      value={
                        index === 4
                          ? stateFormProduksi.hbp_panen_akhir_bulan_lap ===
                            undefined
                            ? 0
                            : stateFormProduksi.hbp_panen_akhir_bulan_lap
                          : undefined
                      }
                      className=" w-[659px] outline-none  text-[14px] "
                      type="number"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center  ">
            <p className="text-[12px] text-red-500 w-[659px] pb-2">
              Dihitung otomatis
            </p>
          </div>
          <div className="flex justify-center ">
            <p>Hibrida - Non Bantuan Pemerintah</p>
          </div>
          {fieldProduksi.map((data, index) => {
            return (
              <div key={index} className="flex justify-center ">
                <div className="py-2">
                  <label htmlFor="">{data}</label>
                  <div className="flex items-center border w-[659px] h-[39px] border-[#F0F0F0] outline-none rounded-lg mt-1 px-6">
                    <input
                      placeholder="*
Jika field kosong silahkan inputkan 0"
                      onChange={
                        index == 0
                          ? (e) =>
                              updateState(
                                "hnbp_tanaman_akhir_bulan_lalu",
                                e.target.value
                              )
                          : index == 1
                          ? (e) => updateState("hnbp_panen", e.target.value)
                          : index == 2
                          ? (e) => updateState("hnbp_tanam", e.target.value)
                          : index == 3
                          ? (e) => updateState("hnbp_rusak", e.target.value)
                          : (e) =>
                              updateState(
                                "hnbp_panen_akhir_bulan_lap",
                                e.target.value
                              )
                      }
                      readOnly={index === 4}
                      value={
                        index === 4
                          ? stateFormProduksi.hnbp_panen_akhir_bulan_lap ===
                            undefined
                            ? 0
                            : stateFormProduksi.hnbp_panen_akhir_bulan_lap
                          : undefined
                      }
                      className=" w-[659px] outline-none  text-[14px] "
                      type="number"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center  ">
            <p className="text-[12px] text-red-500 w-[659px] pb-2">
              Dihitung otomatis
            </p>
          </div>
          <div className="flex justify-center gap-10 pb-3 border-b">
            <p
              onClick={prevtoggle1}
              className="w-[10rem] py-2 bg-custom-gradient text-center text-white rounded-md cursor-pointer"
            >
              Kembali
            </p>
            <p
              onClick={nexttoggle2}
              className="w-[10rem] text-center py-2 bg-custom-gradient text-white rounded-md cursor-pointer"
            >
              Selanjutnya
            </p>
          </div>
        </div>

        {/* -----------------Inbrida -----------------*/}

        <div
          className={` ${state.loadingProduksi ? "hidden" : ""} ${
            nextToggle2 ? "" : "hidden"
          } ${nextToggle3 ? "hidden" : ""}`}
        >
          <div className="border-y">
            <p className="my-1 ml-10">Jumlah Padi</p>
          </div>
          <div className="flex justify-center">
            <p>Inbrida - Bantuan Pemerintah</p>
          </div>
          {fieldProduksi.map((data, index) => {
            return (
              <div key={index} className="flex justify-center ">
                <div className="py-2">
                  <label htmlFor="">{data}</label>
                  <div className="flex items-center border w-[659px] h-[39px] border-[#F0F0F0] outline-none rounded-lg mt-1 px-6">
                    <input
                      placeholder="*
Jika field kosong silahkan inputkan 0"
                      onChange={
                        index == 0
                          ? (e) =>
                              updateState(
                                "ibp_tanaman_akhir_bulan_lalu",
                                e.target.value
                              )
                          : index == 1
                          ? (e) => updateState("ibp_panen", e.target.value)
                          : index == 2
                          ? (e) => updateState("ibp_tanam", e.target.value)
                          : index == 3
                          ? (e) => updateState("ibp_rusak", e.target.value)
                          : (e) =>
                              updateState(
                                "ibp_panen_akhir_bulan_lap",
                                e.target.value
                              )
                      }
                      readOnly={index === 4}
                      value={
                        index === 4
                          ? stateFormProduksi.ibp_panen_akhir_bulan_lap ===
                            undefined
                            ? 0
                            : stateFormProduksi.ibp_panen_akhir_bulan_lap
                          : undefined
                      }
                      className=" w-[659px] outline-none  text-[14px] "
                      type="number"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center  ">
            <p className="text-[12px] text-red-500 w-[659px] pb-2">
              Dihitung otomatis
            </p>
          </div>
          <div className="flex justify-center mt-3">
            <p>Inbrida - Non Bantuan Pemerintah</p>
          </div>
          {fieldProduksi.map((data, index) => {
            return (
              <div key={index} className="flex justify-center ">
                <div className="py-2">
                  <label htmlFor="">{data}</label>
                  <div className="flex items-center border w-[659px] h-[39px] border-[#F0F0F0] outline-none rounded-lg mt-1 px-6">
                    <input
                      placeholder="*
Jika field kosong silahkan inputkan 0"
                      onChange={
                        index == 0
                          ? (e) =>
                              updateState(
                                "inbp_tanaman_akhir_bulan_lalu",
                                e.target.value
                              )
                          : index == 1
                          ? (e) => updateState("inbp_panen", e.target.value)
                          : index == 2
                          ? (e) => updateState("inbp_tanam", e.target.value)
                          : index == 3
                          ? (e) => updateState("inbp_rusak", e.target.value)
                          : (e) =>
                              updateState(
                                "inbp_panen_akhir_bulan_lap",
                                e.target.value
                              )
                      }
                      readOnly={index === 4}
                      value={
                        index === 4
                          ? stateFormProduksi.inbp_panen_akhir_bulan_lap ===
                            undefined
                            ? 0
                            : stateFormProduksi.inbp_panen_akhir_bulan_lap
                          : undefined
                      }
                      className=" w-[659px] outline-none  text-[14px] "
                      type="number"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center  ">
            <p className="text-[12px] text-red-500 w-[659px] pb-2">
              Dihitung otomatis
            </p>
          </div>
          <div className="flex justify-center gap-10 pb-3 border-b">
            <p
              onClick={prevtoggle2}
              className="w-[10rem] py-2 bg-custom-gradient text-center text-white rounded-md cursor-pointer"
            >
              Kembali
            </p>
            <p
              onClick={nexttoggle3}
              className="w-[10rem] text-center py-2 bg-custom-gradient text-white rounded-md cursor-pointer"
            >
              Selanjutnya
            </p>
          </div>
        </div>

        {/* ------------------------33333-----------------------*/}

        <div
          className={`${state.loadingProduksi ? "hidden" : ""} ${
            nextToggle3 ? "" : "hidden"
          } ${nextToggle4 ? "hidden" : ""}`}
        >
          <div className="border-y">
            <p className="my-1 ml-10">Jumlah Padi</p>
          </div>
          <div className="flex justify-center">
            <p>Sawah Irigasi</p>
          </div>
          {fieldProduksi.map((data, index) => {
            return (
              <div key={index} className="flex justify-center ">
                <div className="py-2">
                  <label htmlFor="">{data}</label>
                  <div className="flex items-center border w-[659px] h-[39px] border-[#F0F0F0] outline-none rounded-lg mt-1 px-6">
                    <input
                      placeholder="*
Jika field kosong silahkan inputkan 0"
                      onChange={
                        index == 0
                          ? (e) =>
                              updateState(
                                "si_tanaman_akhir_bulan_lalu",
                                e.target.value
                              )
                          : index == 1
                          ? (e) => updateState("si_panen", e.target.value)
                          : index == 2
                          ? (e) => updateState("si_tanam", e.target.value)
                          : index == 3
                          ? (e) => updateState("si_rusak", e.target.value)
                          : (e) =>
                              updateState(
                                "si_panen_akhir_bulan_lap",
                                e.target.value
                              )
                      }
                      readOnly={index === 4}
                      value={
                        index === 4
                          ? stateFormProduksi.si_panen_akhir_bulan_lap ===
                            undefined
                            ? 0
                            : stateFormProduksi.si_panen_akhir_bulan_lap
                          : undefined
                      }
                      className=" w-[659px] outline-none  text-[14px] "
                      type="number"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center  ">
            <p className="text-[12px] text-red-500 w-[659px] pb-2">
              Dihitung otomatis
            </p>
          </div>
          <div className="flex justify-center mt-3">
            <p>Sawah Tadah Hujan</p>
          </div>
          {fieldProduksi.map((data, index) => {
            return (
              <div key={index} className="flex justify-center ">
                <div className="py-2">
                  <label htmlFor="">{data}</label>
                  <div className="flex items-center border w-[659px] h-[39px] border-[#F0F0F0] outline-none rounded-lg mt-1 px-6">
                    <input
                      placeholder="*
Jika field kosong silahkan inputkan 0"
                      onChange={
                        index == 0
                          ? (e) =>
                              updateState(
                                "st_hujan_tanaman_akhir_bulan_lalu",
                                e.target.value
                              )
                          : index == 1
                          ? (e) => updateState("st_hujan_panen", e.target.value)
                          : index == 2
                          ? (e) => updateState("st_hujan_tanam", e.target.value)
                          : index == 3
                          ? (e) => updateState("st_hujan_rusak", e.target.value)
                          : (e) =>
                              updateState(
                                "st_hujan_panen_akhir_bulan_lap",
                                e.target.value
                              )
                      }
                      readOnly={index === 4}
                      value={
                        index === 4
                          ? stateFormProduksi.st_hujan_panen_akhir_bulan_lap ===
                            undefined
                            ? 0
                            : stateFormProduksi.st_hujan_panen_akhir_bulan_lap
                          : undefined
                      }
                      className=" w-[659px] outline-none  text-[14px] "
                      type="number"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center  ">
            <p className="text-[12px] text-red-500 w-[659px] pb-2">
              Dihitung otomatis
            </p>
          </div>
          <div className="flex justify-center gap-10 pb-3 border-b">
            <p
              onClick={prevtoggle3}
              className="w-[10rem] py-2 bg-custom-gradient text-center text-white rounded-md cursor-pointer"
            >
              Kembali
            </p>
            <p
              onClick={nexttoggle4}
              className="w-[10rem] text-center py-2 bg-custom-gradient text-white rounded-md cursor-pointer"
            >
              Selanjutnya
            </p>
          </div>
        </div>

        {/* ------------------444444-----------------------------*/}

        <div
          className={`${nextToggle4 ? "" : "hidden"} ${
            state.loadingProduksi ? "hidden" : ""
          }`}
        >
          <div className="border-y">
            <p className="my-1 ml-10">Jumlah Padi</p>
          </div>
          <div className="flex justify-center">
            <p>Sawah Rawa Pasang Surut</p>
          </div>
          {fieldProduksi.map((data, index) => {
            return (
              <div key={index} className="flex justify-center ">
                <div className="py-2">
                  <label htmlFor="">{data}</label>
                  <div className="flex items-center border w-[659px] h-[39px] border-[#F0F0F0] outline-none rounded-lg mt-1 px-6">
                    <input
                      placeholder="*
Jika field kosong silahkan inputkan 0"
                      onChange={
                        index == 0
                          ? (e) =>
                              updateState(
                                "srps_tanaman_akhir_bulan_lalu",
                                e.target.value
                              )
                          : index == 1
                          ? (e) => updateState("srps_panen", e.target.value)
                          : index == 2
                          ? (e) => updateState("srps_tanam", e.target.value)
                          : index == 3
                          ? (e) => updateState("srps_rusak", e.target.value)
                          : (e) =>
                              updateState(
                                "srps_panen_akhir_bulan_lap",
                                e.target.value
                              )
                      }
                      readOnly={index === 4}
                      value={
                        index === 4
                          ? stateFormProduksi.srps_panen_akhir_bulan_lap ===
                            undefined
                            ? 0
                            : stateFormProduksi.srps_panen_akhir_bulan_lap
                          : undefined
                      }
                      className=" w-[659px] outline-none  text-[14px] "
                      type="number"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center  ">
            <p className="text-[12px] text-red-500 w-[659px] pb-2">
              Dihitung otomatis
            </p>
          </div>
          <div className="flex justify-center mt-3">
            <p>Sawah Rawa Lebak</p>
          </div>
          {fieldProduksi.map((data, index) => {
            return (
              <div key={index} className="flex justify-center ">
                <div className="py-2">
                  <label htmlFor="">{data}</label>
                  <div className="flex items-center border w-[659px] h-[39px] border-[#F0F0F0] outline-none rounded-lg mt-1 px-6">
                    <input
                      placeholder="*
Jika field kosong silahkan inputkan 0"
                      onChange={
                        index == 0
                          ? (e) =>
                              updateState(
                                "srl_tanaman_akhir_bulan_lalu",
                                e.target.value
                              )
                          : index == 1
                          ? (e) => updateState("srl_panen", e.target.value)
                          : index == 2
                          ? (e) => updateState("srl_tanam", e.target.value)
                          : index == 3
                          ? (e) => updateState("srl_rusak", e.target.value)
                          : (e) =>
                              updateState(
                                "srl_panen_akhir_bulan_lap",
                                e.target.value
                              )
                      }
                      readOnly={index === 4}
                      value={
                        index === 4
                          ? stateFormProduksi.srl_panen_akhir_bulan_lap ===
                            undefined
                            ? 0
                            : stateFormProduksi.srl_panen_akhir_bulan_lap
                          : undefined
                      }
                      className=" w-[659px] outline-none  text-[14px] "
                      type="number"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center  ">
            <p className="text-[12px] text-red-500 w-[659px] pb-2">
              Dihitung otomatis
            </p>
          </div>
          <div className="flex justify-center gap-10 pb-3 border-b">
            <p
              onClick={prevtoggle4}
              className={`w-[10rem] py-2 bg-custom-gradient text-center text-white rounded-md cursor-pointer ${
                submitToggle ? "hidden" : ""
              }`}
            >
              Kembali
            </p>
            <p
              onClick={saveData}
              className={`w-[10rem] py-2 bg-custom-gradient text-center text-white rounded-md cursor-pointer ${
                submitToggle ? "hidden" : ""
              }`}
            >
              Simpan
            </p>
            <p
              onClick={handleSubmit}
              className={`w-[10rem] flex justify-center items-center py-2 bg-custom-gradient text-center text-white rounded-md cursor-pointer ${
                submitToggle ? "" : "hidden"
              }`}
            >
              <p
                className={`text-white ${
                  mutation.status === "pending" ? "hidden" : ""
                }`}
              >
                Submit
              </p>
              <div
                className={`login-loader ${
                  mutation.status === "pending" ? "" : "hidden"
                }`}
              ></div>
            </p>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default FormHasilProduksi;
