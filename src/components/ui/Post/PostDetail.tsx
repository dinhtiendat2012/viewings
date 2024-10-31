import { Post } from "@/app/types/Object";
import { PostCard } from "@/components/ui/Post/PostCard";
import React from "react";

interface PostListProps {
  posts: Post[]; // Định nghĩa kiểu cho props
  updateList: (updating: boolean) => void;
}
export const PostDetail: React.FC<PostListProps> = ({ posts, updateList }) => {
  function updateVoid(update: boolean) {
    if (update == true) {
      updateList(true);
    } else {
    }
  }
  if (posts.length > 0) {
    return (
      <div className="flex flex-col w-full allPost">
        {posts.map((post) => (
          <div key={post.postId} className="w-full">
            <PostCard post={post} update={updateVoid} />
            <br />
          </div>
        ))}
      </div>
    );
  } else {
    return <p> Dont have any post here !</p>;
  }
};
