import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formProduksi } from '../../data/dataType'
import {axiosInstance}from '../../lib/axios'
import { AxiosError } from 'axios'
import { globalState } from '../../GlobalContext'

const addProduksi = async(newData:formProduksi):Promise<any> =>{
    const response = await axiosInstance.post<formProduksi>('/productions', newData)
    return response.data
}

export const useAddProduksi = ()=>{
    const {setState} = globalState()
const queryClient = useQueryClient();
return useMutation({
    mutationFn: addProduksi,
    mutationKey: ['addProduksi'],
    onSuccess: ()=>{
        queryClient.invalidateQueries({queryKey: ['productions']})
        setState((prevState)=>{
            return {
                ...prevState,
                productionToggle: true
            }
        })
    },
    onError: (error:AxiosError)=>{
        console.error('Gagal menambahkan data: ', error.response?.data || error.message)
    }
})
}

