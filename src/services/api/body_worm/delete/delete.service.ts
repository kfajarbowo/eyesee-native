import { axiosClient } from "@/lib/axios";

export const deleteBodyWorm = async ({ id }: { id: string }) => {
  try {
    const response = await axiosClient.delete(`/electron/body-worm/${id}`);
    return response.data;
  } catch (error:any) {
    throw error
  }
};
