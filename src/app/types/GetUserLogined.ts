import api from "@/app/api/api";
import { User } from "@/app/types/Object";

export async function GetUserLogined() {
  try {
    const res = await api.get("/api/login");
    const user: User = res.data;
    if (user) {
      return user;
    } else {
      throw new Error("Người dùng không tồn tại.");
    }
  } catch (error) {
    throw error;
  }
}
