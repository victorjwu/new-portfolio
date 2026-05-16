type Props = { index: number; label: string };

const PALETTES = [
  { bg: "#dcdbcc", tint: "#cbd2bb", accent: "#6f8067", ink: "#3d4239" },
  { bg: "#e0dfd0", tint: "#bdc6ac", accent: "#4a5e44", ink: "#3d4239" },
  { bg: "#dcdbcc", tint: "#c4ccb4", accent: "#7f8b76", ink: "#3d4239" },
  { bg: "#e3e1d2", tint: "#c1c8b2", accent: "#5e7256", ink: "#3d4239" },
];

export default function DesignPlaceholder({ index, label }: Props) {
  const p = PALETTES[index % PALETTES.length];
  const v = index % 4;

  return (
    <svg
      viewBox="0 0 400 250"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: "block" }}
    >
      <rect width="400" height="250" fill={p.bg} />

      {v === 0 && (
        <>
          <rect x="60" y="50" width="280" height="40" fill={p.tint} />
          <rect x="60" y="100" width="280" height="40" fill={p.accent} />
          <rect x="60" y="150" width="280" height="40" fill={p.tint} />
          <circle cx="340" cy="120" r="8" fill={p.accent} />
        </>
      )}
      {v === 1 && (
        <>
          <rect x="0" y="0" width="200" height="250" fill={p.tint} />
          <circle cx="100" cy="125" r="46" fill={p.accent} />
          <rect x="220" y="80" width="140" height="10" fill={p.ink} opacity="0.55" />
          <rect x="220" y="100" width="100" height="6" fill={p.ink} opacity="0.4" />
          <rect x="220" y="150" width="64" height="22" fill={p.accent} />
        </>
      )}
      {v === 2 && (
        <>
          <rect x="0" y="0" width="400" height="36" fill={p.tint} />
          <circle cx="22" cy="18" r="8" fill={p.accent} />
          <rect x="20" y="60" width="160" height="170" fill={p.tint} />
          <rect x="200" y="60" width="180" height="170" fill={p.accent} />
          <rect x="216" y="80" width="120" height="6" fill={p.bg} opacity="0.7" />
          <rect x="216" y="96" width="80" height="6" fill={p.bg} opacity="0.5" />
          <rect x="216" y="180" width="56" height="20" fill={p.bg} opacity="0.85" />
        </>
      )}
      {v === 3 && (
        <>
          <circle cx="200" cy="125" r="90" fill="none" stroke={p.accent} strokeWidth="1" />
          <circle cx="200" cy="125" r="60" fill="none" stroke={p.accent} strokeWidth="1" />
          <circle cx="200" cy="125" r="30" fill={p.accent} />
          <rect x="0" y="0" width="400" height="250" fill={p.accent} opacity="0.05" />
        </>
      )}

      <text
        x="20"
        y="232"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
        letterSpacing="0.12em"
        fill={p.ink}
        opacity="0.55"
      >
        {label}
      </text>
    </svg>
  );
}
