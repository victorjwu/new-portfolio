import { useEffect, useState } from "react";
import { Link, useNavigate, type NavigateFunction } from "react-router-dom";
import { useSFTime } from "../hooks/useSFTime";
import HeroVideo from "../components/HeroVideo";
import styles from "./LandingPage.module.css";

/**
 * Page transition: a paper-colored circle expands from the clicked CTA,
 * covers the screen, route changes underneath, then overlay fades out.
 * The overlay is created on document.body so it survives the route change.
 */
function ctaTransition(
  to: string,
  e: React.MouseEvent<HTMLAnchorElement>,
  navigate: NavigateFunction
) {
  e.preventDefault();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    navigate(to);
    return;
  }

  const rect = e.currentTarget.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const startRadius = Math.max(rect.width, rect.height) / 2;

  const overlay = document.createElement("div");
  overlay.setAttribute("aria-hidden", "true");
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    background: "var(--paper)",
    zIndex: "9000",
    pointerEvents: "none",
    clipPath: `circle(${startRadius}px at ${cx}px ${cy}px)`,
    transition:
      "clip-path 720ms cubic-bezier(0.7, 0, 0.3, 1), opacity 420ms ease-out",
    willChange: "clip-path, opacity",
    opacity: "1",
  } satisfies Partial<CSSStyleDeclaration>);
  document.body.appendChild(overlay);

  // Trigger expand on next frame so the initial clip-path is committed first.
  requestAnimationFrame(() => {
    overlay.style.clipPath = `circle(200vmax at ${cx}px ${cy}px)`;
  });

  // Route change while overlay is ~95% expanded — masks the swap.
  window.setTimeout(() => navigate(to), 680);
  // After the new page mounts and starts its own fade-in, ease the overlay off.
  window.setTimeout(() => {
    overlay.style.opacity = "0";
  }, 900);
  window.setTimeout(() => {
    overlay.remove();
  }, 1340);
}

const NOW_STATES = [
  { label: "BUILDING", value: "mise · v0.1" },
  { label: "SHOOTING", value: "Fuji X100VI" },
  { label: "LISTENING", value: "Karri · SWV" },
];

const NAME = "VICTOR WU";

export default function LandingPage() {
  const [nowIdx, setNowIdx] = useState(0);
  const sfTime = useSFTime();
  const navigate = useNavigate();

  useEffect(() => {
    const id = window.setInterval(() => {
      setNowIdx((i) => (i + 1) % NOW_STATES.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  const now = NOW_STATES[nowIdx];

  return (
    <main className={`${styles.hero} page`}>
      <HeroVideo
        poster="/assets/hero-poster.jpg"
        src="/assets/video/stabalized-background.mp4"
      />
      <div className={styles.grain} aria-hidden="true">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className={styles.frame}>
        <div className={styles.topChrome}>
          <span>WU · PORTFOLIO 2025</span>
          <span>INDEX · 01 / 03</span>
        </div>

        <div className={styles.center}>
          <div className={styles.eyebrow}>SOFTWARE · DESIGN · PHOTOGRAPHY</div>
          <h1 className={styles.name}>
            {NAME.split("").map((ch, i) => (
              <span
                key={i}
                className={styles.letter}
                style={{ animationDelay: `${0.2 + i * 0.045}s` }}
              >
                {ch === " " ? " " : ch}
              </span>
            ))}
          </h1>
          <p className={styles.sub}>
            Everything I've been working on lately — software, photography, and
            content.
            <br />
            <em>(this site is a work in progress)</em>
          </p>
          <div className={styles.ctas}>
            <Link
              to="/software-engineering"
              onClick={(e) => ctaTransition("/software-engineering", e, navigate)}
              className={`${styles.cta} tactile`}
            >
              <span>SOFTWARE ENGINEERING</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
            <Link
              to="/art-creative"
              onClick={(e) => ctaTransition("/art-creative", e, navigate)}
              className={`${styles.cta} tactile`}
            >
              <span>ART &amp; CREATIVE</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </div>

        <div className={styles.bottomChrome}>
          <div className={styles.now}>
            <div className={styles.nowLabel}>
              <span className={styles.nowDot} aria-hidden="true" />
              NOW · {now.label}
            </div>
            <div key={nowIdx} className={styles.nowValue}>
              {now.value}
            </div>
          </div>
          <div className={styles.clock}>
            <div className={styles.nowLabel}>SAN FRANCISCO</div>
            <div className={styles.clockValue}>{sfTime} PST</div>
          </div>
        </div>
      </div>
    </main>
  );
}
