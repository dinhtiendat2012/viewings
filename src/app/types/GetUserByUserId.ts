import api from "@/app/api/api";
import { User } from "@/app/types/Object";

export async function GetUserByUserId(userId: number) {
  try {
    const response = await api.get(`/api/user/${userId}`);
    if (response.status === 200 && response.data != null) {
      const u: User = response.data;
      return u;
    } else {
      throw new Error("Người dùng không tồn tại.");
    }
  } catch (error) {
    throw error;
  }
}
