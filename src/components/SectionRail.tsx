import { useEffect, useState } from "react";
import styles from "./SectionRail.module.css";

export type SectionRailItem = {
  id: string;
  num: string;
  label: string;
};

type Props = { items: SectionRailItem[] };

export default function SectionRail({ items }: Props) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: "-38% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const current = items.find((i) => i.id === active) ?? items[0];
  const activeIdx = Math.max(
    0,
    items.findIndex((i) => i.id === active)
  );

  return (
    <div
      className={`${styles.wrap} ${open ? styles.open : ""}`}
      onMouseLeave={() => setOpen(false)}
    >
      <ul className={styles.menu} role="menu">
        {items.map((it) => (
          <li
            key={it.id}
            className={`${styles.menuItem} ${
              active === it.id ? styles.menuActive : ""
            }`}
          >
            <a href={`#${it.id}`} onClick={() => setOpen(false)}>
              <span className={styles.num}>{it.num}</span>
              <span className={styles.label}>{it.label}</span>
              {active === it.id && <span className={styles.menuDot} />}
            </a>
          </li>
        ))}
      </ul>
      <button
        className={`${styles.pill} tactile-soft`}
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Section ${current?.num} of ${items.length}: ${current?.label}`}
      >
        <span className={styles.pillDot} />
        <span className={styles.pillNum}>{current?.num}</span>
        <span className={styles.pillLabel}>{current?.label}</span>
        <span className={styles.pillCount}>
          · {activeIdx + 1}/{items.length}
        </span>
      </button>
    </div>
  );
}
