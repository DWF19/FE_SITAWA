import { useEffect, useState } from "react";
import logo from "../../assets/logo/sumbawa.jpeg";
import photoProfile from "../../assets/photos/account-avatar-profile-user-svgrepo-com.png";
import { useComplaint } from "../../features/complaint/useComplaint";
import { useReplies } from "../../features/replies/useReplies";
import { pengaduan, repliesType } from "../../data/dataType";

const Navbar = () => {
  const { filteredUsers } = useComplaint();
  const { dataReplies, isLoadingReplies } = useReplies();
  const [dataComplaint, setDataComplaint] = useState<pengaduan[]>([]);
  const [dataReplies1, setDataReplies] = useState<repliesType[]>([]);
  const [tglNotif, setTglNotif] = useState<boolean>(false);

  useEffect(() => {
    if (filteredUsers) {
      setDataComplaint(filteredUsers);
    }
    if (dataReplies) {
      setDataReplies(dataReplies);
    }
  }, [filteredUsers, dataReplies]);
  return (
    <div className="bg-[#FFFFFF] flex items-center w-full h-[83px] border border-[#F7F7F7] fixed  z-10">
      <div className="relative flex justify-between w-full items-center">
        <div className="logo flex gap-2 items-center ml-[41px]">
          <img className="w-[39px] h-[57px]" src={logo} alt="" />
          <p className="text-[20px] text-[#9BEC00] font-bold ">si TAWA</p>
        </div>
        {/* <div className="search h-[40px] w-[442px] rounded-[50px] flex items-center justify-between border border-[#9BEC00]">
          <span className="flex items-center ml-7">
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
          <input type="text" placeholder="search for anything" />
          <div className="search-logo"></div>
        </div> */}
        <div className="profile flex justify-between items-center gap-2 mr-[41px] ">
          <div className="flex items-center relative ">
            <div className="w-6 h-14"></div>
            <p
              className={`text-white bg-red-500 w-6 h-6  text-[10px] text-center flex justify-center rounded-full items-center absolute top-0 left-0 ${
                isLoadingReplies ? "hidden" : ""
              } ${
                dataComplaint.length - dataReplies1.length <= 0 ? "hidden" : ""
              }`}
            >
              {!isLoadingReplies
                ? dataComplaint.length - dataReplies1.length < 0
                  ? 0
                  : dataComplaint.length - dataReplies1.length
                : ""}
            </p>
            <span onClick={() => setTglNotif(!tglNotif)} className="cursor-pointer flex items-center">
              <svg
                width="35"
                height="35"
                viewBox="0 0 28 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.50052 2.71463C7.64761 2.54534 7.72 2.3272 7.70216 2.10702C7.68432 1.88685 7.57767 1.68219 7.4051 1.53699C7.23253 1.39179 7.00781 1.31762 6.77916 1.33041C6.55052 1.34319 6.33619 1.44191 6.18218 1.60538L4.67485 3.27038C3.82013 4.21489 3.33696 5.41909 3.30985 6.67238L3.24335 9.73125C3.24098 9.84205 3.26126 9.95222 3.30304 10.0555C3.34481 10.1587 3.40727 10.253 3.48685 10.333C3.56642 10.4129 3.66154 10.477 3.7668 10.5215C3.87205 10.5661 3.98536 10.5901 4.10027 10.5924C4.21517 10.5947 4.32942 10.5752 4.43649 10.5349C4.54356 10.4946 4.64135 10.4344 4.72428 10.3576C4.80721 10.2809 4.87366 10.1892 4.91983 10.0877C4.96599 9.9862 4.99098 9.87693 4.99335 9.76613L5.05868 6.70838C5.0774 5.85082 5.40819 5.02691 5.99318 4.38075L7.50052 2.71463Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.27652 8.6625C7.35487 7.4589 7.90596 6.32934 8.8176 5.50377C9.72924 4.67819 10.9329 4.21867 12.1835 4.21875H12.8334V3.375C12.8334 3.07663 12.9563 2.79048 13.1751 2.5795C13.3939 2.36853 13.6906 2.25 14 2.25C14.3094 2.25 14.6062 2.36853 14.825 2.5795C15.0438 2.79048 15.1667 3.07663 15.1667 3.375V4.21875H15.8165C17.0672 4.21867 18.2708 4.67819 19.1824 5.50377C20.0941 6.32934 20.6452 7.4589 20.7235 8.6625L20.9814 12.6383C21.081 14.1539 21.6087 15.6143 22.5074 16.8615C22.6933 17.1192 22.8069 17.4189 22.8371 17.7315C22.8674 18.0441 22.8132 18.3588 22.6799 18.6453C22.5466 18.9317 22.3387 19.1799 22.0764 19.3659C21.8142 19.5519 21.5064 19.6693 21.1832 19.7066L17.2084 20.1656V21.375C17.2084 22.1955 16.8703 22.9824 16.2687 23.5626C15.667 24.1428 14.8509 24.4688 14 24.4688C13.1491 24.4688 12.3331 24.1428 11.7314 23.5626C11.1297 22.9824 10.7917 22.1955 10.7917 21.375V20.1656L6.81686 19.7055C6.4938 19.6681 6.18628 19.5507 5.92418 19.3647C5.66207 19.1788 5.45429 18.9307 5.32102 18.6445C5.18775 18.3582 5.13352 18.0436 5.1636 17.7312C5.19368 17.4188 5.30705 17.1192 5.49269 16.8615C6.39131 15.6143 6.91902 14.1539 7.01869 12.6383L7.27652 8.6625ZM12.1835 5.90625C11.378 5.90616 10.6028 6.20209 10.0156 6.73381C9.42842 7.26553 9.07348 7.99305 9.02302 8.76825L8.76636 12.744C8.6464 14.5673 8.01136 16.3243 6.93002 17.8245C6.91657 17.8431 6.90834 17.8648 6.90615 17.8874C6.90395 17.91 6.90786 17.9328 6.91749 17.9535C6.92712 17.9742 6.94214 17.9922 6.9611 18.0057C6.98006 18.0191 7.00231 18.0277 7.02569 18.0304L11.3855 18.5355C13.1227 18.7358 14.8774 18.7358 16.6145 18.5355L20.9744 18.0304C20.9977 18.0277 21.02 18.0191 21.0389 18.0057C21.0579 17.9922 21.0729 17.9742 21.0826 17.9535C21.0922 17.9328 21.0961 17.91 21.0939 17.8874C21.0917 17.8648 21.0835 17.8431 21.07 17.8245C19.9891 16.3242 19.3545 14.5672 19.2349 12.744L18.977 8.76825C18.9266 7.99305 18.5716 7.26553 17.9844 6.73381C17.3973 6.20209 16.622 5.90616 15.8165 5.90625H12.1835ZM14 22.7812C13.195 22.7812 12.5417 22.1513 12.5417 21.375V20.5312H15.4584V21.375C15.4584 22.1513 14.805 22.7812 14 22.7812Z"
                  fill="black"
                />
                <path
                  d="M20.5835 1.52438C20.4087 1.6715 20.3017 1.87953 20.286 2.10273C20.2702 2.32593 20.347 2.54603 20.4995 2.71463L22.0069 4.37963C22.5917 5.02623 22.9221 5.85057 22.9402 6.70838L23.0067 9.765C23.0115 9.98878 23.1083 10.2016 23.2758 10.3565C23.4432 10.5115 23.6677 10.5959 23.8998 10.5913C24.1318 10.5867 24.3525 10.4934 24.5132 10.3319C24.6739 10.1704 24.7615 9.9539 24.7567 9.73013L24.6902 6.67238C24.6631 5.41909 24.1799 4.21489 23.3252 3.27038L21.8179 1.60538C21.6653 1.43684 21.4495 1.33363 21.2181 1.31844C20.9866 1.30325 20.7584 1.37732 20.5835 1.52438Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
          <div className="photo-profile flex items-center">
            <img
              className="w-[36px] h-[36px] rounded-[50%]"
              src={photoProfile}
              alt=""
            />
          </div>
          <div className="name-profile flex items-center">
            <p className="text-[#858585] text-[12px] max-w-24 overflow-hidden text-ellipsis">
              {sessionStorage.getItem("name")}
            </p>
          </div>
        </div>
        <div className={`bg-white w-[180px] h-[50px] absolute bottom-[-50px] right-0 mr-36 rounded-sm drop-shadow-2xl z-10 ${tglNotif ? "block" : "hidden"}` }>
          <div className="flex justify-center items-center w-full h-full gap-1">
            <p className="text-[12px]">
              {!isLoadingReplies
                ? dataComplaint.length - dataReplies1.length < 0
                  ? 0
                  : dataComplaint.length - dataReplies1.length
                : 0} Pengaduan {" "}
              <span className="text-[#E5D206]">Diproses</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
