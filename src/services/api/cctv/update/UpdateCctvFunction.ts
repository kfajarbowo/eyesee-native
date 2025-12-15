import { axiosClient } from "@/lib/axios";
import { CctvRequest, CctvResponse } from "@/types/Cctv/TypeCctv";

export const UpdateCctvFunction = async ({
  id,
  data,
}: {
  id: string;
  data: CctvRequest;
}) => {
  try {
    const response = await axiosClient.put<CctvResponse>(
      `/electron/cctv/${id}`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
