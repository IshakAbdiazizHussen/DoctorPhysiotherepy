export default function Container({ children, className = "" }) {
  const hasCustomMaxWidth = /(^|\s)!?max-w-/.test(className);
  const hasCustomBasePx = /(^|\s)!?px-/.test(className);
  const hasCustomSmPx = /(^|\s)sm:!?px-/.test(className);
  const hasCustomLgPx = /(^|\s)lg:!?px-/.test(className);

  return (
    <div
      className={[
        "mx-auto w-full",
        hasCustomMaxWidth ? "" : "max-w-7xl",
        hasCustomBasePx ? "" : "px-4",
        hasCustomSmPx ? "" : "sm:px-6",
        hasCustomLgPx ? "" : "lg:px-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
