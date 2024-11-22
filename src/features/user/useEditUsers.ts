import { AxiosError } from "axios";
import { editUserType } from "../../data/dataType";
import { axiosInstance } from "../../lib/axios";
import {  useMutation, useQueryClient } from "@tanstack/react-query";

const editUsers = async(id: number, updateData:editUserType)=>{
    const response = await axiosInstance.put(`/user/${id}`, updateData)
    return response.data
}

export const useEditusers = ()=>{

    const queryClient = useQueryClient()
    return useMutation<editUserType, AxiosError, {id:number, updateData:editUserType}>({
        mutationFn: ({id, updateData}) => editUsers(id, updateData),
        mutationKey: ['editUsers'],
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ['users']})
            window.location.reload()
        },
        onError: (error:AxiosError)=>{
            console.error('Gagal mengedit data: ', error.response?.data || error.message)
        }
    })
}
