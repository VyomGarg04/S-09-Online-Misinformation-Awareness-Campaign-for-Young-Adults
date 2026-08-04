interface LogoIconProps {
  className?: string;
  size?: number;
}

/**
 * MediaShield Brand Icon — 3D isometric cube within a hexagonal
 * emblem. Alternating warm brown facets create depth and dimension.
 * Represents multiple perspectives converging on truth at the center.
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
      {/* Hexagon outline shape */}
      <polygon
        points="50,2 93,27 93,73 50,98 7,73 7,27"
        fill="#3B2A1E"
      />

      {/* 6 triangular facets — alternating tones for 3D cube illusion */}

      {/* Top-right facet (lightest — top face of cube) */}
      <polygon points="50,2 93,27 50,50" fill="#C4956A" />

      {/* Top-left facet (medium light) */}
      <polygon points="50,2 7,27 50,50" fill="#A9744A" />

      {/* Right facet (medium — right face of cube) */}
      <polygon points="93,27 93,73 50,50" fill="#8B5E3C" />

      {/* Left facet (warm mid-tone — left face of cube) */}
      <polygon points="7,27 7,73 50,50" fill="#6B4A2E" />

      {/* Bottom-right facet (darker) */}
      <polygon points="93,73 50,98 50,50" fill="#4A3425" />

      {/* Bottom-left facet (darkest) */}
      <polygon points="50,98 7,73 50,50" fill="#3B2A1E" />

      {/* Inner cube edges — subtle cream lines for 3D structure */}
      <line x1="50" y1="2" x2="50" y2="50" stroke="#E8DCC6" strokeWidth="0.8" opacity="0.6" />
      <line x1="50" y1="50" x2="50" y2="98" stroke="#E8DCC6" strokeWidth="0.8" opacity="0.3" />
      <line x1="7" y1="27" x2="50" y2="50" stroke="#E8DCC6" strokeWidth="0.8" opacity="0.4" />
      <line x1="93" y1="27" x2="50" y2="50" stroke="#E8DCC6" strokeWidth="0.8" opacity="0.4" />
      <line x1="7" y1="73" x2="50" y2="50" stroke="#E8DCC6" strokeWidth="0.8" opacity="0.3" />
      <line x1="93" y1="73" x2="50" y2="50" stroke="#E8DCC6" strokeWidth="0.8" opacity="0.3" />

      {/* Inner hexagon — smaller, for the "truth at center" motif */}
      <polygon
        points="50,22 72,36 72,64 50,78 28,64 28,36"
        fill="none"
        stroke="#E8DCC6"
        strokeWidth="0.7"
        opacity="0.35"
      />
    </svg>
  );
}