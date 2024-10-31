import api from "@/app/api/api";
import { Comment } from "@/app/types/Object";

export async function GetCommentsByPostId(postId: number) {
  try {
    const res = await api.get(`/api/cmt/${postId}`, {
      params: {
        postId: postId,
      },
    });
    const cmts: Comment[] = res.data;

    if (cmts) {
      return cmts;
    } else {
      throw new Error("Dsach post không tồn tại.");
    }
  } catch (error) {
    throw error;
  }
}
