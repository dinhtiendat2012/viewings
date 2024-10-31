"use client";
import React, { useEffect, useState } from "react";
import "@/app/home/home.css";
import LayoutLogined from "@/app/layoutLogined";
import Image from "next/image";
import avt from "@/app/public/images/trend-avatar-1.jpg";
import { Input } from "@/components/ui/input";
import { PostDetail } from "@/components/ui/Post/PostDetail";
import { Post, Profile } from "@/app/types/Object";
import { GetHomePosts } from "@/app/types/GetHomePosts";
import { GetProfile } from "@/app/types/GetProfile";
import { UpPost } from "@/app/types/UpPost";
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [permisstion, setPermisstion] = useState("Public");
  const [content, setContent] = useState<string>("");
  const [linkFile] = useState<string | null>(null);
  const [linkImg] = useState<string | null>(null);
  const [update, setUpdate] = useState(0);
  useEffect(() => {
    GetProfile()
      .then((p: Profile) => {
        setProfile(p);
      })
      .catch(() => {});
    GetHomePosts()
      .then((posts: Post[]) => {
        setPosts(posts);
      })
      .catch(() => {
        return;
      });
  }, [, update]);
  const upMedia = () => {
    console.log(posts);
  };
  const upFile = () => {};
  const tagFriend = () => {
    console.log(new Date().toLocaleString());
  };
  const uploadPost = () => {
    if (profile != null && content.trim() != "") {
      const post: Post = {
        postId: 0,
        userId: profile.userId,
        postDate: new Date(),
        content: content,
        permission: permisstion,
        linkFile: linkFile,
        linkImage: linkImg,
        shareByPostId: null,
      };
      UpPost(post)
        .then(() => {
          setUpdate(update + 1);
        })
        .catch(() => {});
    }
  };
  function updatePostsHome(updating: boolean) {
    if (updating == true) {
      setUpdate(update + 1);
    }
  }
  return (
    <LayoutLogined>
      <form onSubmit={uploadPost} className="upPostBg">
        <div className="flex headUpPost">
          <div className="avatar-name-UpPost">
            <a href="./profile">
              <Image className="avatar" src={avt} alt="none" />
            </a>
            <div className="name_time_UpPost">
              <a href="./profile" className="name">
                {profile ? profile.name : null}
              </a>

              <select
                className="permission"
                value={permisstion}
                onChange={(e) => {
                  setPermisstion(e.target.value);
                }}
              >
                <option value={"Public"}>Public</option>
                <option value={"Friend"}>Friend</option>
                <option value={"Private"}>Private</option>
              </select>
            </div>
          </div>

          <button type="submit" className="upload">
            Upload
          </button>
        </div>
        <div className="detailUpPost">
          <Input
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="inputText p-5 m-3"
            type="text"
            placeholder="How do you feel today ? ..."
            value={content}
          />
        </div>
        <div className="hr">
          <hr className="w-full" />
        </div>
        <div className="flex react">
          <div className="actBox media">
            <svg
              className="icon_react"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 3C1.44772 3 1 3.44772 1 4V11C1 11.5523 1.44772 12 2 12H13C13.5523 12 14 11.5523 14 11V4C14 3.44772 13.5523 3 13 3H2ZM0 4C0 2.89543 0.895431 2 2 2H13C14.1046 2 15 2.89543 15 4V11C15 12.1046 14.1046 13 13 13H2C0.895431 13 0 12.1046 0 11V4ZM2 4.25C2 4.11193 2.11193 4 2.25 4H4.75C4.88807 4 5 4.11193 5 4.25V5.75454C5 5.89261 4.88807 6.00454 4.75 6.00454H2.25C2.11193 6.00454 2 5.89261 2 5.75454V4.25ZM12.101 7.58421C12.101 9.02073 10.9365 10.1853 9.49998 10.1853C8.06346 10.1853 6.89893 9.02073 6.89893 7.58421C6.89893 6.14769 8.06346 4.98315 9.49998 4.98315C10.9365 4.98315 12.101 6.14769 12.101 7.58421ZM13.101 7.58421C13.101 9.57302 11.4888 11.1853 9.49998 11.1853C7.51117 11.1853 5.89893 9.57302 5.89893 7.58421C5.89893 5.5954 7.51117 3.98315 9.49998 3.98315C11.4888 3.98315 13.101 5.5954 13.101 7.58421Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <input type="button" onClick={upMedia} value="Media" />
          </div>
          <div className="actBox file">
            <svg
              className="icon_react"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <input type="button" onClick={upFile} value="File" />
          </div>
          <div className="actBox tag">
            <svg
              className="icon_react"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <input type="button" onClick={tagFriend} value="Tag" />
          </div>
        </div>
      </form>
      {posts.length > 0 ? (
        <PostDetail posts={posts} updateList={updatePostsHome} />
      ) : (
        <p>Dont have any post</p>
      )}
    </LayoutLogined>
  );
}
