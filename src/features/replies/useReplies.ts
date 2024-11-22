import { repliesType } from '../../data/data'
import {axiosInstance} from '../../lib/axios'
import {useQuery} from '@tanstack/react-query'

export const useReplies = ()=>{
    const {data, isLoading} = useQuery({
        queryKey: ['replies'],
        queryFn: async ()=>{
            const response = await axiosInstance.get<{data: repliesType[]}>('/replies')
            return response.data.data
        },
    })
    return{
        dataReplies: data,
        isLoadingReplies: isLoading
    }
}