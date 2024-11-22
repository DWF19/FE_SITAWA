import FooterLogin from "../../components/loginregistcomp/FooterLogin";
import { useNavigate } from "react-router-dom";
import NavHasilPengaduan from "../../components/UserComponents/NavHasilPengaduan";
import { useComplaint } from "../../features/complaint/useComplaint";
import { convertToLongDate } from "../../features/date/dateUtils";
import { useReplies } from "../../features/replies/useReplies";
import contoh from '../../assets/photos/ansel.png'



const hasilpengaduan = () => {
  // ----------- State ------------
  const { filteredUsers, isLoading, setSearchInput } = useComplaint();
  const { dataReplies } = useReplies();
  const navigate = useNavigate();

  return (
    <div>
       <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-20 ${
            isLoading ? "" : "hidden"
          }`}
        >
          <div className="loader-pengaduan"></div>
        </div>
      <NavHasilPengaduan />
      <div className="scrollbar-hide w-full h-[100vh] overflow-auto  ">
       
        <div className="flex justify-center ">
          <div className="mt-32 w-full flex justify-center h-full">
            <div className="w-full  h-full relative">
              <div className="flex justify-between items-center p-6 ">
                <h3 className="text-pengaduan font-bold text-[16px]">
                  Hasil Pengaduan
                </h3>
                <div className="flex gap-4">
                  <div className="search w-[216px] h-[40px] border border-[#06D001] rounded-full flex justify-between items-center">
                    <span className="flex items-center ml-5">
                      <svg
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.80357 12.1429C10.0088 12.1429 12.6071 9.64844 12.6071 6.57143C12.6071 3.49441 10.0088 1 6.80357 1C3.59835 1 1 3.49441 1 6.57143C1 9.64844 3.59835 12.1429 6.80357 12.1429Z"
                          stroke="#858585"
                        />
                        <path
                          d="M11.3174 10.9048L14.5415 14"
                          stroke="#858585"
                          stroke-linecap="square"
                        />
                      </svg>
                    </span>
                    <input
                    onChange={(e) => setSearchInput(e.target.value)}
                      className="input-search w-[70%] mr-5  outline-none"
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>

              {/* --------- card pengaduan ----------------------- */}
              <div className=" w-full flex justify-center h-full">
                <div className="scrollbar-hide w-full h-full py-3 flex flex-wrap justify-center gap-4 ">
                  {filteredUsers.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() =>
                          navigate(
                            `/hasil-pengaduan/detail-pengaduan/${item.id}`
                          )
                        }
                        className="card-pengaduan border rounded-lg w-[616px] cursor-pointer hover:shadow-2xl h-[255px]"
                      >
                        <div className="p-3 flex gap-3">
                          <div className="img-cover rounded-xl flex justify-center w-[230px] h-[230px] ">
                            <img
                              className="rounded-xl object-cover "
                              src={item.image}
                              alt=""
                            />
                          </div>
                          <div className="w-[426px]">
                            <div className="flex justify-between items-center">
                              <p className="name font-bold">{item.name}</p>
                              <div className=" flex gap-2 text-[10px]">
                                <p className="date">
                                  {convertToLongDate(item.updated_at)}
                                </p>

                                <p
                                  className={`status  ${
                                    dataReplies
                                      ?.map((data) =>
                                        data.complaint_id.toString()
                                      )
                                      .includes(item.id.toString())
                                      ? "text-[#06D001]"
                                      : "text-[#E5D206]"
                                  }`}
                                >
                                  {dataReplies
                                    ?.map((data) =>
                                      data.complaint_id.toString()
                                    )
                                    .includes(item.id.toString())
                                    ? "Selesai"
                                    : "Diproses"}
                                </p>
                              </div>
                            </div>
                            <div className="flex  mt-1 ">
                              <span className="">
                                <svg
                                  className="svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M15.625 8.125C15.625 6.63316 15.0324 5.20242 13.9775 4.14752C12.9226 3.09263 11.4918 2.5 10 2.5C8.50816 2.5 7.07742 3.09263 6.02252 4.14752C4.96763 5.20242 4.375 6.63316 4.375 8.125C4.375 10.4325 6.22125 13.44 10 17.0425C13.7788 13.44 15.625 10.4325 15.625 8.125ZM10 18.75C5.41625 14.5837 3.125 11.0413 3.125 8.125C3.125 6.30164 3.84933 4.55295 5.13864 3.26364C6.42795 1.97433 8.17664 1.25 10 1.25C11.8234 1.25 13.572 1.97433 14.8614 3.26364C16.1507 4.55295 16.875 6.30164 16.875 8.125C16.875 11.0413 14.5837 14.5837 10 18.75Z"
                                    fill="#06D001"
                                  />
                                  <path
                                    d="M10 10C10.4973 10 10.9742 9.80246 11.3258 9.45083C11.6775 9.09919 11.875 8.62228 11.875 8.125C11.875 7.62772 11.6775 7.15081 11.3258 6.79917C10.9742 6.44754 10.4973 6.25 10 6.25C9.50272 6.25 9.02581 6.44754 8.67417 6.79917C8.32254 7.15081 8.125 7.62772 8.125 8.125C8.125 8.62228 8.32254 9.09919 8.67417 9.45083C9.02581 9.80246 9.50272 10 10 10ZM10 11.25C9.1712 11.25 8.37634 10.9208 7.79029 10.3347C7.20424 9.74866 6.875 8.9538 6.875 8.125C6.875 7.2962 7.20424 6.50134 7.79029 5.91529C8.37634 5.32924 9.1712 5 10 5C10.8288 5 11.6237 5.32924 12.2097 5.91529C12.7958 6.50134 13.125 7.2962 13.125 8.125C13.125 8.9538 12.7958 9.74866 12.2097 10.3347C11.6237 10.9208 10.8288 11.25 10 11.25Z"
                                    fill="#06D001"
                                  />
                                </svg>
                              </span>

                              <p className="location text-[10px] w-[250px] ">
                                {item.address}
                              </p>
                            </div>
                            <p className="subjek text-[12px] mt-5 font-bold w-[full] text-ellipsis overflow-hidden">
                              {item.subject}
                            </p>
                            <div className="">
                              <p className="h-[107px] text-ellipsis overflow-hidden deskripsi text-[12px] mt-5 ">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLogin />
    </div>
  );
};

export default hasilpengaduan;
