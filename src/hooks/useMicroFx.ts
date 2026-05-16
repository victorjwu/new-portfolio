import { useEffect } from "react";

/**
 * Page-level micro-interaction effects.
 *
 *  [data-spotlight]  → pointer-tracked CSS vars (--mx, --my) for cursor glow
 *  [data-tilt]       → subtle 3D rotation following pointer
 *  [data-parallax]   → scroll-tied vertical offset via --py
 *
 * All targets are queried at mount, so call this inside the page component
 * after content has rendered.
 */
export function useMicroFx() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ----- Spotlight ----- */
    const spotlightEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-spotlight]")
    );
    const onSpotMove = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    if (fine) {
      spotlightEls.forEach((el) => el.addEventListener("pointermove", onSpotMove));
    }

    /* ----- Tilt ----- */
    const tiltEls = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const onTiltMove = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const strength = parseFloat(el.dataset.tilt || "3");
      el.style.setProperty("--rx", `${y * -strength}deg`);
      el.style.setProperty("--ry", `${x * strength}deg`);
      el.style.setProperty("--tz", `${strength * 0.6}px`);
    };
    const onTiltLeave = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--tz", "0px");
    };
    if (fine && !reduced) {
      tiltEls.forEach((el) => {
        el.addEventListener("pointermove", onTiltMove);
        el.addEventListener("pointerleave", onTiltLeave);
      });
    }

    /* ----- Parallax ----- */
    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    let scheduled = false;
    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const fromCenter = (center - vh / 2) / vh;
        const factor = parseFloat(el.dataset.parallax || "10");
        const offset = Math.max(-factor, Math.min(factor, fromCenter * -factor));
        el.style.setProperty("--py", `${offset.toFixed(2)}px`);
      });
      scheduled = false;
    };
    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(update);
    };
    if (!reduced && parallaxEls.length) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", update, { passive: true });
    }

    return () => {
      spotlightEls.forEach((el) => el.removeEventListener("pointermove", onSpotMove));
      tiltEls.forEach((el) => {
        el.removeEventListener("pointermove", onTiltMove);
        el.removeEventListener("pointerleave", onTiltLeave);
      });
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);
}
