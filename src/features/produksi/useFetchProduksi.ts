import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { formProduksi } from "../../data/dataType";
import { useEffect, useState } from "react";

export const useFetchProduksi = () => {
  const [filteredProduction, setFilteredProduction] = useState<formProduksi[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["produksi"],
    queryFn: async () => {
      const response = await axiosInstance.get<{ data: formProduksi[] }>(
        "/productions"
      );
      return response.data.data;
    },
  });
  useEffect(() => {
    if (data) {
      if (searchInput.trim() === "") {
        setFilteredProduction(data);
      } else {
        const filtered = data.filter((user) =>
          user.kecamatan.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.tahun.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredProduction(filtered);
      }
    }
  }, [data, searchInput]);

  return {
    filteredProduction,
    isLoading,
    error,
    setSearchInput,
  };
};
