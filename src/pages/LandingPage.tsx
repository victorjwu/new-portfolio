import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const NOW_STATES = [
  { label: "BUILDING", value: "mise · v0.1" },
  { label: "SHOOTING", value: "Fuji X100VI" },
  { label: "LISTENING", value: "Karri · SWV" },
];

const NAME = "VICTOR WU";

function useSFTime() {
  const [time, setTime] = useState(() => formatSF());
  useEffect(() => {
    const id = window.setInterval(() => setTime(formatSF()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function formatSF() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

export default function LandingPage() {
  const [nowIdx, setNowIdx] = useState(0);
  const sfTime = useSFTime();

  useEffect(() => {
    const id = window.setInterval(() => {
      setNowIdx((i) => (i + 1) % NOW_STATES.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  const now = NOW_STATES[nowIdx];

  return (
    <main className={`${styles.hero} page`}>
      <div className={styles.bg} />
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
                style={{ animationDelay: `${0.25 + i * 0.05}s` }}
              >
                {ch === " " ? " " : ch}
              </span>
            ))}
          </h1>
          <p className={styles.sub}>
            Everything I've been working on lately — software, photography, and
            design.
            <br />
            <em>(this site is a work in progress)</em>
          </p>
          <div className={styles.ctas}>
            <Link to="/software-engineering" className={styles.cta}>
              <span>SOFTWARE ENGINEERING</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
            <Link to="/art-creative" className={styles.cta}>
              <span>ART &amp; CREATIVE</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </div>

        <div className={styles.bottomChrome}>
          <div className={styles.now}>
            <div className={styles.nowLabel}>NOW · {now.label}</div>
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
