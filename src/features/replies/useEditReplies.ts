import { axiosInstance } from "../../lib/axios";
import {  ApiResponse, NewReplies } from "../../data/dataType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
const editData = async (id: number, updatedData: NewReplies): Promise<ApiResponse> => {
    const response = await axiosInstance.put<ApiResponse>(`/replies/${id}`, updatedData); 
    return response.data;
  };
  export const useEditReplies = () => {
    const queryClient = useQueryClient();
  
    return useMutation<ApiResponse, AxiosError, { id: number; updatedData: NewReplies }>({
      mutationFn: ({ id, updatedData }) => editData(id, updatedData),
      mutationKey: ["editData"],
      onSuccess: () => {

        queryClient.invalidateQueries({ queryKey: ['dataList'] });
        window.location.reload();
      },
      onError: (error: AxiosError) => {
        console.error("Gagal mengedit data:", error.response?.data || error.message);
      },
    });
  };