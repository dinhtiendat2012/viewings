"use client";
import { Profile } from "@/app/types/Object";
import OnlineCard from "@/components/ui/OnlineBoard/OnlineCard";
import React, { useEffect, useState } from "react";
interface FriendListProps {
  friends: Profile[]; // Định nghĩa kiểu cho props
}
export const OnlineDetail: React.FC<FriendListProps> = ({ friends }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Failed to fetch friends.");
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  // Hiển thị trạng thái loading hoặc lỗi
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {friends.map((friend) => (
        <div className="detail" key={friend.userId}>
          <OnlineCard friend={friend}></OnlineCard>
        </div>
      ))}
    </>
  );
};
