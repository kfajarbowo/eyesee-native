import { axiosClient } from "@/lib/axios";
import { ResponseAllPeople } from "@/types/Maps/TypeMaps";

export const getAllPeople = async () => {
  const response = await axiosClient.get<ResponseAllPeople>("https://fms.spero-lab.id/api/gps-location/status");
  return response.data;
};
