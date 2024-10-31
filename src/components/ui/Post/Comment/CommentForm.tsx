import { Comment, Profile, User } from "@/app/types/Object";
import React, { useEffect, useState } from "react";
import "@/components/ui/Post/Comment/Comment.css";
import avt from "@/app/public/images/trend-avatar-1.jpg";
import Image from "next/image";
import { GetUserLogined } from "@/app/types/GetUserLogined";
import { GetProfileByUserId } from "@/app/types/GetProfileByUserId";
interface CommentProps {
  cmt: Comment;
  addCmt: (comment: Comment) => void;
}
export const CommentForm: React.FC<CommentProps> = ({ cmt, addCmt }) => {
  const date = new Date(cmt.cmtDate).toLocaleString();
  const [style, setStyle] = useState({ display: "none" });
  const [rep, setReply] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [owner, setOwner] = useState<Profile | null>();
  const love = () => {
    console.log(cmt);
  };
  const reply = () => {
    if (style.display == "none") {
      setStyle({ display: "" });
    } else {
      setStyle({ display: "none" });
    }
  };
  const upReply = () => {
    if (user != null && rep.trim() != "") {
      const newCmt: Comment = {
        cmtId: Date.now(),
        cmtDate: new Date(),
        content: rep,
        level: cmt.level + 1,
        postId: cmt.postId,
        replyByCmtId: cmt.cmtId,
        userId: user.userId,
      };
      setReply(""); // Reset input sau khi gửi
      //callback setCmts
      addCmt(newCmt); // Gửi comment mới về CommentList
    }
  };
  useEffect(() => {
    GetUserLogined().then((user: User) => {
      setUser(user);
    });
    GetProfileByUserId(cmt.userId).then((p) => {
      setOwner(p);
    });
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col pl-7 cmtForm">
        <div className="flex ">
          <div>
            <Image className="avatarCmt" src={avt} alt="none" />
          </div>
          <div className="name_time_UpCmt">
            <div className="nameCmt">{owner?.name}</div>
            <div className="time">{date}</div>
          </div>
        </div>
        <div className="contentCmt">{cmt.content}</div>
        <div className="reactCmt">
          <button className="loveCmt" onClick={love}>
            Love
          </button>
          {cmt.level < 3 ? (
            <button className="repCmt" onClick={reply}>
              Reply
            </button>
          ) : null}
        </div>
      </div>
      <div className="cmtReply flex" style={style}>
        <div className="title-cmtPost">Comment: </div>
        <input
          className="input-cmtPost"
          onChange={(e) => {
            setReply(e.target.value);
          }}
          value={rep}
        />
        <button className="upCmtBox" onClick={upReply}>
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
