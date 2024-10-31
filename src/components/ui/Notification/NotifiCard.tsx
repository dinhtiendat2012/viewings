import React from "react";
import "@/components/ui/Notification/notification.css";

interface notifiProps {
  notifi: string;
}
const NotifiCard: React.FC<notifiProps> = ({ notifi }) => {
  return <div className="notiCard">{notifi}</div>;
};
export default NotifiCard;
