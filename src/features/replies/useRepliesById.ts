import { repliesType } from "../../data/dataType";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useRepliesById = (id: number) => {
    const { data, isLoading } = useQuery({
        queryKey: ["repliesById", id],
        queryFn: async () => {
            const response = await axiosInstance.get<{ data: repliesType }>(
                `repliesByComplaint/${id}`
            );
            return response.data.data;
        },
    });
    return {
        dataReplies: data,
        isLoadingReplies: isLoading,
    };
}