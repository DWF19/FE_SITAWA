export type pengaduan = {
  description: string;
  id: number;
  name: string;
  subject: string;
  image: string;
  address: string;
  phone: string;
  created_at: string;
  updated_at: string;
};

export interface repliesType {
  id: number;
  complaint_id: number;
  user_id: number;
  message: string;
  created_at: string;
  updated_at: string;
  status: string;
}

export type NewData = {
  complaint_id: number;
  user_id: number;
  message: string;
  status: string;
};
export type NewReplies = {
  message: string;
};
export interface ApiResponse {
  success: boolean;
  message: string;
  data: NewData;
}

export type NewaddPengaduan = {
  name: string;
  phone: string;
  address: string;
  subject: string;
  description: string;
  latitude: string;
  longitude: string;
  image: File;
};

export type NewaddPengaduanResponse = {
  success: boolean;
  message: string;
  data: NewaddPengaduan;
};

export type registFieldType = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
};

export type editUserType = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
}

export type userType = {
  id: number;
  name: string;
  email: string;
  role: string;
  address: string;
  phone: string;
};

export interface State {
  actionHapusPengaduan: boolean;
  actionHapusPerangkat: boolean;
  yearChoiceed?: string;
  actionLogOut: boolean;
  actionAddData: boolean;
  getId?: number;
  getProductionId?: number
  path: string;
  loadingProduksi: boolean;
  dataReplies: Array<repliesType>;
  dataComplaints: Array<pengaduan>;
  latitude: string;
  longitude: string;
  loading: boolean;
  loginToggle: boolean;
  registToggle: boolean;
  productionToggle: boolean;
  toggle: boolean;
  actionHapusProduksi:boolean
}
export const fieldProduksi = [
  "Tanaman Akhir Bulan Yang Lalu",
  "Panen",
  "Tanam",
  "Puso / Rusak",
  "Tanaman Akhir Bulan Yang Laporan",
];
export const fullMonths = [
  { name: "Januari" },
  { name: "Februari" },
  { name: "Maret" },
  { name: "April" },
  { name: "Mei" },
  { name: "Juni" },
  { name: "Juli" },
  { name: "Agustus" },
  { name: "September" },
  { name: "Oktober" },
  { name: "November" },
  { name: "Desember" },
];

export interface formProduksi {
  id?: number;
  user_id?: number;
  kecamatan: string;
  bulan: string;
  tahun: string;
  // jumlah Padi //
  jmlh_pd_tanaman_akhir_bln_lalu?: string;
  jmlh_pd_panen?: string;
  jmlh_pd_tanam?: string;
  jmlh_pd_rusak?: string;
  jmlh_pd_panen_akhir_bln_lap?: string;
  // jumlah Padi //
  // Hibrida - Bantuan Pemerintah //
  hbp_tanaman_akhir_bulan_lalu?: string;
  hbp_panen?: string;
  hbp_tanam?: string;
  hbp_rusak?: string;
  hbp_panen_akhir_bulan_lap?: string;
  // Hibrida - Bantuan Pemerintah //
  // Hibrida - Non Bantuan Pemerintah //
  hnbp_tanaman_akhir_bulan_lalu?: string;
  hnbp_panen?: string;
  hnbp_tanam?: string;
  hnbp_rusak?: string;
  hnbp_panen_akhir_bulan_lap?: string;
  // Hibrida - Non Bantuan Pemerintah //
  // Inbrida - Bantuan Pemerintah //
  ibp_tanaman_akhir_bulan_lalu?: string;
  ibp_panen?: string;
  ibp_tanam?: string;
  ibp_rusak?: string;
  ibp_panen_akhir_bulan_lap?: string;
  // Inbrida - Bantuan Pemerintah //
  // Inbrida - Non Bantuan Pemerintah //
  inbp_tanaman_akhir_bulan_lalu?: string;
  inbp_panen?: string;
  inbp_tanam?: string;
  inbp_rusak?: string;
  inbp_panen_akhir_bulan_lap?: string;
  // Inbrida - Non Bantuan Pemerintah //
  // Sawah Irigasi //
  si_tanaman_akhir_bulan_lalu?: string;
  si_panen?: string;
  si_tanam?: string;
  si_rusak?: string;
  si_panen_akhir_bulan_lap?: string;
  // Sawah Irigasi //
  // Sawah Tadah Hujan //
  st_hujan_tanaman_akhir_bulan_lalu?: string;
  st_hujan_panen?: string;
  st_hujan_tanam?: string;
  st_hujan_rusak?: string;
  st_hujan_panen_akhir_bulan_lap?: string;
  // sawah rawa pasang surut //
  srps_tanaman_akhir_bulan_lalu?: string;
  srps_panen?: string;
  srps_tanam?: string;
  srps_rusak?: string;
  srps_panen_akhir_bulan_lap?: string;
  // sawah rawa pasang surut //
  // sawah rawa lebak //
  srl_tanaman_akhir_bulan_lalu?: string;
  srl_panen?: string;
  srl_tanam?: string;
  srl_rusak?: string;
  srl_panen_akhir_bulan_lap?: string;
  // sawah rawa lebak //

  // field db //
  jumlah_padi_akhir_bulan_lalu?: string;
  jumlah_padi_panen?: string;
  jumlah_padi_tanam?: string;
  jumlah_padi_rusak?: string;
  jumlah_padi_akhir_bulan?: string;

  jenis_padi_akhir_bulan_lalu_hibrida?: string;
  jenis_padi_panen_hibrida?: string;
  jenis_padi_tanam_hibrida?: string;
  jenis_padi_rusak_hibrida?: string;
  jenis_padi_akhir_bulan_hibrida?: string;

  jenis_padi_akhir_bulan_lalu_non_hibrida?: string;
  jenis_padi_panen_non_hibrida?: string;
  jenis_padi_tanam_non_hibrida?: string;
  jenis_padi_rusak_non_hibrida?: string;
  jenis_padi_akhir_bulan_non_hibrida?: string;

  jenis_padi_akhir_bulan_lalu_inbrida?: string;
  jenis_padi_panen_inbrida?: string;
  jenis_padi_tanam_inbrida?: string;
  jenis_padi_rusak_inbrida?: string;
  jenis_padi_akhir_bulan_inbrida?: string;

  jenis_padi_akhir_bulan_lalu_non_inbrida?: string;
  jenis_padi_panen_non_inbrida?: string;
  jenis_padi_tanam_non_inbrida?: string;
  jenis_padi_rusak_non_inbrida?: string;
  jenis_padi_akhir_bulan_non_inbrida?: string;

  sawah_irigasi_akhir_bulan_lalu?: string;
  sawah_irigasi_panen?: string;
  sawah_irigasi_tanam?: string;
  sawah_irigasi_rusak?: string;
  sawah_irigasi_akhir_bulan?: string;

  sawah_tadah_hujan_akhir_bulan_lalu?: string;
  sawah_tadah_hujan_panen?: string;
  sawah_tadah_hujan_tanam?: string;
  sawah_tadah_hujan_rusak?: string;
  sawah_tadah_hujan_akhir_bulan?: string;

  sawah_pasang_surut_akhir_bulan_lalu?: string;
  sawah_pasang_surut_panen?: string;
  sawah_pasang_surut_tanam?: string;
  sawah_pasang_surut_rusak?: string;
  sawah_pasang_surut_akhir_bulan?: string;
  
  sawah_lebak_akhir_bulan_lalu?: string;
  sawah_lebak_panen?: string;
  sawah_lebak_tanam?: string;
  sawah_lebak_rusak?: string;
  sawah_lebak_akhir_bulan?: string;
}
