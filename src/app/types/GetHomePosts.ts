import api from "@/app/api/api";
import { Post } from "@/app/types/Object";

export async function GetHomePosts() {
  try {
    const res = await api.get("/api/post");
    const posts: Post[] = res.data;
    if (posts) {
      return posts;
    } else {
      throw new Error("Dsach post không tồn tại.");
    }
  } catch (error) {
    throw error;
  }
}
