import { cn } from "@/lib/utils";

export default function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "h-16 w-full rounded-[16px] border border-[var(--border)] bg-transparent px-5 outline-none",
        className
      )}
      {...props}
    />
  );
}

