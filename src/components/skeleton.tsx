import { cn } from "@/lib/utils";

export default function Skeleton({ className }: { className?: string }) {
  return <div className={cn("rounded bg-gray-300/50", className)}></div>;
}
