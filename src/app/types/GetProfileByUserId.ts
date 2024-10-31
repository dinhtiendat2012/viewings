import api from "@/app/api/api";
import { Profile } from "@/app/types/Object";

export async function GetProfileByUserId(userId: number) {
  try {
    const response = await api.post(`/api/profile/user/${userId}`);
    if (response.status === 200 && response.data != null) {
      const p: Profile = response.data;
      return p;
    } else {
      throw new Error("Người dùng không tồn tại.");
    }
  } catch (error) {
    throw error;
  }
}
