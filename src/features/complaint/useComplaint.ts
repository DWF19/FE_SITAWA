
import { useEffect, useState } from "react";
import { pengaduan } from "../../data/dataType";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useComplaint = () => {
  const [filteredUsers, setFilteredUsers] = useState<pengaduan[]>([]); 
  const [searchInput, setSearchInput] = useState<string>(""); 
  const { data, isLoading, error } = useQuery({
    queryKey: ["complaint"],
    queryFn: async () => {
      const response = await axiosInstance.get<{ data: pengaduan[] }>(
        "/complaints"
      );

      return response.data.data; // Mengembalikan data dari response
    },
  });
  useEffect(() => {
    if (data) {
      if (searchInput.trim() === "") {
        setFilteredUsers(data);
      } else {
        const filtered = data.filter((user) =>
          user.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredUsers(filtered);
      }
    }
  }, [data, searchInput]);

  return {
    filteredUsers,
    isLoading,
    error,
    setSearchInput,
  };
};
