import OnlineBoard from "@/components/ui/OnlineBoard/OnlineBoard";
import Notification from "@/components/ui/Notification/Notification";
import "@/app/layoutLogined.css";
import { useEffect } from "react";
import { GetUserLogined } from "@/app/types/GetUserLogined";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}
const LayoutLogined: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    GetUserLogined()
      .then(() => {
        return;
      })
      .catch(() => {
        router.push("/login");
        return;
      });
    return;
  }, []);

  return (
    <div className="containerVie">
      <div className="left_bar">
        <OnlineBoard />
      </div>
      <div className="main">{children}</div>
      <div className="right_bar">
        <Notification />
      </div>
    </div>
  );
};
export default LayoutLogined;
