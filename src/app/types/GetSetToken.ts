import api from "@/app/api/api";
import { User } from "@/app/types/Object";

export async function GetSetToken(user: User) {
  const tokenTime = 1 * 1 * 2 * 60 * 1000; //2 minutes
  try {
    const response = await api.post("/api/login", user);
    if (response.status === 200 && response.data.token != null) {
      const u: User = response.data.token;
      const expirationTime = Date.now() + tokenTime;
      localStorage.setItem("token", response.data.token); //Lưu token vào localStorage
      localStorage.setItem("tokenExpiration", "" + expirationTime);
      return u;
    } else {
      throw new Error("Người dùng không tồn tại.");
    }
  } catch (error) {
    throw error;
  }
}
