import { useEffect, useRef, useState } from "react";
import styles from "./HeroVideo.module.css";

type Props = {
  /** Required poster image (shown immediately + as fallback if video can't load). */
  poster: string;
  /** Optional H.264 .mp4 — render only when this is set. */
  src?: string;
  /** Optional VP9 .webm — listed first when present so capable browsers grab it. */
  webm?: string;
  /** Max parallax offset in px (default 14). 0 disables. */
  parallax?: number;
};

type NetworkInfo = { effectiveType?: string; saveData?: boolean };

function shouldShowVideo(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return false;
  return true;
}

export default function HeroVideo({ poster, src, webm, parallax = 14 }: Props) {
  const [showVideo, setShowVideo] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!src && !webm) return;
    setShowVideo(shouldShowVideo());
  }, [src, webm]);

  useEffect(() => {
    if (!parallax) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const el = parallaxRef.current;
    if (!el) return;

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      // Normalize cursor position to -0.5..0.5 around viewport center,
      // then invert so the layer moves opposite to the cursor (depth feel).
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      tx = nx * -parallax * 2;
      ty = ny * -parallax * 2;
    };

    const tick = () => {
      // Slow lerp — gives the background weight, like a heavy camera.
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.setProperty("--px", `${x.toFixed(2)}px`);
      el.style.setProperty("--py", `${y.toFixed(2)}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [parallax]);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div ref={parallaxRef} className={styles.parallax}>
        <div
          className={styles.poster}
          style={{ backgroundImage: `url(${poster})` }}
        />
        {showVideo && (
          <video
            ref={videoRef}
            className={`${styles.video} ${ready ? styles.ready : ""}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            onCanPlay={() => setReady(true)}
          >
            {webm && <source src={webm} type="video/webm" />}
            {src && <source src={src} type="video/mp4" />}
          </video>
        )}
      </div>
    </div>
  );
}
