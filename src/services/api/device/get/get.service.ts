import { axiosClient } from "@/lib/axios";
import { ResponseAllDevice } from "@/types/Device/TypeDevice";

export const getAllDevice = async () => {
  const response = await axiosClient.get<ResponseAllDevice>("/electron/device");
  return response.data;
};
