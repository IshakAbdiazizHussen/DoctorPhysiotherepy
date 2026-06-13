export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div>
      {eyebrow ? (
        <p className="text-[13px] uppercase tracking-[0.24em] text-[var(--accent)]">
          {eyebrow}
        </p>
      ) : null}
      {title ? <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em]">{title}</h2> : null}
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

