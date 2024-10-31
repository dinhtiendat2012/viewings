import { Comment } from "@/app/types/Object";
import { CommentForm } from "@/components/ui/Post/Comment/CommentForm";
import React, { useEffect, useState } from "react";
import "@/components/ui/Post/Comment/Comment.css";
import { UpCmt } from "@/app/types/UpCmtOfPost";
import { GetCommentsByPostId } from "@/app/types/GetCommentByPostId";
interface CommentsProps {
  cmts: Comment[];
}
export const CommentList: React.FC<CommentsProps> = ({ cmts }) => {
  const [hidden, setHidden] = useState<string>("More");
  const [style, setStyle] = useState({ display: "none" });
  const [hidden3, setHidden3] = useState<string>("More");
  const [style3, setStyle3] = useState({ display: "none" });
  const [cmtList, setCmtList] = useState<Comment[]>(cmts);
  useEffect(() => {
    setCmtList(cmts);
  }, [cmts]);

  const addNewCmt = (newCmt: Comment) => {
    UpCmt(newCmt).then(() => {
      GetCommentsByPostId(newCmt.postId).then((cs) => {
        setCmtList(cs);
      });
    });
  };

  const hide2 = () => {
    if (hidden == "Less") {
      setHidden("More");
      setStyle({ display: "none" });
    } else {
      setHidden("Less");
      setStyle({ display: "" });
    }
  };
  const hide3 = () => {
    if (hidden3 == "Less") {
      setHidden3("More");
      setStyle3({ display: "none" });
    } else {
      setHidden3("Less");
      setStyle3({ display: "" });
    }
  };

  if (cmtList != null) {
    return (
      <div className="flex flex-col cmtList">
        {/* Lay tat ca comment level 1 */}
        {cmtList.map((cmt1) => (
          <div key={cmt1.cmtId} className="flex flex-col">
            {cmt1.level == 1 ? (
              <>
                <CommentForm cmt={cmt1} addCmt={addNewCmt} />
                <button className="hide" onClick={hide2}>
                  {hidden}
                </button>
                {/* Lay tat ca comment level 2 va la reply cua cmt1 tren */}
                {cmtList.map((cmt2) => (
                  <div
                    key={cmt2.cmtId}
                    style={style}
                    className="flex flex-col ml-16"
                  >
                    {cmt2.replyByCmtId == cmt1.cmtId && cmt2.level == 2 ? (
                      <>
                        <CommentForm cmt={cmt2} addCmt={addNewCmt} />
                        <button className="hide" onClick={hide3}>
                          {hidden3}
                        </button>
                        {/* Lay tat ca comment level 3 va la reply cua cmt2 tren */}
                        {cmtList.map((cmt3) => (
                          <div
                            key={cmt3.cmtId}
                            style={style3}
                            className="ml-16"
                          >
                            {cmt3.replyByCmtId == cmt2.cmtId &&
                            cmt3.level == 3 ? (
                              <>
                                <CommentForm cmt={cmt3} addCmt={addNewCmt} />
                              </>
                            ) : null}
                          </div>
                        ))}
                      </>
                    ) : null}
                  </div>
                ))}
              </>
            ) : null}
          </div>
        ))}
      </div>
    );
  } else {
    return <p>No cmt...</p>;
  }
};
