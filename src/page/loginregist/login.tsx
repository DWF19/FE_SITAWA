import { useState } from "react";
import NavLogin from "../../components/loginregistcomp/NavLogin";
import imglogin from "../../assets/photos/WhatsApp Image 2024-08-21 at 12.37.39.jpeg";
import { formUser } from "../../data/data";
import logo from "../../assets/logo/sumbawa.jpeg";
import FooterLogin from "../../components/loginregistcomp/FooterLogin";
import { useAuth } from "../../auth/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useHandleLogin } from "../../features/loginAuth/useHandleLogin";
import LoginPopUp from "../../components/loginregistcomp/LoginPopUp";
import { globalState } from "../../GlobalContext";
import NavHome from "../../components/UserComponents/NavHome";
const login = () => {
  const { state } = globalState();
  const mutation = useHandleLogin();

  const [color, setColor] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const {login, logout} = useAuth();
  const handleLogin = (e: any) => {
    if(email === "" || password === "") {
      alert("Email dan Password harus diisi");
      return
    }
    e.preventDefault();
    mutation.mutate({ email, password });
    
  };

  return (
    <div className="h-[100vh] relative">
      <div
        className={`w-full h-[100vh] absolute opacity-50 bg-black z-20 ${
          state.loginToggle ? "" : "hidden"
        }`}
      ></div>
      <div
        className={`w-full h-[100vh] absolute  z-20 ${
          mutation.status === "pending" ? "" : "hidden"
        }`}
      ></div>
      <NavHome/>
      <div></div>
      <div className="h-full w-full flex justify-center ">
        <div className={state.loginToggle ? "" : "hidden"}>
          <LoginPopUp />
        </div>
        <div className="w-[1044px] h-[599px] border border-[#F0F0F0] flex shadow-xl rounded-xl mt-40">
          <div className="form-user w-[522px] border-r">
            <h1 className="text-center text-[24px] text-black mt-[71px]">
              Masuk
            </h1>
            <form onSubmit={handleLogin} className="w-full mt-[78px]">
              <div className="flex justify-center">
                <div>
                  {formUser.map((data, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setColor(index)}
                        className="w-[433px] h-[34px]  relative mb-10"
                      >
                        <div className="h-[12px]"></div>
                        <label
                          className={`absolute top-0 ml-[42px] bg-white px-1`}
                          htmlFor=""
                        >
                          {data.label}
                        </label>
                        <div
                          className={`w-[433px] h-[44px] border rounded-full flex ${
                            color == index && "border-[#9BEC00]"
                          } items-center`}
                        >
                          <input
                          
                            onChange={
                              index == 0
                                ? (e) => setEmail(e.target.value)
                                : (e) => setPassword(e.target.value)
                            }
                            className="w-[334px] h-[24px] ml-[46px] outline-none mt-1"
                            type={data.type}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-end">
                    {/* <button className="text-[#9BEC00]">Lupa Password ?</button> */}
                    {/* <p onClick={logout}>logout</p> */}
                  </div>
                  <div className="flex justify-center items-center mt-10">
                    <button
                      onClick={handleLogin}
                      className={`w-full h-[44px] rounded-full border bg-custom-gradient text-white mt-5 flex justify-center items-center `}
                    >
                      <p
                        className={`text-[16px] text-white ${
                          mutation.status === "pending" ? "hidden" : "block"
                        }`}
                      >
                        Masuk
                      </p>
                      <div
                        className={`login-loader ${
                          mutation.status === "pending" ? "block" : "hidden"
                        }`}
                      ></div>
                    </button>
                  </div>
                  {/* <div className="w-full flex justify-center gap-2 mt-2">
                    <p>Belum punya akun ?</p>
                    <p className="text-[#9BEC00] cursor-pointer">Daftar</p>
                  </div> */}
                </div>
              </div>
            </form>
          </div>
          <div className="img-form relative">
            <div className=" right-[12.5rem] mt-2 absolute flex gap-2 items-center ">
              <img className="w-[39px] h-[57px]" src={logo} alt="" />
              <p className="text-[20px] text-[#9BEC00] font-bold s">si TAWA</p>
            </div>
            <img
              className="w-[522px] h-[599px] object-cover object-center rounded-tr-xl rounded-br-xl opacity-30"
              src={imglogin}
              alt=""
            />
          </div>
        </div>
      </div>
      <FooterLogin />
    </div>
  );
};

export default login;
