import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { AxiosError } from "axios";
import { globalState } from "../../GlobalContext";
import { set } from "date-fns";
import { registFieldType } from "../../data/dataType";



const regist = async (data: registFieldType) => {
  const response = await api.post("/register", data);
  return response.data;
};

export const useHandleRegist = () => {
  const queryClient = useQueryClient();
  const { setState } = globalState();
  return useMutation({
    mutationFn: regist,
    mutationKey: ["register"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["register"] });
      setState((prevState) => {
        return {
          ...prevState,
          registToggle: true,
        };
      })
    
    },
    onError: (error: AxiosError) => {
      alert("Registration failed");
      console.error("Registration failed:", error);
      throw error;
    },
  });
};
