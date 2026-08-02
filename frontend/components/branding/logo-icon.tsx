interface LogoIconProps {
  className?: string;
}

export function LogoIcon({ className }: LogoIconProps) {
  return (
    <div
      className={`relative aspect-square w-10 shrink-0 ${className ?? ""}`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#3B2A1E] via-[#6B4A2E] to-[#A9744A]"
        style={{
          clipPath:
            "polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0% 50%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[78%] w-[2px] rounded-full bg-[#FFF8EF]" />

        <div className="absolute h-[2px] w-[78%] rotate-60 rounded-full bg-[#FFF8EF]" />

        <div className="absolute h-[2px] w-[78%] -rotate-60 rounded-full bg-[#FFF8EF]" />
      </div>
    </div>
  );
}