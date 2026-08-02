import { LogoIcon } from "./logo-icon";
import { Wordmark } from "./wordmark";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <LogoIcon />

      <Wordmark />
    </div>
  );
}