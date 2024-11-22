import logoChecklist from "../../assets/icon/png_gys96.png";
import { globalState } from "../../GlobalContext";
const PopUpProduction = () => {
  const { setState } = globalState();
  // --------- state ----------
  const okeBtn = () => {
    setState((prevState) => {
      return {
        ...prevState,
        productionToggle: false,
      };
    })
    window.location.reload();
  };

  return (
    <div>
      <div>
        <div
          className={`bg-white w-[363px] h-[312px] rounded-md border shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 animate__animated animate__fadeIn `}
        >
          <div className="flex justify-end p-2"></div>
          <div className=" flex justify-center mt-5 items-center">
            <div className="flex justify-center items-center ">
              <img
                className="w-[110px] h-[110px] object-cover"
                src={logoChecklist}
                alt=""
              />
            </div>
          </div>
          <div className=" flex justify-center  mt-5">
            <p className="max-w-[170px] text-center font-bold text-black text-[18px]">
              Produksi Berhasil Ditambahkan
            </p>
          </div>
          <div className="w-full flex justify-center mt-[20px]">
            <button
              onClick={okeBtn}
              className="w-[81px] h-[35px] rounded-full border-none bg-custom-gradient text-white"
            >
              Oke
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpProduction;
