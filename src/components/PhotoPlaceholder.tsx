type Props = {
  seed: number;
  cap: string;
  id: string;
};

const PALETTES = [
  ["#b9c1a0", "#cdd2b6"],
  ["#9aa68a", "#b1b89e"],
  ["#a7b0a0", "#c0c2af"],
  ["#7f8b76", "#a3a98f"],
  ["#bdb9a1", "#cfc9b1"],
  ["#8e9580", "#b0b099"],
  ["#a59f88", "#c0bba2"],
  ["#9eaa92", "#b8c0a7"],
  ["#86927d", "#aab2a0"],
];

export default function PhotoPlaceholder({ seed, cap, id }: Props) {
  const [a, b] = PALETTES[seed % PALETTES.length];
  const rot = 30 + seed * 17;
  const patternId = `stripes-${seed}`;
  const vignetteId = `vignette-${seed}`;
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      style={{ display: "block" }}
    >
      <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          width="22"
          height="22"
          patternTransform={`rotate(${rot})`}
        >
          <rect width="22" height="22" fill={a} />
          <rect width="11" height="22" fill={b} />
        </pattern>
        <radialGradient id={vignetteId} cx="50%" cy="50%" r="65%">
          <stop offset="60%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(20,18,15,0.18)" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${patternId})`} />
      <rect width="400" height="300" fill={`url(#${vignetteId})`} />
      <text
        x="14"
        y="290"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
        letterSpacing="0.08em"
        fill="rgba(31,27,24,0.55)"
      >
        {cap}
      </text>
      <text
        x="386"
        y="22"
        textAnchor="end"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
        letterSpacing="0.08em"
        fill="rgba(31,27,24,0.55)"
      >
        {id}
      </text>
    </svg>
  );
}
