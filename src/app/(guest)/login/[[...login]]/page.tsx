import { type FC } from "react";
import { LoginForm } from "./_components/login-form";

const HomePage: FC = () => {
  return (
    <div className="grid h-full w-full flex-grow items-center bg-zinc-100 px-4 sm:justify-center">
      <LoginForm />
    </div>
  );
};

export default HomePage;
