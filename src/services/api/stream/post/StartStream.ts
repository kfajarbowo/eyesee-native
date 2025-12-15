import { axiosClient } from "@/lib/axios";
import { StartStreamRequest, StartStreamResponse } from "@/types/Stream/TypeStream";

export const StartStream = async (data: StartStreamRequest) => {
  try {
    const response = await axiosClient.post<StartStreamResponse>(
      `/secure/stream/start`,
      data,
    );

    return response;
  } catch (error: any) {
    throw error;
  }
};
