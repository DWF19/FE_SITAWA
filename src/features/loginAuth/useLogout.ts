import { useMutation } from "@tanstack/react-query";
import api from "../../lib/api";

const logout = async () => {
  try {
    if (sessionStorage.getItem("token")) {
      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
    }
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export const useLogout = () => {
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("id");
      window.location.reload(); // Perform the reload after successful logout
    },
    onError: (error: any) => {
      console.error("Logout mutation failed:", error);
    },
  });

  return { handleLogout: mutation.mutate };
};
