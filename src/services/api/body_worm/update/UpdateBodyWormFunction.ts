import { axiosClient } from "@/lib/axios";
import { BodyWormRequest, BodyWormResponse } from "@/types/BodyWorm/TypeBodyWorm";

export const UpdateBodyWormFunction = async ({
  id,
  data,
}: {
  id: string;
  data: BodyWormRequest;
}) => {
  try {
    const response = await axiosClient.put<BodyWormResponse>(
      `/electron/body-worm/${id}`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
