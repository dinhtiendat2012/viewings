import { Profile } from "@/app/types/Object";
import Image from "next/image";
import avatar from "@/app/public/images/trend-avatar-1.jpg";

interface FriendCardProps {
  friend: Profile; // Định nghĩa kiểu cho props
}

const FriendCard: React.FC<FriendCardProps> = ({ friend }) => {
  return (
    <div className="friend-card border rounded-lg overflow-hidden shadow-md">
      <Image
        src={avatar}
        alt="none"
        className="w-full h-32 object-cover"
        width={100}
        height={100}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{friend.name}</h3>
      </div>
    </div>
  );
};

export default FriendCard;
