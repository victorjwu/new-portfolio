import { Link, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";

export default function Nav() {
  const { pathname } = useLocation();
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.home} aria-label="Home">
          <span className={styles.arrow}>←</span>
          <span>VICTOR&nbsp;WU</span>
        </Link>
        <div className={styles.links}>
          <Link
            to="/software-engineering"
            className={`${styles.link} ${pathname === "/software-engineering" ? styles.active : ""}`}
          >
            SOFTWARE&nbsp;ENG
          </Link>
          <span className={styles.sep}>·</span>
          <Link
            to="/art-creative"
            className={`${styles.link} ${pathname === "/art-creative" ? styles.active : ""}`}
          >
            ART&nbsp;&amp;&nbsp;CREATIVE
          </Link>
        </div>
      </div>
    </nav>
  );
}
