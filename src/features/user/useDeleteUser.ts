import { useMutation, useQuery } from "@tanstack/react-query";
import { userType } from "../../data/dataType";
import { axiosInstance } from "../../lib/axios";

const deleteData = async (id: number) => {
  const response = await axiosInstance.delete<{ user: userType }>(`user/${id}`);
  return response.data.user;
};

export const useDeleteUser = () => {
  const mutation = useMutation({
    mutationKey: ["deleteData"],
    mutationFn: deleteData,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error(error);
    }
  });
  return mutation;
};
