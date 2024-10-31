export interface Role {
  roleId: number;
  name: string;
}

export interface User {
  userId: number;
  email: string;
  password: string;
  status: string;
  roleId: number;
}

export interface Profile {
  profileId: number;
  userId: number;
  linkAvt: string;
  name: string;
  dob: Date;
  phone: string;
  address: string;
}

export interface RequestFriend {
  friendId: number;
  userId: number;
  status: boolean;
}

export interface Post {
  postId: number;
  userId: number;
  content: string | null;
  postDate: Date;
  linkImage: string | null;
  linkFile: string | null;
  permission: string;
  shareByPostId: number | null;
}

export interface Comment {
  cmtId: number;
  postId: number;
  userId: number;
  content: string;
  cmtDate: Date;
  replyByCmtId: number | null;
  level: number;
}

export interface Emotion {
  eId: number;
  name: string;
  linkIamge: string;
}

export interface EmotionOfPost {
  postId: number;
  userId: number;
  eId: number;
}

export interface EmotionOfComment {
  cmtId: number;
  userId: number;
  eId: number;
}
