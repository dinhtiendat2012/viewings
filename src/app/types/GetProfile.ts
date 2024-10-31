import api from "@/app/api/api";
import { Profile } from "@/app/types/Object";

export async function GetProfile() {
  try {
    const res = await api.get("/api/profile");
    const profile: Profile = res.data;
    if (profile) {
      return profile;
    } else {
      throw new Error("Profile không tồn tại.");
    }
  } catch (error) {
    throw error;
  }
}
