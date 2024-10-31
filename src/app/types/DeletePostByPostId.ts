import api from "@/app/api/api";

export async function DeletePostByPostId(postId: number) {
  try {
    const response = await api.post(`/api/post/delete/${postId}`);
    if (response.status === 200) {
      return;
    } else {
      throw new Error("Người dùng không tồn tại.");
    }
  } catch (error) {
    throw error;
  }
}
