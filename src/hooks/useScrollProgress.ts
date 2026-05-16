import { useEffect } from "react";

/**
 * Writes scroll progress (0–100%) to `--scroll` on the documentElement.
 * Consumed by `.scroll-progress` in globals.css.
 */
export function useScrollProgress() {
  useEffect(() => {
    let raf = 0;
    let scheduled = false;
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (scrolled / max) * 100 : 0;
      h.style.setProperty("--scroll", `${pct.toFixed(2)}%`);
      scheduled = false;
    };
    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);
}
