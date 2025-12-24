import { axiosClient } from "@/lib/axios";

export const deleteHelmet = async ({ id }: { id: string }) => {
  try {
    const response = await axiosClient.delete(`/electron/helmet/${id}`);
    return response.data;
  } catch (error:any) {
    throw error
  }
};
