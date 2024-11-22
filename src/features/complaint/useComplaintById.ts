
import { pengaduan } from "../../data/dataType";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";


export const useComplaintById = (id:Number)=>{
    const {data, isLoading} = useQuery({
        queryKey:['complaint', id],
        queryFn: async ()=>{
            const response = await axiosInstance.get<{data: pengaduan}>(`/complaints/${id}`)
            console.log(response.data.data);
            
            return response.data.data
        },

    })
    return{
        data,
        isLoading
    }

}