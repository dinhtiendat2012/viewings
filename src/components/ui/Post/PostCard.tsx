import { Comment, Post, Profile, User } from "@/app/types/Object";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import avt from "@/app/public/images/trend-avatar-1.jpg";
import "@/components/ui/Post/Post.css";
import "@/app/home/home.css";
import { Input } from "@/components/ui/input";
import { CommentList } from "@/components/ui/Post/Comment/CommentList";
import { GetCommentsByPostId } from "@/app/types/GetCommentByPostId";
import { GetProfileByUserId } from "@/app/types/GetProfileByUserId";
import "@/components/ui/Post/Post.css";
import { UpCmt } from "@/app/types/UpCmtOfPost";
import { GetUserLogined } from "@/app/types/GetUserLogined";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeletePostByPostId } from "@/app/types/DeletePostByPostId";

interface PostCardProps {
  post: Post; // Định nghĩa kiểu cho props
  update: (updating: boolean) => void;
}
export const PostCard: React.FC<PostCardProps> = ({ post, update }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cmts, setCmts] = useState<Comment[]>([]);
  const [style, setStyle] = useState({ display: "none" });
  const [cmtP, setCmtP] = useState("");
  const [content, setContent] = useState(post.content);
  const [user, setUser] = useState<User | null>(null);
  const [editting, setEditting] = useState("Edit");
  const date = new Date(post.postDate).toLocaleString();

  const cmtPost = () => {
    if (style.display == "none") {
      setStyle({ display: "" });
    } else {
      setStyle({ display: "none" });
    }
  };
  const sharePost = () => {
    console.log(cmtP);
  };

  function confirmDelete() {
    const userConfirmed = confirm("Do you want to delete?");
    if (userConfirmed) {
      // Code to delete the item
      DeletePostByPostId(post.postId)
        .then(() => {
          update(true);
        })
        .catch(() => {
          console.log("error delete");
        });
    } else {
      console.log("Delete action canceled");
    }
  }
  const edit = () => {
    if (editting == "Edit") {
      setEditting("Save");
    } else {
      setEditting("Edit");
    }
  };

  const upCmtPost = () => {
    if (cmtP.trim() != "" && user != null) {
      const cmt: Comment = {
        cmtId: 0,
        userId: user.userId,
        postId: post.postId,
        content: cmtP,
        cmtDate: new Date(),
        level: 1,
        replyByCmtId: null,
      };
      UpCmt(cmt).then(() => {
        setCmtP("");
        GetCommentsByPostId(post.postId)
          .then((cs: Comment[]) => {
            setCmts(cs);
          })
          .catch(() => {});
      });
    }
  };
  const lovePost = () => {
    console.log(cmts);
  };

  useEffect(() => {
    GetUserLogined().then((user: User) => {
      setUser(user);
    });
    GetProfileByUserId(post.userId).then((pr: Profile) => {
      setProfile(pr);
    });
    GetCommentsByPostId(post.postId)
      .then((cs: Comment[]) => {
        setCmts(cs);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col partMain">
      <div className="postBg w-full">
        {editting == "Edit" ? (
          <>
            <div className="headerPost">
              <div className="avatar-name-Post">
                <Image className="avatarPost" src={avt} alt="none" />

                <div className="name_time_UpPost">
                  <a href="./profile" className="name">
                    {profile?.name}
                  </a>
                  <div className="time">{date}</div>
                </div>
              </div>
              <div className="flex">
                <div className="permissionPosted">{post.permission}</div>
                <div className="btn-dropdown">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Action</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={edit}>
                        {editting}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={confirmDelete}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <div className="detailUpPost">
              <div className="inputText">{content}</div>
              {post.linkImage != null ? (
                <div className="inputImage">
                  <Image
                    src={post.linkImage}
                    alt="none"
                    width={100}
                    height={100}
                  />
                </div>
              ) : null}
              {post.linkFile != null ? (
                <div className="inputImage">
                  <Input type="file" src={post.linkFile} />
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <div className="headerPost">
              <div className="avatar-name-Post">
                <Image className="avatarPost" src={avt} alt="none" />

                <div className="name_time_UpPost">
                  <a href="./profile" className="name">
                    {profile?.name}
                  </a>
                  <div className="time">{date}</div>
                </div>
              </div>
              <div className="flex">
                <div className="permissionPosted">{post.permission}</div>
                <div className="btn-dropdown">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Action</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={edit}>
                        {editting}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={confirmDelete}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <div className="detailUpPost">
              {content != null ? (
                <div className="flexMid">
                  <div className="ml-3 mr-3">Content:</div>
                  <Input
                    className="inputText"
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    value={content}
                  />
                </div>
              ) : null}
              {post.linkImage != null ? (
                <div className="inputImage">
                  <Image
                    src={post.linkImage}
                    alt="none"
                    width={100}
                    height={100}
                  />
                </div>
              ) : (
                <div className="flexMid">
                  <div className="ml-3 mr-3">Photo: </div>
                  <Input type="file"></Input>
                </div>
              )}

              {post.linkFile != null ? (
                <div className="inputImage">
                  <Input type="file" src={post.linkFile} />
                </div>
              ) : (
                <div className="flexMid">
                  <div className="ml-3 mr-3">File: </div>
                  <Input type="file"></Input>
                </div>
              )}
            </div>
          </>
        )}
        <div className="hr">
          <hr className="w-full" />
        </div>
        <div className="flex react">
          <button className="actBox love" onClick={lovePost}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.89346 2.35248C3.49195 2.35248 2.35248 3.49359 2.35248 4.90532C2.35248 6.38164 3.20954 7.9168 4.37255 9.33522C5.39396 10.581 6.59464 11.6702 7.50002 12.4778C8.4054 11.6702 9.60608 10.581 10.6275 9.33522C11.7905 7.9168 12.6476 6.38164 12.6476 4.90532C12.6476 3.49359 11.5081 2.35248 10.1066 2.35248C9.27059 2.35248 8.81894 2.64323 8.5397 2.95843C8.27877 3.25295 8.14623 3.58566 8.02501 3.88993C8.00391 3.9429 7.98315 3.99501 7.96211 4.04591C7.88482 4.23294 7.7024 4.35494 7.50002 4.35494C7.29765 4.35494 7.11523 4.23295 7.03793 4.04592C7.01689 3.99501 6.99612 3.94289 6.97502 3.8899C6.8538 3.58564 6.72126 3.25294 6.46034 2.95843C6.18109 2.64323 5.72945 2.35248 4.89346 2.35248ZM1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.0084 1.35248 6.73504 1.76049 7.20884 2.2953C7.32062 2.42147 7.41686 2.55382 7.50002 2.68545C7.58318 2.55382 7.67941 2.42147 7.79119 2.2953C8.265 1.76049 8.99164 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <div className="text-act">Love </div>
          </button>

          <button onClick={cmtPost} className="actBox cmt">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <div className="text-act">Comment</div>
          </button>

          <button onClick={sharePost} className="actBox share">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <div className="text-act">Share</div>
          </button>
        </div>
        <CommentList cmts={cmts} />
      </div>
      <div className="cmtPost flex" style={style}>
        <div className="title-cmtPost">Comment: </div>
        <input
          className="input-cmtPost"
          onChange={(e) => {
            setCmtP(e.target.value);
          }}
          value={cmtP}
        />
        <button className="upCmtBox" onClick={upCmtPost}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
