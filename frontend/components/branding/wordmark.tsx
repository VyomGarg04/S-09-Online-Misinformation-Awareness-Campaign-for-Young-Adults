interface WordmarkProps {
  className?: string;
}

export function Wordmark({ className }: WordmarkProps) {
  return (
    <div className={className}>
      <h1 className="text-xl font-bold tracking-tight text-foreground">
        MEDIA
        <span className="text-primary">SHIELD</span>
      </h1>

      <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
        VERIFY • LEARN • EMPOWER
      </p>
    </div>
  );
}