import { axiosClient } from "@/lib/axios";
import { HelmetRequest, HelmetResponse } from "@/types/Helmet/TypeHelmet";

export const UpdateHelmetFunction = async ({
  id,
  data,
}: {
  id: string;
  data: HelmetRequest;
}) => {
  try {
    const response = await axiosClient.put<HelmetResponse>(
      `/electron/helmet/${id}`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
