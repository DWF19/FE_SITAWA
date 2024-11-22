import React from "react";
import logo from "../../assets/logo/sumbawa.jpeg";
import { useFetchProduksiById } from "../../features/produksi/useFetchProduksiById";
import { useParams } from "react-router-dom";

const LaporanProduksiComp = () => {
  const { id } = useParams();
    const { data, isLoading } = useFetchProduksiById(Number(id));
  
    const padiType = [
      "Hibrida - Bantuan Pemerintah",
      "Hibrida - Non Bantuan Pemerintah",
      "Inbrida - Bantuan Pemerintah",
      "Inbrida - Non Bantuan Pemerintah",
    ];
    const pengairanType = [
      "Sawah Irigasi",
      "Sawah Tadah Hujan",
      "Sawah Rawa Pasang Surut",
      "Sawah Rawa Lebak",
    ];
    return (
      <div className="w-full h-full">
         {isLoading && (
          <div
            className={`flex justify-center items-center w-full h-[50vh] mt-10 `}
          >
            <div className="loader-pengaduan"></div>
          </div>
        )}
        {!isLoading && (
  
        <div className="border rounded-lg my-10 shadow-md">
          {/*  */}
          <div className="flex justify-center items-center">
            <div className="w-[95%] flex justify-between items-center mt-5">
              <div className="flex gap-2 items-center">
                <img className="w-[36px] h-[50px]" src={logo} alt="" />
                <p className="text-[#06D001] font-bold">si TAWA</p>
              </div>
              <h1 className="text-[20px] font-bold">LAPORAN LUAS TANAMAN PADI</h1>
              <div>
                <p className="text-center text-black text-[]">
                  Badan Pusat Statistik
                </p>
                <p className="text-center text-black text-[]">Dan</p>
                <p className="text-center text-black text-[]">
                  Kementrian Pertanian
                </p>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-center items-center">
            <div className="w-[95%] flex justify-between items-center mt-14 mb-10 text-[14px]">
              <div className="flex gap-5">
                <div>
                  {["PROVINSI", "KABUPATEN", "KECAMATAN"].map((item) => {
                    return <p>{item}</p>;
                  })}
                </div>
                <div>
                  {[1, 2, 3].map(() => {
                    return <p>:</p>;
                  })}
                </div>
                <div>
                  {["NUSA TENGGARA BARAT", "SUMBAWA", data?.kecamatan].map(
                    (data) => {
                      return <p className="uppercase">{data}</p>;
                    }
                  )}
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div>
                  {["BULAN", "TAHUN", "empty"].map((item, index) => {
                    return (
                      <p className={index === 2 ? "invisible" : ""}>{item}</p>
                    );
                  })}
                </div>
                <div>
                  {[0, 1, 2].map((index) => {
                    return <p className={index === 2 ? "invisible" : ""}>:</p>;
                  })}
                </div>
                <div>
                  {[data?.bulan, data?.tahun, "empty"].map((data, index) => {
                    return (
                      <p className={index === 2 ? "invisible" : ""}>{data}</p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center border-y py-1">
            <p>Jenis Padi</p>
          </div>
          <div className="flex justify-center items-center">
            <div className="border w-[500px] my-10 p-5 shadow-md rounded-md">
              <p className="text-center pb-10 font-bold invisible">empty space</p>
              <div className="flex justify-between items-center">
                <div>
                  {[
                    "Tanaman Bulan Lalu",
                    "Panen",
                    "Tanam",
                    "Puso / Rusak",
                    "Tanaman Akhir Bulan",
                  ].map((item) => {
                    return <p>{item}</p>;
                  })}
                </div>
                <div>
                  {[1, 2, 3, 4, 5].map(() => {
                    return <p>:</p>;
                  })}
                </div>
                <div>
                  {[1, 2, 3, 4, 5].map((index) => {
                    return (
                      <p className={index === 5 ? "text-black font-bold" : ""}>
                        {index == 1
                          ? data?.jumlah_padi_akhir_bulan_lalu
                          : index == 2
                          ? data?.jumlah_padi_panen
                          : index == 3
                          ? data?.jumlah_padi_tanam
                          : index == 4
                          ? data?.jumlah_padi_rusak
                          : data?.jumlah_padi_akhir_bulan}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center border-y py-1">
            <p>Jenis Padi</p>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-[85%] grid grid-cols-2 gap-5 justify-between items-center mt-5">
              {padiType.map((item, indexPadiType) => {
                return (
                  <div
                    key={indexPadiType}
                    className="flex justify-center items-center"
                  >
                    <div className="border w-[500px] p-5 my-10 shadow-md rounded-md  ">
                      <p className="text-center font-bold h-[50px]">{item}</p>
                      <div className='pb-16'></div>
                      <div className="flex justify-between  ">
                        <div>
                          {[
                            "Tanaman Bulan Lalu",
                            "Panen",
                            "Tanam",
                            "Puso / Rusak",
                            "Tanaman Akhir Bulan",
                          ].map((item) => {
                            return <p className=' overflow-hidden text-ellipsis'>{item}</p>;
                          })}
                        </div>
                        <div>
                          {[1, 2, 3, 4, 5].map(() => {
                            return <p>:</p>;
                          })}
                        </div>
                        <div>
                          {[1, 2, 3, 4, 5].map((index) => {
                            return (
                              <p
                                className={`${
                                  index === 5 ? "text-black font-bold" : ""
                                } text-center`}
                              >
                                {indexPadiType == 0
                                  ? index == 1
                                    ? data?.jenis_padi_akhir_bulan_lalu_hibrida
                                    : index == 2
                                    ? data?.jenis_padi_panen_hibrida
                                    : index == 3
                                    ? data?.jenis_padi_tanam_hibrida
                                    : index == 4
                                    ? data?.jenis_padi_rusak_hibrida
                                    : data?.jenis_padi_akhir_bulan_hibrida
                                  : indexPadiType == 1
                                  ? index == 1
                                    ? data?.jenis_padi_akhir_bulan_lalu_non_hibrida
                                    : index == 2
                                    ? data?.jenis_padi_panen_non_hibrida
                                    : index == 3
                                    ? data?.jenis_padi_tanam_non_hibrida
                                    : index == 4
                                    ? data?.jenis_padi_rusak_non_hibrida
                                    : data?.jenis_padi_akhir_bulan_non_hibrida
                                  : indexPadiType == 2
                                  ? index == 1
                                    ? data?.jenis_padi_akhir_bulan_lalu_inbrida
                                    : index == 2
                                    ? data?.jenis_padi_panen_inbrida
                                    : index == 3
                                    ? data?.jenis_padi_tanam_inbrida
                                    : index == 4
                                    ? data?.jenis_padi_rusak_inbrida
                                    : data?.jenis_padi_akhir_bulan_inbrida
                                  : index == 1
                                  ? data?.jenis_padi_akhir_bulan_lalu_non_inbrida
                                  : index == 2
                                  ? data?.jenis_padi_panen_non_inbrida
                                  : index == 3
                                  ? data?.jenis_padi_tanam_non_inbrida
                                  : index == 4
                                  ? data?.jenis_padi_rusak_non_inbrida
                                  : data?.jenis_padi_akhir_bulan_non_inbrida}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full flex justify-center border-y py-1">
            <p>Jenis Pengairan</p>
          </div>
          <div className="flex justify-center items-center ">
            <div className="w-[85%] grid grid-cols-2 gap-5 justify-between items-center mt-5 ">
              {pengairanType.map((item, indexPengairanType) => {
                return (
                  <div
                    key={indexPengairanType}
                    className="flex justify-center items-center"
                  >
                    <div className="border w-[500px] my-10 p-5  shadow-md rounded-md">
                      <p className="text-center h-[50px] font-bold">{item}</p>
                      <div className='pb-16 '></div>
                      <div className="flex justify-between ">
                        <div>
                          {[
                            "Tanaman Bulan Lalu",
                            "Panen",
                            "Tanam",
                            "Puso / Rusak",
                            "Tanaman Akhir Bulan",
                          ].map((item) => {
                            return <p>{item}</p>;
                          })}
                        </div>
                        <div>
                          {[1, 2, 3, 4, 5].map(() => {
                            return <p>:</p>;
                          })}
                        </div>
                        <div>
                          {[1, 2, 3, 4, 5].map((index) => {
                            return (
                              <p
                              className={`${index === 5 ? "text-black font-bold" : ""} text-center`
                                  
                            }
                              >
                                {indexPengairanType == 0
                                  ? index == 1
                                    ? data?.sawah_irigasi_akhir_bulan_lalu
                                    : index == 2
                                    ? data?.sawah_irigasi_panen
                                    : index == 3
                                    ? data?.sawah_irigasi_tanam
                                    : index == 4
                                    ? data?.sawah_irigasi_rusak
                                    : data?.sawah_irigasi_akhir_bulan
                                  : indexPengairanType == 1
                                  ? index == 1
                                    ? data?.sawah_tadah_hujan_akhir_bulan_lalu
                                    : index == 2
                                    ? data?.sawah_tadah_hujan_panen
                                    : index == 3
                                    ? data?.sawah_tadah_hujan_tanam
                                    : index == 4
                                    ? data?.sawah_tadah_hujan_rusak
                                    : data?.sawah_tadah_hujan_akhir_bulan
                                  : indexPengairanType == 2
                                  ? index == 1
                                    ? data?.sawah_pasang_surut_akhir_bulan_lalu
                                    : index == 2
                                    ? data?.sawah_pasang_surut_panen
                                    : index == 3
                                    ? data?.sawah_pasang_surut_tanam
                                    : index == 4
                                    ? data?.sawah_pasang_surut_rusak
                                    : data?.sawah_pasang_surut_akhir_bulan
                                  : index == 1
                                  ? data?.sawah_lebak_akhir_bulan_lalu
                                  : index == 2
                                  ? data?.sawah_lebak_panen
                                  : index == 3
                                  ? data?.sawah_lebak_tanam
                                  : index == 4
                                  ? data?.sawah_lebak_rusak
                                  : data?.sawah_lebak_akhir_bulan}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        )}
      </div>
    );
};

export default LaporanProduksiComp;
