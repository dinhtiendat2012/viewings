"use client";
import "@/app/profile/profile.css";
import ProfileDetail from "@/components/ui/Profile/ProfileDetail";
import FriendCarousel from "@/components/ui/Profile/FriendCarousel";
import { Button } from "@/components/ui/button";
import { PostDetail } from "@/components/ui/Post/PostDetail";

import React, { useEffect, useState } from "react";
import LayoutLogined from "@/app/layoutLogined";
import { Post } from "@/app/types/Object";
import { GetMyPosts } from "@/app/types/GetMyPosts";

export default function ProfilePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    GetMyPosts()
      .then((ps: Post[]) => {
        setPosts(ps);
      })
      .catch(() => {});
  }, []);
  function updatePostsProfile(updating: boolean) {
    if (updating == true) {
      GetMyPosts()
        .then((ps: Post[]) => {
          setPosts(ps);
        })
        .catch(() => {});
    }
  }
  return (
    <LayoutLogined>
      <div className="profileBg">
        <div className="title">Profile</div>
        <hr />
        <br />
        <ProfileDetail />
        <hr />
        <div className="title">Friends</div>
        <br />
        <FriendCarousel />
        <br />
        <Button>View all</Button>
        <br />
        <hr />
        <div className="title">Posts</div>
        <br />
        <PostDetail posts={posts} updateList={updatePostsProfile} />
      </div>
    </LayoutLogined>
  );
}
