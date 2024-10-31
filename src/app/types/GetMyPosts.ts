import api from "@/app/api/api";
import { Post } from "@/app/types/Object";

export async function GetMyPosts() {
  try {
    const res1 = await api.get("/api/post/me");
    const posts: Post[] = res1.data;
    return posts;
  } catch (error) {
    throw error;
  }
}
