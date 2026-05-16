import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSFTime } from "../hooks/useSFTime";
import { useScrollProgress } from "../hooks/useScrollProgress";
import styles from "./Nav.module.css";

const NOW_STATES = [
  { label: "BUILDING", value: "mise · v0.1" },
  { label: "SHOOTING", value: "Fuji X100VI" },
  { label: "LISTENING", value: "Karri · SWV" },
];

export default function Nav() {
  const { pathname } = useLocation();
  const sfTime = useSFTime();
  const [nowIdx, setNowIdx] = useState(0);
  useScrollProgress();

  useEffect(() => {
    const id = window.setInterval(() => {
      setNowIdx((i) => (i + 1) % NOW_STATES.length);
    }, 4400);
    return () => window.clearInterval(id);
  }, []);

  const now = NOW_STATES[nowIdx];

  return (
    <>
      <span className={`scroll-progress ${styles.progress}`} aria-hidden="true" />
      <nav className={styles.nav}>
        <div className={styles.inner}>
          <Link to="/" className={`${styles.home} tactile-soft`} aria-label="Home">
            <span className={styles.arrow}>←</span>
            <span>VICTOR&nbsp;WU</span>
          </Link>

          <div className={styles.center}>
            <span className={styles.dotLive} aria-hidden="true" />
            <span className={styles.nowLabel}>NOW · {now.label}</span>
            <span key={nowIdx} className={styles.nowValue}>
              {now.value}
            </span>
          </div>

          <div className={styles.right}>
            <div className={styles.links}>
              <Link
                to="/software-engineering"
                className={`${styles.link} ${
                  pathname === "/software-engineering" ? styles.active : ""
                }`}
              >
                SOFTWARE&nbsp;ENG
              </Link>
              <span className={styles.sep}>·</span>
              <Link
                to="/art-creative"
                className={`${styles.link} ${
                  pathname === "/art-creative" ? styles.active : ""
                }`}
              >
                ART&nbsp;&amp;&nbsp;CREATIVE
              </Link>
            </div>
            <span className={styles.clock}>{sfTime} SF</span>
          </div>
        </div>
      </nav>
    </>
  );
}
