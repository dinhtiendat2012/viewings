"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import "@/app/login/login.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { User } from "@/app/types/Object";
import { GetUserLogined } from "@/app/types/GetUserLogined";
import { GetSetToken } from "@/app/types/GetSetToken";
import { useUser } from "@/components/ui/UserContext";
// import { setUserCookie } from "@/app/api/server";

const LoginPage = () => {
  const { user, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (user) {
    router.push("/profile");
  }

  const HandleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const user: User = {
      userId: 0,
      email: "" + email,
      password: "" + password,
      status: "",
      roleId: 0,
    };

    GetSetToken(user)
      .then(() => {
        setLoading(false);
        GetUserLogined().then((u) => {
          setUser(u);
        });
        alert("Login successful !");
        router.push("/profile");
        return;
      })
      .catch(() => {
        setLoading(false);
        setError("Login failed !");
        return;
      });
  };

  return (
    <div className="background flex justify-center min-h-screen h-auto">
      <form className="loginForm" onSubmit={HandleSubmit}>
        <br />
        <div className="title">Login</div>
        <br />
        <div className="flex">
          <div className="w-1/4">
            <div className="inputTitle">Email :</div>
            <br />
            <div className="inputTitle">Password :</div>
            <br />
          </div>
          <div className="w-2/3">
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
              {loading ? "Loading..." : "Login"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
