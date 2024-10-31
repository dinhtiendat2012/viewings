import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import avatar from "@/app/public/images/trend-avatar-1.jpg";
import { Button } from "@/components/ui/button";
import { GetUserLogined } from "@/app/types/GetUserLogined";
import { Profile, User } from "@/app/types/Object";
import { GetProfile } from "@/app/types/GetProfile";
import { useRouter } from "next/navigation";
export default function ProfileDetail() {
  const rou = useRouter();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    roleId: 0,
    status: "",
    userId: 0,
  });
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editting, setEditting] = useState(false);
  // const checkUser =async () =>{
  //   const res = await api.get("/api/profile");
  // }
  const editProfileForm = () => {
    if (editting == false) {
      setEditting(true);
    }
  };
  const saveProfile = () => {
    if (editting == true) {
      setEditting(false);
    }
  };
  useEffect(() => {
    GetUserLogined()
      .then((user: User) => {
        if (user != null) {
          setUser(user);
          //Lay info
          GetProfile()
            .then((profile: Profile) => {
              console.log(profile);
              setProfile(profile);
            })
            .catch(() => {
              return;
            });
        }
      })
      .catch(() => {
        rou.push("/login");
        return;
      });
  }, []);

  const editProfile = () => {};
  if (profile == null) {
    return <p>Loading Profile...</p>;
  } else {
    const date = new Date(profile.dob).toLocaleDateString();
    return (
      <>
        {editting ? (
          <form onSubmit={editProfile} className="detail">
            <div className="w-1/3 h-full min-w-7 flex flex-col">
              <Image className="w-7 h-7 avatarPr" src={avatar} alt="non" />
              <Input className="w-3/4" type="file" />
            </div>

            <div className="w-1/12 min-w-24">
              <div className="inputTitle">Name:</div>
              <br />
              <div className="inputTitle">Email:</div>
              <br />
              <div className="inputTitle">Dob: </div>
              <br />
              <div className="inputTitle">Phone: </div>
              <br />
              <div className="inputTitle">Address: </div>
              <br />
              <div className="inputTitle">Password: </div>
              <br />
            </div>
            <div className="w-1/4 min-w-10">
              <Input
                type="text"
                placeholder="Name"
                value={profile.name}
                name="name"
              />
              <br />
              <Input
                type="email"
                placeholder="Email"
                value={user.email}
                readOnly
              />
              <br />
              <div className="flex">
                <Input type="date" placeholder="Dob" />
                <div className="inputInfo">{date}</div>
              </div>

              <br />
              <Input
                type="number"
                placeholder="Phone"
                value={profile.phone}
                name="phone"
              />
              <br />
              <Input
                type="text"
                placeholder="Address"
                value={profile.address}
                name="address"
              />
              <br />
              <Input
                type="password"
                placeholder="Password"
                value={user.password}
                readOnly
              />
              <br />
              <Button type="submit" onClick={saveProfile}>
                Save
              </Button>
              <div>
                <br />
              </div>
            </div>
          </form>
        ) : (
          <div className="detail">
            <div className="w-1/3 h-full min-w-7">
              <Image className="w-20 h-20 avatarPr" src={avatar} alt="non" />
            </div>
            <div className="w-1/12 min-w-24">
              <div className="inputTitle">Name:</div>
              <br />
              <div className="inputTitle">Email:</div>
              <br />
              <div className="inputTitle">Dob: </div>
              <br />
              <div className="inputTitle">Phone: </div>
              <br />
              <div className="inputTitle">Address: </div>
              <br />
            </div>
            <div className="w-1/4 min-w-10">
              <div className="inputInfo">{profile.name}</div>
              <br />
              <div className="inputInfo">{user.email}</div>
              <br />
              <div className="inputInfo">{date}</div>
              <br />
              <div className="inputInfo">{profile.phone} </div>
              <br />
              <div className="inputInfo">{profile.address} </div>
              <br />
              <Button onClick={editProfileForm}>Edit</Button>
              <div>
                <br />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
