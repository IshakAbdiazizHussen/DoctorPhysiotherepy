import { cn } from "@/lib/utils";

export default function Select({ className = "", children, ...props }) {
  return (
    <select
      className={cn(
        "h-16 w-full rounded-[16px] border border-[var(--border)] bg-transparent px-5 outline-none",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

