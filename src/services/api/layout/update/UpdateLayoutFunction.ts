import { axiosClient } from "@/lib/axios";
import { ResponseUpdateLayout } from "@/types/Layout/TypeLayout";

export const UpdateLayoutFunction = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  try {
    const response = await axiosClient.put<ResponseUpdateLayout>(`/secure/layout/${id}`, data);
    return response;
  } catch (error: any) {
    throw error;
  }
};
