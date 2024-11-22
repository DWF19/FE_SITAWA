
import { useState, useEffect } from "react";
import { userType } from "../../data/dataType";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchUser = () => {
  const [filteredUsers, setFilteredUsers] = useState<userType[]>([]); 
  const [searchInput, setSearchInput] = useState<string>(""); 
  const { data, isLoading, error } = useQuery<userType[], Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get<{ user: userType[] }>("/user");
      return response.data.user;
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
