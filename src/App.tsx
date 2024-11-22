import { Route, Routes } from "react-router-dom";
import login from "./page/loginregist/login.tsx";
import hasilpengaduan from "./page/User/hasilpengaduan.tsx";
import pengaduan from "./page/User/pengaduan.tsx";
import detailPengaduan from "./page/User/detailPengaduan.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";
import PengaduanMasyarakat from "./page/superadmin/PengaduanMasyarakat.tsx";
import Beranda from "./page/superadmin/Beranda.tsx";
import PerangkatDesa from "./page/superadmin/PerangkatDesa.tsx";
import HasilPengaduan from "./page/superadmin/HasilPengaduan.tsx";
import Home from "./page/User/Home.tsx";
import Tambahakun from "./page/superadmin/Tambahakun.tsx";
import PerangkatKecamatan from "./page/perangkat-kecamatan/PerangkatKecamatan.tsx";
import LaporanProduksi from "./page/superadmin/LaporanProduksi.tsx";
import HasilProduksi from "./page/superadmin/HasilProduksi.tsx";
import ListProduksi from "./page/superadmin/ListProduksi.tsx";
import EditAkunKecamatan from "./page/superadmin/EditAkunKecamatan.tsx";
import ListProduksiKecamatan from "./page/perangkat-kecamatan/ListProduksiKecamatan.tsx";
import LaporanProduksiKec from "./page/perangkat-kecamatan/LaporanProduksiKec.tsx";
import EditProfilKecamatan from "./page/perangkat-kecamatan/EditProfilKecamatan.tsx";
import Error404 from "./components/Error404/Error404.tsx";



const App = () => {
  
  return (
    <div className=" relative  w-full h-[100vh] ">
    
        <Routes>
          {/*----- route for user -------*/}

          <Route path="/" Component={Home} />
          <Route path="/pengaduan" Component={pengaduan} />
          <Route path="/hasil-pengaduan" Component={hasilpengaduan} />
          <Route
            path="/hasil-pengaduan/detail-pengaduan/:id"
            Component={detailPengaduan}
          />
          {/*----- route for user -------*/}

          {/*----- route for superadmin -------*/}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Beranda />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pengaduan-masyarakat"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PengaduanMasyarakat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pengaduan-masyarakat/balas-pengaduan/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <HasilPengaduan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perangkat-kecamatan"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PerangkatDesa />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perangkat-kecamatan/edit-akun/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditAkunKecamatan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perangkat-kecamatan/tambah-akun"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Tambahakun />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hasil-produksi"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
               <HasilProduksi/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/hasil-produksi/list-produksi"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ListProduksi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hasil-produksi/list-produksi/laporan-produksi/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <LaporanProduksi />
              </ProtectedRoute>
            }
          />
          {/*----- route for superadmin -------*/}


          {/*----- route for kecamatan -------*/}
          <Route
            path="/beranda"
            element={
              <ProtectedRoute allowedRoles={["kecamatan"]}>
                <ListProduksiKecamatan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buat-produksi"
            element={
              <ProtectedRoute allowedRoles={["kecamatan"]}>
                <PerangkatKecamatan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/laporan-produksi/:id"
            element={
              <ProtectedRoute allowedRoles={["kecamatan"]}>
                <LaporanProduksiKec />
              </ProtectedRoute>
            }
          />
          <Route
            path="/beranda/edit-profile"
            element={
              <ProtectedRoute allowedRoles={["kecamatan"]}>
                <EditProfilKecamatan/>
              </ProtectedRoute>
            }
          />
          {/*----- route for kecamatan -------*/}
          <Route path="/login" Component={login} />
          <Route path="/404" Component={Error404} />
          <Route path="*" Component={Error404} />
        </Routes>
    
    </div>
  );
};
export default App;
