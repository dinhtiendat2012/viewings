import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface LogoutProps {
  logouted: (check: boolean) => void;
}

const LogoutButton: React.FC<LogoutProps> = ({ logouted }) => {
  const router = useRouter();

  const HandleLogout = () => {
    logouted(true);
    // Xóa thông tin đăng nhập (ví dụ: token)
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    // Điều hướng đến trang đăng nhập
    router.push("/login");
  };

  return (
    <Button className="headerBtn m-4" variant="outline" onClick={HandleLogout}>
      Logout
    </Button>
  );
};
export default LogoutButton;
