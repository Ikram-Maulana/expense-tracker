import Image from "next/image";
import { type FC } from "react";

interface authLayoutProps {
  children: React.ReactNode;
}

const authLayout: FC<authLayoutProps> = ({ children }) => {
  return (
    <main className="h-full lg:mx-auto lg:max-w-screen-2xl lg:px-0">
      <div className="grid h-full grid-cols-2">
        <div className="container col-span-2 flex h-full flex-col items-center justify-center lg:col-span-1">
          {children}
        </div>

        <div className="relative hidden h-full overflow-hidden lg:block">
          <Image
            src="/images/street.webp"
            alt="A man riding a motorcycle down a street next to tall buildings"
            className="h-full w-full object-cover"
            fill
            priority
          />
        </div>
      </div>
    </main>
  );
};

export default authLayout;
