import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { type FC } from "react";

const AllExpensesSkeleton: FC = () => {
  return Array.from({ length: 4 }, (_, i) => (
    <TableRow key={i}>
      {Array.from({ length: 4 }).map((_, cellIndex) => (
        <TableCell key={cellIndex}>
          <Skeleton className="h-4" />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default AllExpensesSkeleton;
