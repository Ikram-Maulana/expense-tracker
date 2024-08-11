import { Navbar } from "@/app/(authenticated)/dashboard/_components/navbar";
import { type FC } from "react";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: FC<AuthenticatedLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <hr />
      <main>{children}</main>
    </>
  );
};

export default AuthenticatedLayout;
