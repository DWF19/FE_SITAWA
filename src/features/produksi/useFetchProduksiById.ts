import { formProduksi } from "../../data/dataType";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchProduksiById = (id:number)=>{
    const {data, isLoading} = useQuery({
        queryKey:['produksiById', id],
        queryFn: async ()=>{
            const response = await axiosInstance.get<{data: formProduksi}>(`/productions/${id}`)
            return response.data.data
        }
        
    })
    return {
        data,
        isLoading
    }

}