"use client";
import logo from "@/app/public/images/banner.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/ui/Logout";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { GetProfile } from "@/app/types/GetProfile";
import { Profile, User } from "@/app/types/Object";
import { useEffect, useState } from "react";
import { GetUserLogined } from "@/app/types/GetUserLogined";
import { useUser } from "@/components/ui/UserContext";

export const Header = () => {
  const rou = useRouter();
  const { user, setUser } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const login = () => {
    rou.push("/login");
  };
  const register = () => {
    rou.push("/register");
  };
  useEffect(() => {
    GetUserLogined()
      .then((u: User) => {
        setUser(u);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    if (user) {
      GetProfile()
        .then((pr: Profile) => {
          setProfile(pr);
          return;
        })
        .catch(() => {
          return;
        });
    }
  }, [user]);

  return (
    <>
      {user ? (
        <div className="header">
          <a className="logo" href="/home">
            <Image priority={false} src={logo} alt="Logo" width={220}></Image>
          </a>
          <form className="search" action={"/"} method="post">
            <Input className="border-black" type="text" placeholder="Search" />
            <Button className="headerBtn m-3" variant="outline" type="submit">
              Search
            </Button>
          </form>
          <div className="header-btn">
            <div className="mt-2 mb-2 flex flex-col text-center">
              <p>Welcome,</p>
              <a href="/profile">{profile ? profile.name : null} !</a>
            </div>
            <LogoutButton
              logouted={() => {
                setUser(null);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="header">
          <a className="logo" href="/home">
            <Image priority={false} src={logo} alt="Logo" width={220}></Image>
          </a>
          <div></div>
          <div className="header-btn">
            <Button className="headerBtn" variant="outline" onClick={login}>
              Login
            </Button>
            <Button className="headerBtn" variant="outline" onClick={register}>
              Register
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
