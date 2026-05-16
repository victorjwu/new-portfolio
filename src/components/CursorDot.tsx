import { useEffect } from "react";

const HOT_SELECTOR = "a, button, [data-hot]";

/**
 * Small clay dot that trails the cursor with a smooth lerp.
 * Scales into an open ring over interactive elements.
 * Disabled on touch / coarse-pointer devices.
 */
export default function CursorDot() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const dot = document.createElement("div");
    dot.setAttribute("aria-hidden", "true");
    dot.dataset.cursorDot = "true";
    Object.assign(dot.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      background: "var(--clay)",
      border: "0 solid var(--clay)",
      opacity: "0",
      pointerEvents: "none",
      zIndex: String(9999),
      transition:
        "width 220ms var(--ease-out), height 220ms var(--ease-out), background-color 220ms var(--ease-out), border-width 220ms var(--ease-out), opacity 260ms ease",
      willChange: "transform",
    } satisfies Partial<CSSStyleDeclaration>);
    document.body.appendChild(dot);

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let visible = false;
    let raf = 0;
    let mode: "idle" | "hot" = "idle";

    const setMode = (next: "idle" | "hot") => {
      if (next === mode) return;
      mode = next;
      if (next === "hot") {
        dot.style.width = "52px";
        dot.style.height = "52px";
        dot.style.background = "transparent";
        dot.style.borderWidth = "1.5px";
      } else {
        dot.style.width = "14px";
        dot.style.height = "14px";
        dot.style.background = "var(--clay)";
        dot.style.borderWidth = "0";
      }
    };

    const tick = () => {
      x += (tx - x) * 0.24;
      y += (ty - y) * 0.24;
      const size = mode === "hot" ? 26 : 7;
      dot.style.transform = `translate(${x - size}px, ${y - size}px)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "0.78";
        x = tx;
        y = ty;
      }
      const target = e.target as Element | null;
      setMode(target?.closest(HOT_SELECTOR) ? "hot" : "idle");
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
    };

    const onDown = () => {
      dot.style.transform += " scale(0.7)";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown", onDown);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown", onDown);
      dot.remove();
    };
  }, []);

  return null;
}
