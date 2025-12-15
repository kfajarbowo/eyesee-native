import { axiosClient } from "@/lib/axios";
import { CctvRequest, CctvResponse } from "@/types/Cctv/TypeCctv";

export const PostCctvFunction = async (data: CctvRequest) => {
  try {
    const response = await axiosClient.post<CctvResponse>(
      `/electron/cctv`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
