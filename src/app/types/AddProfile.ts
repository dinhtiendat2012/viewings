import api from "@/app/api/api";
import { Profile } from "@/app/types/Object";

export async function AddProfile(profile: Profile) {
  try {
    const p = {
      UserId: profile.userId,
      Name: profile.name,
      Address: profile.address,
      Dob: profile.dob.toISOString().split("T")[0],
      LinkAvt: profile.linkAvt,
      Phone: profile.phone,
      profileId: profile.profileId,
    };
    const response = await api.post("/api/profile/add", p);

    if (response.status === 200 && response.data != null) {
      return;
    } else {
      console.log("error");
      throw new Error("Người dùng tồn tại.");
    }
  } catch (error) {
    console.log("error");
    throw error;
  }
}
