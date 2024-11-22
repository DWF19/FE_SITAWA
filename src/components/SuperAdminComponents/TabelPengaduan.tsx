import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {formatDate} from '../../features/date/dateUtils'
import { useReplies } from "../../features/replies/useReplies";
import { globalState } from "../../GlobalContext";
import { pengaduan } from "../../data/dataType";

interface TabelPengaduanProps {
  filteredUsers: pengaduan[];
  isLoading: boolean;
}
const TabelPengaduan: React.FC<TabelPengaduanProps> = ({ filteredUsers, isLoading }) => {
  const { dataReplies } = useReplies();
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

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
  }, []);

  const handleDetail = (id: number) => {
    navigate(`/pengaduan-masyarakat/balas-pengaduan/${id}`);
  };

  const { setState } = globalState();
  const deleteHandler = (id: number) => {
    setState((prevState) => {
      return {
        ...prevState,
        actionHapusPengaduan: !prevState.actionHapusPengaduan,
        getId: id,
      };
    });
  };

  return (
    <div>
      {isLoading && (
        <div
          className={`flex justify-center items-center w-full h-[50vh] mt-10 `}
        >
          <div className="loader-pengaduan"></div>
        </div>
      )}
      {!isLoading && (
        <div className={`border rounded-lg  border-[#F0F0F0] mt-10`}>
          <div className="">
            <div className="bg-white shadow-md rounded-lg overflow-auto py-3">
              <table className="min-w-full">
                <thead className="">
                  <tr>
                    <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider ">
                      Nama
                    </th>
                    <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Subjek
                    </th>
                    <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Alamat
                    </th>
                    <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider">
                      No. HP
                    </th>
                    <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Waktu
                    </th>
                    <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3  text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                {filteredUsers.map((item, index) => {
                  const dates = filteredUsers.map(
                    (item: { created_at: string }) => item.created_at
                  );
                  let formattedDateTime = formatDate(dates);
                  return (
                    <tbody key={index} className="border-y border-[#F0F0F0]">
                      <tr className="" >
                        <td className="text-center text-ellipsis max-w-20 px-4 py-2 whitespace-nowrap overflow-hidden text-xs  text-gray-500 ">
                          {item.name}
                        </td>

                        <td className="text-center text-ellipsis max-w-32 px-4 py-2 whitespace-nowrap overflow-hidden text-xs text-gray-500 ">
                          {item.subject}
                        </td>
                        <td className="text-center text-ellipsis max-w-[200px] overflow-hidden px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                          {item.address}
                        </td>
                        <td className="text-center px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                          {item.phone}
                        </td>

                        <td className="text-center px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                          {formattedDateTime[index]}
                        </td>
                        <td
                          className={`text-center px-4 py-2 whitespace-nowrap text-xs ${
                            dataReplies
                              ?.map((data) => data.complaint_id.toString())
                              .includes(item.id.toString())
                              ? "text-[#06D001]"
                              : "text-[#E5D206]"
                          }`}
                        >
                          {dataReplies
                            ?.map((data) => data.complaint_id.toString())
                            .includes(item.id.toString())
                            ? "Selesai"
                            : "Diproses"}
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
                                  onClick={() => handleDetail(item.id)}
                                  className="text-white block h-1/2 bg-custom-gradient w-full rounded-t-md"
                                >
                                  Balas
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
                {filteredUsers.length} Pengaduan
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabelPengaduan;
