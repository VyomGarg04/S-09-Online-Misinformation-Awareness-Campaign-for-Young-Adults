interface LogoIconProps {
  className?: string;
  size?: number;
}

/**
 * MediaShield Brand Icon — Geometric hexagonal emblem with
 * six triangular facets in earthy brown tones.
 * Represents information from multiple perspectives converging
 * on truth at the center.
 */
export function LogoIcon({ className, size = 40 }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ""}`}
      aria-label="MediaShield Logo Icon"
    >
      {/* Outer hexagon clip */}
      <defs>
        <clipPath id="hexClip">
          <polygon points="50,3 93.3,28 93.3,72 50,97 6.7,72 6.7,28" />
        </clipPath>
      </defs>

      <g clipPath="url(#hexClip)">
        {/* Background fill */}
        <rect width="100" height="100" fill="#E8DCC6" />

        {/* Top triangle */}
        <polygon points="50,3 93.3,28 50,50" fill="#3B2A1E" />
        {/* Top-left triangle */}
        <polygon points="50,3 6.7,28 50,50" fill="#6B4A2E" />
        {/* Right triangle */}
        <polygon points="93.3,28 93.3,72 50,50" fill="#A9744A" />
        {/* Bottom-right triangle */}
        <polygon points="93.3,72 50,97 50,50" fill="#6B4A2E" />
        {/* Bottom-left triangle */}
        <polygon points="50,97 6.7,72 50,50" fill="#3B2A1E" />
        {/* Left triangle */}
        <polygon points="6.7,28 6.7,72 50,50" fill="#A9744A" />

        {/* Inner hexagon highlight */}
        <polygon
          points="50,22 72,35 72,65 50,78 28,65 28,35"
          fill="none"
          stroke="#E8DCC6"
          strokeWidth="1.2"
          opacity="0.5"
        />

        {/* Center lines radiating out — "multiple perspectives" motif */}
        <line x1="50" y1="3" x2="50" y2="97" stroke="#F6F2EB" strokeWidth="1" opacity="0.35" />
        <line x1="6.7" y1="28" x2="93.3" y2="72" stroke="#F6F2EB" strokeWidth="1" opacity="0.35" />
        <line x1="93.3" y1="28" x2="6.7" y2="72" stroke="#F6F2EB" strokeWidth="1" opacity="0.35" />
      </g>
    </svg>
  );
}