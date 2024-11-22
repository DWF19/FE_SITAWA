import axios from "axios";
import { useQuery } from "@tanstack/react-query";



export const useFetchAddress = (latitude: number, longitude: number) => {
    const { data, isLoading, isError } = useQuery({
      queryKey: ['address', latitude, longitude],
      queryFn: async () => {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
  
        if (response.data && response.data.display_name) {
            // console.log(response.data.display_name);
          return response.data.display_name;
          
        } else {
          throw new Error('Alamat tidak ditemukan.');
        }
      },
      enabled: !!latitude && !!longitude, // Only run if latitude and longitude are available
    });
    return{
        data,
        isLoading,
        isError
    }
  };


