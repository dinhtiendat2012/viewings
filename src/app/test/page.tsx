"use client";
import LayoutLogined from "@/app/layoutLogined";
// import { GetHomePosts } from "@/app/types/GetHomePosts";
import { GetMyPosts } from "@/app/types/GetMyPosts";
import { Post } from "@/app/types/Object";
import { UpPost } from "@/app/types/UpPost";
import React, { useEffect, useState } from "react";

export default function Test() {
  const post: Post = {
    content: "hi",
    linkFile: null,
    linkImage: null,
    permission: "Public",
    postDate: new Date(),
    postId: 0,
    shareByPostId: null,
    userId: 1,
  };
  const [posts, setPosts] = useState({});
  useEffect(() => {
    UpPost(post);
    GetMyPosts()
      .then((postss: Post[]) => {
        setPosts(postss);
      })
      .catch(() => {
        console.log("UpPost error");
      });
  }, []);
  const results = () => {
    console.log(posts);
  };
  return (
    <LayoutLogined>
      <button onClick={results}>tach</button>;
    </LayoutLogined>
  );
}
