import api from "@/app/api/api";
import { Post } from "@/app/types/Object";

export async function UpPost(post: Post) {
  try {
    const po = {
      PostId: 0,
      UserId: post.userId,
      PostDate: post.postDate.toISOString(),
      Content: post.content,
      LinkImage: post.linkImage,
      LinkFile: post.linkFile,
      Permission: post.permission,
      ShareByPostId: post.shareByPostId,
    };
    console.log(post);
    const response = await api.post("/api/post/add", po);

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
