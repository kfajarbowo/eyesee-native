import { axiosClient } from "@/lib/axios";
import { RoleRequest, RoleResponse } from "@/types/Role/TypeRole";

export const PostRoleFunction = async (data: RoleRequest) => {
  try {
    const response = await axiosClient.post<RoleResponse>(
      `/secure/role`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
