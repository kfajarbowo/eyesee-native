import { axiosClient } from "@/lib/axios";

export const getSignedUrl = async (key: string) => {
  const response = await axiosClient.get(`/secure/signed-url?key=${key}`);
  return response.data;
};