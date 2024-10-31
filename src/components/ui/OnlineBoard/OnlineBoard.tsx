"use client";
import { Profile } from "@/app/types/Object";
import { OnlineDetail } from "@/components/ui/OnlineBoard/OnlineDetail";
import React, { useState } from "react";

export default function OnlineBoard() {
  const [friends] = useState<Profile[]>([
    {
      userId: 1,
      profileId: 1,
      address: "",
      dob: new Date(),
      linkAvt: "",
      name: "Ban cua toi",
      phone: "",
    },
  ]);
  return (
    <>
      <div className="title">Online</div>
      <hr />
      <br />
      <OnlineDetail friends={friends} />
    </>
  );
}
