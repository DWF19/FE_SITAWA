import { useMutation } from "@tanstack/react-query";
import { formProduksi } from "../../data/dataType";
import { axiosInstance } from "../../lib/axios";

const deleteProduksi = async(id:number)=>{
    const response = await axiosInstance.delete<{data:formProduksi}>(`/productions/${id}`)
    return response.data.data
    
}

export const useDeleteProduksi = ()=>{
    return useMutation({
        mutationKey:['deleteProduksi'],
        mutationFn:deleteProduksi,
        onSuccess : ()=>{
            window.location.reload()
        },
        onError:(error)=>{
            console.error(error)
        }
    })
}