interface WordmarkProps {
  className?: string;
  showTagline?: boolean;
}

/**
 * MediaShield Wordmark — "MEDIASHIELD" in Poppins SemiBold
 * with tagline "THINK CRITICALLY. VERIFY TRUTH."
 */
export function Wordmark({ className, showTagline = true }: WordmarkProps) {
  return (
    <div className={className}>
      <h1
        className="text-xl font-semibold tracking-tight text-foreground"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <span className="text-[#3B2A1E] dark:text-[#E8DCC6]">MEDIA</span>
        <span className="text-[#A9744A]">SHIELD</span>
      </h1>

      {showTagline && (
        <p
          className="text-[9px] uppercase tracking-[0.3em] text-[#6B4A2E] dark:text-[#A9744A] font-medium"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Think Critically. Verify Truth.
        </p>
      )}
    </div>
  );
}