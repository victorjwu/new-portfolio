import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.eyebrow}>Get in touch</div>
          <a className={styles.mail} href="mailto:hi@gmail.com">
            hi@victorjwu.com
          </a>
        </div>
        <div className={styles.right}>© 2025 V.WU — SAN FRANCISCO</div>
      </div>
    </footer>
  );
}
