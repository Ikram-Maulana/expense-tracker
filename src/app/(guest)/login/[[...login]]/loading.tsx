import { Skeleton } from "@/components/ui/skeleton";
import { type FC } from "react";

const Loading: FC = () => {
  return (
    <div className="grid h-full w-full flex-grow items-center bg-zinc-100 px-4 sm:justify-center">
      <Skeleton className="h-[132px] w-full rounded-xl shadow sm:w-96" />
    </div>
  );
};

export default Loading;
