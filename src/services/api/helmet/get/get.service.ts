import { axiosClient } from "@/lib/axios";
import { ResponseAllHelmet, ResponseDetailHelmet } from "@/types/Helmet/TypeHelmet";

export const getAllHelmet = async () => {
  const response = await axiosClient.get<ResponseAllHelmet>("/electron/helmet");
  return response.data;
};

export const getRamdomHelmet = async (limit: number) => {
  const response = await axiosClient.get<ResponseAllHelmet>("/electron/helmet/random?limit=" + limit);
  return response.data;
};

export const getDetailHelmet = async (id: string) => {
  const response = await axiosClient.get<ResponseDetailHelmet>(`/electron/helmet/${id}`);
  return response.data;
};

export const checkPathSlugHelmet = async (path_slug: string, id?: string) => {
  const response = await axiosClient.post(`/electron/helmet/check-path-slug`, { path_slug: path_slug, id: id });
  return response.data;
};

export const getStarHelmet = async () => {
  const response = await axiosClient.get<ResponseAllHelmet>("/electron/helmet/star");
  return response.data;
};