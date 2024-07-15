import { Navbar } from "@/app/(authenticated)/dashboard/_components/navbar";
import { type FC } from "react";

interface GuestLayoutProps {
  children: React.ReactNode;
}

const GuestLayout: FC<GuestLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <hr />
      <main>{children}</main>
    </>
  );
};

export default GuestLayout;
