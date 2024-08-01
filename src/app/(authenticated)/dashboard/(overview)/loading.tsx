import { Skeleton } from "@/components/ui/skeleton";
import { type FC } from "react";

const Loading: FC = () => {
  return <Skeleton className="mx-auto mt-4 h-[140px] w-[350px] rounded-xl" />;
};

export default Loading;
