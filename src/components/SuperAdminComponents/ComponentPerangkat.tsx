import { useEffect, useRef, useState } from "react";
import { globalState } from "../../GlobalContext";
import { useFetchUser } from "../../features/user/useFetchUser";
import { useNavigate } from "react-router-dom";
const ComponentPerangkat = () => {
  const { setState } = globalState();
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { filteredUsers, isLoading, setSearchInput } = useFetchUser();

  const navigate = useNavigate();

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setClickedIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filteredUsers]);

  const deleteHandler = (id: Number) => {
    setState((prevState) => {
      return {
        ...prevState,
        actionHapusPerangkat: !prevState.actionHapusPerangkat,
        getId: Number(id),
      };
    });
  };
  return (
    <div>
      <div className="flex justify-between items-center mt-6 ">
        <h3 className="font-bold text-[16px]">Perangkat Kecamatan</h3>
        <div className="flex gap-4">
          <div className="w-[216px] h-[40px] border border-[#06D001] rounded-full flex justify-between items-center">
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
              className="w-[70%] mr-5  outline-none"
              type="text"
              placeholder="Search"
            />
          </div>
          <button
            onClick={() => navigate("/perangkat-kecamatan/tambah-akun")}
            type="button"
            className="w-[100px] h-[42px]  rounded-full bg-custom-gradient flex items-center justify-center gap-1"
          >
            <span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2331_190)">
                  <path
                    d="M9.10417 9.58333C9.54464 9.58333 9.9808 9.49658 10.3878 9.32801C10.7947 9.15945 11.1645 8.91238 11.4759 8.60092C11.7874 8.28946 12.0345 7.9197 12.203 7.51275C12.3716 7.1058 12.4583 6.66964 12.4583 6.22917C12.4583 5.78869 12.3716 5.35253 12.203 4.94558C12.0345 4.53864 11.7874 4.16888 11.4759 3.85741C11.1645 3.54595 10.7947 3.29888 10.3878 3.13032C9.9808 2.96176 9.54464 2.875 9.10417 2.875C8.21459 2.875 7.36144 3.22838 6.73241 3.85741C6.10338 4.48644 5.75 5.33959 5.75 6.22917C5.75 7.11875 6.10338 7.97189 6.73241 8.60092C7.36144 9.22995 8.21459 9.58333 9.10417 9.58333Z"
                    stroke="white"
                    stroke-width="4"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.25 13.8958V19.6458M14.375 16.7708H20.125M12.9375 13.4167H9.00833C6.86167 13.4167 5.78833 13.4167 4.968 13.8345C4.24674 14.202 3.66034 14.7884 3.29283 15.5097C2.875 16.33 2.875 17.4033 2.875 19.55V20.125H12.9375"
                    stroke="white"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2331_190">
                    <rect width="23" height="23" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <p className="text-[10px] text-white">Tambahkan</p>
          </button>
        </div>
      </div>
      <div>
        {isLoading && (
          <div
            className={`flex justify-center items-center w-full h-[50vh] mt-10 `}
          >
            <div className="loader-pengaduan"></div>
          </div>
        )}
        {!isLoading && (
          <div className="border rounded-lg border-[#F0F0F0] mt-10">
            <div className="">
              <div className="bg-white shadow-md rounded-lg overflow-hidden py-3">
                <table className="min-w-full">
                  <thead className="">
                    <tr>
                      <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Nama Kecamatan
                      </th>
                      <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Email
                      </th>

                      <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {filteredUsers.map((item, index) => {
                    return (
                      <tbody className="border-y border-[#F0F0F0]">
                        <tr className="" key={index}>
                          <td className="text-center px-4 py-2 whitespace-nowrap text-xs  text-gray-500 ">
                            {item.address}
                          </td>

                          <td className="text-center px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                            {item.email}
                          </td>

                          <td className="text-center px-4 py-2 whitespace-nowrap text-xs font-medium">
                            <div className="relative inline-block text-left">
                              <button
                                onClick={() => setClickedIndex(index)}
                                type="button"
                              >
                                <span>
                                  <svg
                                    width="20px"
                                    height="20px"
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
                              {clickedIndex == index && (
                                <div
                                  ref={ref}
                                  className="origin-top-right absolute right-full  w-[63px] h-[55px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                  <button
                                    onClick={() =>
                                      navigate(
                                        `/perangkat-kecamatan/edit-akun/${item.id}`
                                      )
                                    }
                                    className="block h-1/2 bg-custom-gradient w-full rounded-t-md text-white"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => deleteHandler(item.id)}
                                    className="block h-1/2 w-full"
                                  >
                                    Hapus
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
                <div className="py-4 ml-14 text-xs font-bold">
                  {filteredUsers.length} Perangkat Kecamatan
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ComponentPerangkat;
