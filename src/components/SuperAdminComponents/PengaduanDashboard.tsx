import { useEffect, useState, useRef } from "react";
import users from "../../assets/photos/account-avatar-profile-user-svgrepo-com.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { pengaduan } from "../../data/dataType";
import { useComplaint } from "../../features/complaint/useComplaint";

const PengaduanDashboard = () => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [resulData, setResultData] = useState<pengaduan[]>([]);
  const [toggle, setToggle] = useState<Boolean>(false);
  const navigate = useNavigate();
  const detailProfileRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    setClickedIndex(index);
    setToggle(!toggle);
  };
  const clickCard = (id: number, index: number) => {
    navigate(`/pengaduan-masyarakat/balas-pengaduan/${id}`);
    console.log(index);
  };

  const { filteredUsers, isLoading } = useComplaint();

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (
  //     detailProfileRef.current &&
  //     !detailProfileRef.current.contains(event.target as Node)
  //   ) {
  //     setClickedIndex(null);
  //   }
  // };
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/api/complaints");
  //     setResultData(response.data.data);
  //   } catch (err) {
  //     console.error("Error fetching data:", err);
  //     return null;
  //   }
  // };
  const deleteData = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/complaints/${id}`);
      await axios.delete(`http://localhost:8000/api/replies/${id}`);
    } catch (err) {
      return null;
    } finally {
      window.location.reload();
    }
  };
  const convertToLongDate = (isoString: string) => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    const day = date.getDate();
    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
      date
    );
    return `${day} ${month} ${year}`;
  };
  const convertToLongDateTimeWithTime = (isoString: string) => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds}`;
  };

  useEffect(() => {
    if (filteredUsers) {
      setResultData(filteredUsers);
    }
    // fetchData();
  }, [filteredUsers]);

  return (
    <div>
      <h3 className="font-bold text-[16px] mt-6">Pengaduan Masyarakat</h3>
      <div className="mt-5 flex justify-between gap-5 flex-wrap">
        {resulData.slice(0, 6).map((data, index) => {
          return (
            <div key={index} className="flex relative">
              <div className="flex h-[148px] border border-[#F0F0F0] shadow-sm rounded-xl items-center gap-4 ">
                <div className=" w-[130px]">
                  <img
                    className="ml-2 w-[130px] h-[130px] rounded-full object-cover"
                    src={users}
                    alt=""
                  />
                </div>
                <div className="mr-2 h-[137px]">
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center  w-full ">
                      <div className="flex justify-between items-center gap-1">
                        <img
                          className="w-[15px] h-[14px] rounded-full"
                          src={users}
                          alt=""
                        />
                        <p>{data.name}</p>
                      </div>
                      <button
                        className="detail-btn"
                        onClick={() => handleClick(index)}
                        type="button"
                      >
                        <span>
                          <svg
                            width="30px"
                            height="30px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z"
                              fill="#1C274C"
                            />
                            <path
                              d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                              fill="#1C274C"
                            />
                            <path
                              opacity="0.5"
                              d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                              fill="#1C274C"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-4 text-[8px] mb-3">
                    <p>{convertToLongDate(data.updated_at)}</p>
                    <p>{convertToLongDateTimeWithTime(data.updated_at)}</p>
                  </div>
                  <p className="text-[12px] w-[250px] h-[70px] text-ellipsis overflow-hidden">
                    {data.description}
                  </p>
                </div>
              </div>
              {/* <div className="w-[63px] h-[55px] "></div> */}
              {clickedIndex === index && toggle && (
                <div
                  // ref={detailProfileRef}
                  className="detailProfile w-[80px] h-[25px] shadow-xl text-[12px] rounded-md mt-8 absolute top-0 right-[-40px] z-30"
                >
                  <button
                    onClick={() => clickCard(data.id, index)}
                    className="h-full w-full bg-custom-gradient rounded-md text-white"
                  >
                    Detail
                  </button>
                  {/* <button onClick={()=>deleteData(data.id)} className="h-[50%] w-full">Hapus</button> */}
                </div>
              )}
            </div>
          );
        })}

        {[1, 2, 3, 4, 5, 6].map((index) => {
          return (
            <div key={index} className={`flex relative ${isLoading ? "":"hidden"}`}>
              <div className="flex h-[148px] border border-[#F0F0F0] shadow-sm rounded-xl items-center gap-3 ">
                <div className=" w-[130px]">
                  <img
                    className="ml-2 w-[130px] h-[130px] rounded-full object-cover"
                    src={users}
                    alt=""
                  />
                </div>
                <div className="mr-2 h-[137px]">
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center  w-full ">
                      <div className="flex justify-between items-center gap-1">
                        <img
                          className="w-[15px] h-[14px] rounded-full"
                          src={users}
                          alt=""
                        />
                        <p>....</p>
                      </div>
                      <button
                        className="detail-btn"
                        onClick={() => handleClick(index)}
                        type="button"
                      >
                        <span>
                          <svg
                            width="30px"
                            height="30px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z"
                              fill="#1C274C"
                            />
                            <path
                              d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                              fill="#1C274C"
                            />
                            <path
                              opacity="0.5"
                              d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                              fill="#1C274C"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-4 text-[8px] mb-3">
                    <p className="w-10 h-1 bg-slate-200 animate-shimmer bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 bg-[length:400%_100%]"></p>
                    <p className="w-10 h-1 bg-slate-200 animate-shimmer bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 bg-[length:400%_100%]"></p>
                  </div>
                  <p className="text-[12px] w-[250px] h-[70px] bg-slate-200 animate-shimmer bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 bg-[length:400%_100%] text-ellipsis overflow-hidden">
                    
                  </p>
                </div>
              </div>
              {/* <div className="w-[63px] h-[55px] "></div> */}
              {clickedIndex === index && toggle && (
                <div
                  // ref={detailProfileRef}
                  className="detailProfile w-[80px] h-[25px] shadow-xl text-[12px] rounded-md mt-8 absolute top-0 right-[-40px] z-30"
                >
                  <button
                    
                    className="h-full w-full bg-custom-gradient rounded-md text-white"
                  >
                    Detail
                  </button>
                  {/* <button onClick={()=>deleteData(data.id)} className="h-[50%] w-full">Hapus</button> */}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PengaduanDashboard;
