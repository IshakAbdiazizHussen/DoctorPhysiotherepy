import { cn } from "@/lib/utils";

export default function Badge({ className = "", children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-normal",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

