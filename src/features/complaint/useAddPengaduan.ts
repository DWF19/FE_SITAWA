import { axiosInstance } from "../../lib/axios";
import { NewaddPengaduan, NewaddPengaduanResponse } from "../../data/dataType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { globalState } from "../../GlobalContext";



const addPengaduan = async (newData: NewaddPengaduan): Promise<NewaddPengaduanResponse> => {
    const formData = new FormData();
    formData.append('name', newData.name);
    formData.append('phone', newData.phone);
    formData.append('address', newData.address);
    formData.append('subject', newData.subject);
    formData.append('description', newData.description);
    formData.append('latitude', newData.latitude);
    formData.append('longitude', newData.longitude);
    if (newData.image) {
      formData.append('image', newData.image);
    }
  
    const response = await axiosInstance.post<NewaddPengaduanResponse>("/complaints", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  };
  export const useAddPengaduan = () => {
    const { setState } = globalState();
    const popUpHandler = () => {
      setState((prevState) => {
        return {
          ...prevState,
          actionAddData: !prevState.actionAddData,
        };
      });
    };
    const queryClient = useQueryClient();
  
    return useMutation<NewaddPengaduanResponse, AxiosError, NewaddPengaduan>({
      mutationFn: addPengaduan,
      mutationKey: ["addPengaduan"],
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["complaints"] });
         popUpHandler();
      },
      onError: (error: AxiosError) => {
        console.error(
          "Gagal menambahkan data: ",
          error.response?.data || error.message
        );
      },
    });
  };


