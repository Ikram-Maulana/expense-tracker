import { Skeleton } from "@/components/ui/skeleton";
import { type FC } from "react";

const Loading: FC = () => {
  return (
    <>
      <Skeleton className="mx-auto mt-4 h-[150.5px] w-full max-w-3xl px-4" />
      <Skeleton className="mx-auto mt-4 h-[20px] w-[159.39px]" />
    </>
  );
};

export default Loading;
