// import { GlobalContext } from "../GlobalContext";
import checklist from "../../assets/checklist-check-approve-ok-approved-list-svgrepo-com.png";
import { globalState } from "../../GlobalContext";
const TambahhAkunPopUp = () => {
  const { state } = globalState();
  // --------- state ----------
  const handleLogin = () => {
    state.registToggle = false;
    window.location.reload();
  };

  return (
    <div>
      <div>
        <div
          className={`bg-white w-[363px] h-[312px] rounded-md border shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 animate__animated animate__fadeIn `}
        >
          <div className="flex justify-end p-2"></div>
          <div className=" flex justify-center mt-7 items-center">
            <div className="flex justify-center items-center ">
              <img
                className="w-[140px] h-[140px] object-cover"
                src={checklist}
                alt=""
              />
            </div>
          </div>
          <div className=" flex justify-center  mt-2">
            <p className="max-w-[170px] text-center font-bold text-black text-[18px]">
              Register Berhasil
            </p>
          </div>
          <div className="w-full flex justify-center mt-[20px]">
            <button
              onClick={handleLogin}
              className="w-[81px] h-[35px] rounded-full border-none bg-custom-gradient text-white"
            >
              Oke!!!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahhAkunPopUp;
