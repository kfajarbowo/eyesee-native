import { axiosClient } from "@/lib/axios";
import { ResponseAllRegion, ResponseDetailRegion } from "@/types/Region/TypeRegion";

export const getAllRegion = async () => {
  const response = await axiosClient.get<ResponseAllRegion>("/electron/region");
  return response.data;
};

export const getDetailRegion = async (id: string) => {
  const response = await axiosClient.get<ResponseDetailRegion>(`/electron/region/${id}`);
  return response.data;
};

export const checkName = async (name: string, id?: string) => {
  const response = await axiosClient.post(`/electron/region/check-name`, { name: name, regionId: id });
  return response.data;
};
