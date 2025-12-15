import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllCctv, ResponseDetailCctv } from "@/types/Cctv/TypeCctv";

export const getAllCctv = async () => {
  const response = await axiosClient.get<ResponseAllCctv>("/electron/cctv");
  return response.data;
};

export const getDetailCctv = async (id: string) => {
  const response = await axiosClient.get<ResponseDetailCctv>(`/electron/cctv/${id}`);
  return response.data;
};

export const getRamdomCctv = async (limit: number) => {
  const response = await axiosClient.get<ResponseAllCctv>("/electron/cctv/random?limit=" + limit);
  return response.data;
};

export const getStarCctv = async () => {
  const response = await axiosClient.get<ResponseAllCctv>("/electron/cctv/star");
  return response.data;
};