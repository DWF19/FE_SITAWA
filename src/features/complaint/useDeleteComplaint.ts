import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { pengaduan } from "../../data/dataType";
import { repliesType } from "../../data/data";

const deleteDataById = async ({
  idComplaint,
  idReplies,
}: {
  idComplaint: number;
  idReplies: number;
}) => {
  const complaint = await axiosInstance.delete<{ data: pengaduan[] }>(
    `complaints/${idComplaint}`
  );
  const replies = await axiosInstance.delete<{ data: repliesType[] }>(
    `replies/${idReplies}`
  );
  return complaint.data.data && replies.data.data;
};

export const useDeleteComplaint = () => {
  const mutation = useMutation({
    mutationFn: deleteDataById,
    onSuccess: () => {
      alert("Data berhasil di hapus");
    },
  });
  return mutation;
};
