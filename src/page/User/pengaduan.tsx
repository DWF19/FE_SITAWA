import { useRef, useState } from "react";

import axios from "axios";

import { globalState } from "../../GlobalContext";

import upload from "../../assets/logo/Picture.png";
import NavPengaduan from "../../components/UserComponents/NavPengaduan";
import FooterLogin from "../../components/loginregistcomp/FooterLogin";
import { useAddPengaduan } from "../../features/complaint/useAddPengaduan";
import AddPopUp from "../../components/UserComponents/AddPopUp";
const pengaduan = () => {
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageSize, setImageSize] = useState(0);

  const [file, setFile] = useState<File | null>(null);

  const [name, setNmae] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [phone_number, setPhone_number] = useState<string>("");

  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [toggleInput, setToggleInput] = useState<boolean>(false);

  const mutation = useAddPengaduan();
  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );

      if (response.data && response.data.display_name) {
        setAddress(response.data.display_name);
      } else {
        alert("Alamat tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      alert("Gagal mengambil alamat.");
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
         fetchAddress(latitude, longitude);
          setLatitude(latitude.toString());
          setLongitude(longitude.toString());
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Gagal mendapatkan lokasi. Pastikan izin lokasi telah diaktifkan."
          );
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation tidak didukung oleh browser ini.");
    }
  };
  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageName(file.name);
      setImageSize(file.size);
    }
  };

  const { state } = globalState();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !name ||
      !phone_number ||
      !address ||
      !selectedImage ||
      !subject ||
      !description
    ) {
      setToggleInput(!toggleInput);

      alert("Lengkapi semua data");
      return;
    }
    if (file) {
      mutation.mutate({
        name: name,
        phone: phone_number,
        address: address,
        subject: subject,
        description: description,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        image: file,
      });
    } else {
      alert("Silakan pilih gambar untuk diupload.");
    }
  };

  return (
    <div className="relative ">
      <div
        className={`w-full h-full absolute ${
          state.actionAddData ? "bg-black opacity-50 z-20" : ""
        }`}
      ></div>
      <div
        className={` ${
          mutation.status === "pending" ? "w-full h-[160vh] absolute  z-20" : ""
        } `}
      ></div>
      <NavPengaduan />
      <div
        className={`relative h-[100vh] ${
          state.actionAddData ? "overflow-hidden" : ""
        }`}
      >
        <div>
          <AddPopUp />
        </div>
        <div className="flex justify-center overflow-auto scrollbar-hide relative">
          <div className="tabel-pengaduan w-[76.875rem]   border border-[#f0f0f0] rounded-xl shadow-xl my-32">
            <div className="py-[49px] border-b border-[#f0f0f0] mx-1">
              <p className="buat-pengaduan ml-5">Buat Pengaduan</p>
            </div>
            <form onSubmit={handleSubmit} className="w-full" action="">
              <div className="flex justify-center items-center text-[12px]">
                <div className="mt-5">
                  <div className="flex w-full  relative">
                    <label className="ml-5 " htmlFor="">
                      Nama
                    </label>
                    <p
                      className={`p absolute right-0 mr-5 text-red-600 ${
                        toggleInput && name === "" ? "block" : "hidden"
                      }`}
                    >
                      *Field tidak boleh kosong
                    </p>
                  </div>
                  <div className="input-pengaduan w-[950px] h-[42px] border border-[#f0f0f0] rounded-xl flex justify-center items-center mt-2">
                    <input
                      onChange={(e) => setNmae(e.target.value)}
                      value={name}
                      className="w-[920px] h-[35px] outline-none "
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center text-[12px]">
                <div className="mt-5">
                  <div className="flex w-full  relative">
                    <label className="ml-5 " htmlFor="">
                      No HP
                    </label>
                    <p
                      className={`p absolute right-0 mr-5 text-red-600 ${
                        toggleInput && phone_number === "" ? "block" : "hidden"
                      }`}
                    >
                      *Field tidak boleh kosong
                    </p>
                  </div>
                  <div className="input-pengaduan w-[950px] h-[42px] border border-[#f0f0f0] rounded-xl flex justify-center items-center mt-2">
                    <input
                      onChange={(e) => setPhone_number(e.target.value)}
                      value={phone_number}
                      className="w-[920px] h-[35px] outline-none appearance-none custom-input"
                      type="number"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center text-[12px]">
                <div className="mt-5">
                  <div className="flex w-full  relative">
                    <label className="ml-5 " htmlFor="">
                      Alamat
                    </label>
                    <p
                      className={`p absolute right-0 mr-5 text-red-600 ${
                        toggleInput && address === "" ? "block" : "hidden"
                      }`}
                    >
                      *Field tidak boleh kosong
                    </p>
                  </div>

                  <div className="input-pengaduan w-[950px] h-[42px] border border-[#f0f0f0] rounded-xl flex justify-center items-center mt-2">
                    <input
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      className="w-[920px] h-[35px] outline-none "
                      type="text"
                    />
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <button
                      onClick={getLocation}
                      disabled={loading}
                      className={`lokasi-text py-1 px-2 rounded-lg cursor-pointer bg-custom-gradient text-white ${
                        loading ? "hidden" : ""
                      }`}
                    >
                      Lokasi Saya
                    </button>
                    <div
                      className={`flex justify-center items-center gap-3  ${
                        loading ? "" : "hidden"
                      }`}
                    >
                      <div className="loader"></div>
                      <p className="p">Sedang Mencari Lokasi</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-5">
                <div className="input-pengaduan w-[950px] h-[316px] border border-[#f0f0f0] rounded-xl flex justify-center items-center mt-2">
                  <div>
                    <div
                      onClick={() => handleIconClick()}
                      className="flex justify-center items-center relative cursor-pointer"
                    >
                      <img
                        className="h-[64px] w-[74px] object-cover"
                        src={upload}
                        alt=""
                      />
                      <input
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        type="file"
                      />
                    </div>
                    <p className="p text-center text-[12px]">
                      Anda dapat seret dan lepas berkas di sini untuk
                      menambahkan foto
                    </p>
                    <p className="text-center text-[8px] text-[#06D001]">
                      format: PNG, JPG, JPEG, WEBP
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`flex justify-center mt-5 ${
                  imageName === "" ? "hidden" : ""
                } `}
              >
                <div className="input-pengaduan border border-[#f0f0f0] rounded-xl w-[950px] h-[80px] relative flex items-center">
                  {selectedImage && (
                    <div className="img-upload px-3 flex  gap-2 items-center">
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="h-[54px] w-[54px] object-cover rounded-md"
                      />
                      <div>
                        <p className="p text-[12px] mb-1 text-black">
                          {imageName}
                        </p>
                        <p className="text-[8px]">
                          {(imageSize / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-center text-[12px]">
                <div className="mt-5">
                  <div className="flex w-full  relative">
                    <label className="ml-5 " htmlFor="">
                      Subjek
                    </label>
                    <p
                      className={`p absolute right-0 mr-5 text-red-600 ${
                        toggleInput && subject === "" ? "block" : "hidden"
                      }`}
                    >
                      *Field tidak boleh kosong
                    </p>
                  </div>
                  <div className="input-pengaduan w-[950px] h-[42px] border border-[#f0f0f0] rounded-xl flex justify-center items-center mt-2">
                    <input
                      onChange={(e) => setSubject(e.target.value)}
                      value={subject}
                      className="w-[920px] h-[35px] outline-none "
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center text-[12px]">
                <div className="mt-5">
                  <div className="flex w-full  relative">
                    <label className="ml-5 " htmlFor="">
                      Keterangan
                    </label>
                    <p
                      className={`p absolute right-0 mr-5 text-red-600 ${
                        toggleInput && description === "" ? "block" : "hidden"
                      }`}
                    >
                      *Field tidak boleh kosong
                    </p>
                  </div>
                  <div className="input-pengaduan w-[950px] h-[222px] border border-[#f0f0f0] rounded-xl flex justify-center items-center mt-2">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-[920px] h-[200px] outline-none  "
                      name=""
                      id=""
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center pb-10 mt-5">
                <button
                  type="submit"
                  className={`btn-send px-24 py-2 rounded-lg bg-[#9BEC00] text-white ${mutation.status ==="pending" ? "hidden" : ""}`}
                >
                  Kirim
                </button>
                <div className={`loader ${mutation.status ==="pending" ? "block" : "hidden"}`}></div>
              </div>
            </form>
          </div>
        </div>
        <FooterLogin />
      </div>
    </div>
  );
};

export default pengaduan;
