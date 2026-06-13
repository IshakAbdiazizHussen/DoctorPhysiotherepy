import { cn } from "@/lib/utils";

export default function Button({ className = "", children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

