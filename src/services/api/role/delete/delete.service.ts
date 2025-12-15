import { axiosClient } from "@/lib/axios";

export const deleteRole = async ({ id }: { id: string }) => {
  try {
    const response = await axiosClient.delete(`/secure/role/${id}`);
    return response.data;
  } catch (error: any) {
    throw error
  }
};
