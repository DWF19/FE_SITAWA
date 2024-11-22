import { useMutation, useQueryClient } from "@tanstack/react-query";
import { globalState } from "../../GlobalContext";
import api from "../../lib/api";

import { AxiosError } from "axios";
type LoginParams = {
  email: string;
  password: string;
};
const login = async (loginParams: LoginParams) => {
  const response = await api.post("/login", loginParams);
  sessionStorage.setItem("role", response.data.user.role);
  sessionStorage.setItem("token", response.data.access_token);
  sessionStorage.setItem("name", response.data.user.name);
  sessionStorage.setItem("id", response.data.user.id);
  return response.data
};

export const useHandleLogin = () => {
  const queryClient = useQueryClient();
  const {setState} = globalState()
  return useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      setState((prevState) => {
        return {
          ...prevState,
          loginToggle: true,
        };
      })
    },
    onError: (error: AxiosError) => {
      alert("Login failed");
      console.error("Login failed:", error);
      throw error;
    },
  });
};
