import { useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SectionRail from "../components/SectionRail";
import { useReveal } from "../hooks/useReveal";
import { useMicroFx } from "../hooks/useMicroFx";
import { EXPERIENCE, PROJECTS, STACK } from "../content/software";
import styles from "./SoftwarePage.module.css";

const STATUS_LABEL: Record<"live" | "shipped" | "archived", string> = {
  live: "LIVE",
  shipped: "SHIPPED",
  archived: "ARCHIVED",
};

const RAIL_ITEMS = [
  { id: "intro", num: "01", label: "Intro" },
  { id: "work", num: "02", label: "Work" },
  { id: "projects", num: "03", label: "Projects" },
  { id: "stack", num: "04", label: "Stack" },
];

function Splay({ text }: { text: string }) {
  return (
    <span className={styles.splay} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className={styles.splayChar}
          style={{ transitionDelay: `${i * 18}ms` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export default function SoftwarePage() {
  useReveal();
  useMicroFx();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="page">
      <Nav />
      <SectionRail items={RAIL_ITEMS} />
      <main className={`wrap ${styles.main}`}>
        {/* Hero */}
        <section id="intro" className={`${styles.hero} reveal`}>
          <div className={styles.heroEyebrow}>SOFTWARE / 2023 — 2026</div>
          <h1 className={styles.h1}>
            My journey as a<br></br>
            <em>software engineer </em>
            <br></br>
            building thoughtful tools.
          </h1>
          <div className={styles.heroSub}>
            <p className={styles.heroLede}>
              I'm a software engineer at Google working on YouTube content
              evaluation infrastructure and tooling. Previously at Amazon
              Robotics building real-time orchestration and observability for
              Vulcan Stow.
            </p>
            <p className={styles.heroMeta}>
              I like premium, intuitive interfaces and the quiet distributed
              systems that make them feel inevitable. I studied CS at Georgia
              Tech with concentrations in Intelligence &amp; Media.
            </p>
          </div>
          <div className={styles.meta}>
            <div>
              <div className={styles.metaLabel}>Based in</div>
              <div className={styles.metaBody}>
                San Francisco. Open to small remote contracts and on-site work
                in the Bay Area.
              </div>
            </div>
            <div>
              <div className={styles.metaLabel}>Passionate</div>
              <div className={styles.metaBody}>
                Learning about Artificial Intelligence, Robotics, and Design
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="work" className={styles.section}>
          <div className={`${styles.head} reveal`}>
            <div className={styles.eyebrow}>Work</div>
            <div className={styles.headBody}>
              <h2 className={styles.h2}>
                A short list of <em>places</em> I've been at.
              </h2>
            </div>
          </div>
          <ol className={`${styles.timeline} reveal-stagger`}>
            {EXPERIENCE.map((e) => (
              <li
                key={`${e.company}-${e.when}`}
                className={`${styles.row} ${e.current ? styles.current : ""}`}
              >
                <span className={styles.when}>{e.when}</span>
                <div className={styles.role}>
                  <div className={styles.company}>{e.company}</div>
                  <div className={styles.roleText}>{e.role}</div>
                </div>
                {e.loc && <span className={styles.loc}>{e.loc}</span>}
              </li>
            ))}
          </ol>
        </section>

        {/* Projects */}
        <section id="projects" className={styles.section}>
          <div className={`${styles.head} reveal`}>
            <div className={styles.eyebrow}>Projects</div>
            <div className={styles.headBody}>
              <h2 className={styles.h2}>
                Some of my <em>projects.</em>
              </h2>
            </div>
          </div>
          <div className={`${styles.projects} reveal-stagger`}>
            {PROJECTS.map((p) => (
              <a
                key={p.num}
                className={`${styles.project} tactile-soft`}
                href={p.href ?? "#"}
                target={p.href ? "_blank" : undefined}
                rel={p.href ? "noopener noreferrer" : undefined}
                data-spotlight
                data-tilt="2"
              >
                <div className={styles.projectInner}>
                  <div className={styles.projectHead}>
                    <span>PROJECT · {p.num}</span>
                    <span
                      className={`${styles.pill} ${styles[`pill_${p.status}`]}`}
                    >
                      {p.status === "live" && (
                        <span className={styles.pillDot} />
                      )}
                      {p.status === "shipped" && (
                        <span className={styles.pillDiamond} />
                      )}
                      {p.status === "archived" && (
                        <span className={styles.pillRing} />
                      )}
                      {STATUS_LABEL[p.status]}
                    </span>
                  </div>
                  <h3 className={styles.projectTitle}>
                    <Splay text={p.title} />
                  </h3>
                  <p className={styles.projectDesc}>{p.desc}</p>
                  <div className={styles.projectFoot}>
                    <span>
                      {p.meta} · {p.year}
                    </span>
                    <span className={styles.projectArrow}>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section id="stack" className={styles.section}>
          <div className={`${styles.head} reveal`}>
            <div className={styles.eyebrow}>Stack &amp; Tools</div>
            <div className={styles.headBody}>
              <h2 className={styles.h2}>
                What I reach for, <em>most days</em>.
              </h2>
            </div>
          </div>
          <div className={`${styles.stack} reveal-stagger`}>
            {STACK.map((col) => (
              <div key={col.label} className={styles.stackCol}>
                <div className={styles.stackLabel}>{col.label}</div>
                <ul className={styles.stackList}>
                  {col.items.map((it, i) => (
                    <li key={it} className={styles.stackItem}>
                      <span className={styles.stackTick} aria-hidden="true" />
                      {i === 0 ? <em>{it}</em> : it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
