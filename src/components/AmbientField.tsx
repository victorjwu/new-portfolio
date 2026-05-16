import styles from "./AmbientField.module.css";

/**
 * Site-wide ambient grain. Very low opacity SVG noise multiplied over the
 * page background to give the cream surface a paper-like texture.
 */
export default function AmbientField() {
  return (
    <div className={styles.field} aria-hidden="true">
      <svg className={styles.grain}>
        <filter id="ambient-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ambient-noise)" />
      </svg>
    </div>
  );
}
