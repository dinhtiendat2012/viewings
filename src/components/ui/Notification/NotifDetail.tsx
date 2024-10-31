import NotifiCard from "@/components/ui/Notification/NotifiCard";
import React from "react";

export default function NotifDetail() {
  const notifi: string =
    "Something news !!! Careful how does it feel becoming so beautiful !";
  return (
    <div className="detail">
      {/* Map bla bla nhieu 1 cai list thong bao {notifiList} */}
      <NotifiCard notifi={notifi}></NotifiCard>
    </div>
  );
}
