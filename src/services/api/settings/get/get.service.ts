import { axiosClient } from "@/lib/axios";

export const getDetailSettings = async (name: string) => {
  const response = await axiosClient.get(`/secure/settings/${name}`);
  return response.data;
};