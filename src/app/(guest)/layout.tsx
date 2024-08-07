import { type FC } from "react";

export const runtime = "edge";

interface GuestLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const GuestLayout: FC<GuestLayoutProps> = ({ children, modal }) => {
  return (
    <main>
      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-white">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
      </div>
      <div className="relative h-screen w-full">
        {children}
        {modal}
      </div>
    </main>
  );
};

export default GuestLayout;
