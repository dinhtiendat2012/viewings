// import api from "@/app/api/api";
"use client";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { UserProvider } from "@/components/ui/UserContext";
interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <UserProvider>
      <html>
        <body>
          <Header />
          {children}
        </body>
      </html>
    </UserProvider>
  );
};
export default RootLayout;
