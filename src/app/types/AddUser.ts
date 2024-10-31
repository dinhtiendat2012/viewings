import api from "@/app/api/api";
import { User } from "@/app/types/Object";

export async function AddUser(user: User) {
  try {
    const u = {
      UserId: user.userId,
      Email: user.email,
      Password: user.password,
      Status: user.status,
      RoleId: user.roleId,
    };
    console.log(u);
    const response = await api.post("/api/user/add", u);

    if (response.status === 200 && response.data != null) {
      const userId = response.data;
      return userId;
    } else {
      console.log("error");
      throw new Error("Người dùng tồn tại.");
    }
  } catch (error) {
    console.log("error");
    throw error;
  }
}
