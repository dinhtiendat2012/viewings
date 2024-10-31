import api from "@/app/api/api";
import { Comment } from "@/app/types/Object";

export async function UpCmt(cmt: Comment) {
  try {
    const cmtt = {
      CmtId: 0,
      PostId: cmt.postId,
      UserId: cmt.userId,
      CmtDate: cmt.cmtDate.toISOString(),
      Content: cmt.content,
      ReplyByCmtId: cmt.replyByCmtId,
      Level: cmt.level,
    };
    const response = await api.post("/api/cmt/add", cmtt);

    if (response.status === 200 && response.data != null) {
      return;
    } else {
      console.log("error");
      throw new Error("Người dùng không tồn tại.");
    }
  } catch (error) {
    console.log("error");
    throw error;
  }
}
