import { cn } from "@/lib/utils";

export default function Card({ className = "", children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-[var(--border)] bg-[var(--surface)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

