import StatistikPanen from "../../components/SuperAdminComponents/StatistikPanen";
import PengaduanDashboard from "../../components/SuperAdminComponents/PengaduanDashboard";
import UsersDashboard from "../../components/SuperAdminComponents/UsersDashboard";
import DashboardSidebar from "../../components/sidebarComponents/DashboardSidebar";
import Navbar from "../../components/SuperAdminComponents/Navbar";
import ExitPopup from "../../components/SuperAdminComponents/ExitPopUp";
import { globalState } from "../../GlobalContext";

const Beranda = () => {
  const { state } = globalState();
  return (
    <div className="relative">
      <div
        className={` w-full h-[100vh] absolute   ${
          state.actionLogOut ? "bg-black opacity-50 z-20" : ""
        }`}
      ></div>
      <div className="">
        <ExitPopup />
      </div>
      <Navbar />
      <div className="relative">
        <div></div>
        <div className="flex overflow-y-hidden">
          <DashboardSidebar bg={"bg-custom-gradient"} />
          <div className="h-[100vh] overflow-auto   w-full  pt-36 flex justify-center scrollbar-hide">
            <div className=" w-[85%]">
              <div className="flex justify-between text-[12px] font-bold text-[#858585]">
                <div className="flex ">
                  <p className="border-r-[1px] border-[#858585] pr-2">Admin</p>
                  <p className="border-l-[1px] border-[#858585] pl-2">
                    Dashboard
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

                <PengaduanDashboard />

              <UsersDashboard />
              <StatistikPanen />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Beranda;
