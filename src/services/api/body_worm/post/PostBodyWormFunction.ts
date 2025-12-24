import { axiosClient } from "@/lib/axios";
import { BodyWormRequest, BodyWormResponse } from "@/types/BodyWorm/TypeBodyWorm";

export const PostBodyWormFunction = async (data: BodyWormRequest) => {
  try {
    const response = await axiosClient.post<BodyWormResponse>(
      `/electron/body-worm`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
