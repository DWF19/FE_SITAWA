import { axiosInstance } from "../../lib/axios";
import { NewData, ApiResponse } from "../../data/dataType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
const addData = async (newData: NewData): Promise<ApiResponse> => {
  const response = await axiosInstance.post<ApiResponse>("/replies", newData);
  

  return response.data;
};
export const useAddData = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, AxiosError, NewData>({
    mutationFn: addData,
    mutationKey: ["addData"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataList'] });
      window.location.reload();
    },
    onError: (error: AxiosError) => {
      console.error(
        "Gagal menambahkan data:",
        error.response?.data || error.message
      );
    },
  });
};
