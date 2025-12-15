import { axiosClient } from "@/lib/axios";
import { ResponseAllLayout, ResponseDetailLayout, ResponseUserLayout } from "@/types/Layout/TypeLayout";

export const getAllLayout = async () => {
  const response = await axiosClient.get<ResponseAllLayout>("/electron/layout");
  return response.data;
};

export const getDetailLayout = async (id: string) => {
  const response = await axiosClient.get<ResponseDetailLayout>(`/electron/layout/${id}`);
  return response.data;
};

export const getUserLayout = async (regionId?: number) => {
  console.log(regionId)
  const url = regionId
    ? `/electron/layout/user?region=${regionId}`
    : "/electron/layout/user";
  const response = await axiosClient.get<ResponseUserLayout>(url);
  return response.data;
}