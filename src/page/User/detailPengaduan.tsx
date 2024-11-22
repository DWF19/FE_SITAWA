import React, { useEffect, useState } from "react";
import logo from "../../assets/logo/440px-Lambang_Kabupaten_Sumbawa.png";
import { useParams } from "react-router-dom";
import NavHasilPengaduan from "../../components/UserComponents/NavHasilPengaduan";
import FooterLogin from "../../components/loginregistcomp/FooterLogin";
import { useComplaintById } from "../../features/complaint/useComplaintById";
import { useRepliesById } from "../../features/replies/useRepliesById";
import contoh from '../../assets/photos/ansel.png'

import {
  convertToLongDate,
  convertToLongDateTimeWithTime,
} from "../../features/date/dateUtils";
import { pengaduan, repliesType } from "../../data/dataType";

const detailPengaduan = () => {
  const { id } = useParams();
  const { data, isLoading } = useComplaintById(Number(id));
  const [complaint, setComplaint] = useState<pengaduan>({} as pengaduan);
  const [replies, setReplies] = useState<repliesType>({} as repliesType);
  const { dataReplies } = useRepliesById(Number(id));

  useEffect(()=>{
    if(data){
      setComplaint(data)
    }
    if(dataReplies){
      setReplies(dataReplies)

    }

  },[data, dataReplies])

  return (
    <div>
      <div className={``}>
        <NavHasilPengaduan />
        <div className="scrollbar-hide w-full overflow-auto h-[100vh] ">
          <div
            className={`w-full h-[100vh] flex items-center justify-center ${
              isLoading ? "" : "hidden"
            } `}
          >
            <div className="loader-pengaduan"></div>
          </div>
          <div className={`flex  justify-center ${isLoading ? "hidden" : ""}`}>
            <div className="card-detail w-[1230px]  border border-[#f0f0f0] shadow-2xl my-36 rounded-xl">
              <div className="flex justify-between items-center py-[49px] border-b-2">
                <p className="ml-5 text-[16px]">Hasil Pengaduan </p>
              </div>
              <div className="flex-box-card flex  mt-5 w-full">
                <div className="image-cover">
                  <img
                    className="img-pengaduan rounded-lg mx-5 w-[478px] h-[308px]"
                    src={complaint.image}
                    alt=""
                  />
                </div>
                <div className="detail-pengaduan-profile px-2 w-[752px] ">
                  <div className="profile-1">
                    <div className="profile-1-1 flex justify-between items-center">
                      <p className="complaint-name text-[20px] font-bold">{complaint.name}</p>
                      <div className="flex items-center gap-5">
                        <p className="px10-detail text-[12px]">
                          {convertToLongDate(complaint.updated_at ?? "")}
                        </p>
                        <p
                          className={`px10-detail text-[12px]  ${
                            replies.status === "selesai"
                              ? "text-[#06D001]"
                              : "text-[#E5D206]"
                          }`}
                        >
                          {replies.status === "selesai"
                            ? "Selesai"
                            : "Diproses"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="profile-1 mt-2">
                    <div className="profile-1-1 flex gap-1 ">
                      <span className="mt-[2px]">
                        <svg
                          className="px10-detail-icon"
                          width="20"
                          height="20"
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
                      <p className="px10-detail text-[12px] max-w-[70%]">
                        {complaint.address}
                      </p>
                    </div>
                  </div>
                  <div className="profile-1-1-1">
                    <div className="profile-1-1">
                      <p className="detail-subject px14-detail mt-[41px] font-bold text-[18px]">
                        {complaint.subject}
                      </p>
                      <p className="detail-desc px12-detail scrollbar-hide mt-5 max-w-[553px] max-h-[147px] overflow-auto text-black text-[14px]">
                        {complaint.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px-5 mt-10">
                <div className="scrollbar-hide border rounded-xl h-[175px] ">
                  <div className="px-2 py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <img className="w-[20px] h-[25px] " src={logo} alt="" />
                        <p className="px14-detail font-bold">
                          Dinas Pertanian Kab. Sumbawa
                        </p>
                      </div>
                    </div>
                    <p className="px12-detail mt-3 overflow-auto  h-[125px]">{replies.message}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mr-5 my-2 text-[12px]">
                <p className="px10-detail">
                  {convertToLongDateTimeWithTime(replies.updated_at ?? "")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLogin />
    </div>
  );
};

export default detailPengaduan;
