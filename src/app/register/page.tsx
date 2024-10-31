"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import "@/app/register/register.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GetUserLogined } from "@/app/types/GetUserLogined";
import { Profile, User } from "@/app/types/Object";
import { AddUser } from "@/app/types/AddUser";
import { AddProfile } from "@/app/types/AddProfile";
import { GetSetToken } from "@/app/types/GetSetToken";
// import { setUserCookie } from "@/app/api/server";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Kiểm tra trạng thái đăng nhập khi trang được tải
  useEffect(() => {
    // Kiểm tra token trong localStorage
    GetUserLogined()
      .then(() => {
        // Nếu đã đăng nhập, chuyển hướng về trang profile
        router.push("/profile");
      })
      .catch(() => {});
  }, []);

  const HandleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const user: User = {
      userId: 0,
      email: "" + email,
      password: "" + password,
      status: "Offline",
      roleId: 2,
    };

    AddUser(user)
      .then((userId: number) => {
        const profile: Profile = {
          userId: userId,
          name: name,
          address: "",
          dob: new Date(),
          linkAvt: "",
          phone: "",
          profileId: 0,
        };
        AddProfile(profile)
          .then(() => {
            GetSetToken(user);
            router.push("/profile");
          })
          .catch(() => {
            setError("Register fail!");
          });
      })
      .catch(() => {
        setError("Register fail!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="background flex justify-center min-h-screen h-auto">
      <form className="loginForm" onSubmit={HandleSubmit}>
        <br />
        <div className="title">Register</div>
        <br />
        <div className="flex">
          <div className="w-1/4">
            <div className="inputTitle">Name :</div>
            <br />
            <div className="inputTitle">Email :</div>
            <br />
            <div className="inputTitle">Password :</div>
            <br />
          </div>
          <div className="w-2/3">
            <Input
              name="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
            <Input
              name="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <Input
              name="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className=" bottom-10 left-10 right-10">
          <div className="flex justify-center">
            <p style={{ color: "red" }}>{error}</p>
          </div>
          <br />
          <div className="flex justify-center">
            <Button type="submit" variant="outline" disabled={loading}>
              {loading ? "Loading..." : "Register"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
