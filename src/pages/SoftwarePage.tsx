import { useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useReveal } from "../hooks/useReveal";
import { EXPERIENCE, PROJECTS, STACK } from "../content/software";
import styles from "./SoftwarePage.module.css";

const STATUS_LABEL: Record<"live" | "shipped" | "archived", string> = {
  live: "● LIVE",
  shipped: "◆ SHIPPED",
  archived: "○ ARCHIVED",
};

export default function SoftwarePage() {
  useReveal();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="page">
      <Nav />
      <main className={`wrap ${styles.main}`}>
        {/* Intro */}
        <section className={styles.section}>
          <div className={`${styles.head} reveal`}>
            <div className={styles.eyebrow}>SOFTWARE / 2025</div>
            <div className={styles.headBody}>
              <h2 className={styles.intro}>
                <span className={styles.dot} aria-hidden="true" />
                Quietly building <em>thoughtful</em> tools for small teams who care about
                craft.
              </h2>
              <p className={styles.lede}>
                I'm a software engineer at Google working on YouTube content evaluation
                infrastructure. Previously at Amazon Robotics building real-time
                orchestration and observability for Vulcan Stow.
              </p>
              <p className={styles.lede}>
                I like premium, intuitive interfaces and the quiet distributed systems
                that make them feel inevitable. I studied CS at Georgia Tech with
                concentrations in Intelligence &amp; Media.
              </p>
              <div className={styles.meta}>
                <div>
                  <div className={styles.metaLabel}>Based in</div>
                  <div className={styles.metaBody}>
                    San Francisco. Open to small remote contracts and on-site work in the
                    Bay Area.
                  </div>
                </div>
                <div>
                  <div className={styles.metaLabel}>Open to</div>
                  <div className={styles.metaBody}>
                    Advisory, prototyping engagements, and early-stage founding work —
                    small teams, prototype-first.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className={styles.section}>
          <div className={`${styles.head} reveal`}>
            <div className={styles.eyebrow}>Work — Selected</div>
            <div className={styles.headBody}>
              <h2 className={styles.h2}>
                A short list of <em>places I've been</em> useful.
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
        <section className={styles.section}>
          <div className={`${styles.head} reveal`}>
            <div className={styles.eyebrow}>Projects — Selected</div>
            <div className={styles.headBody}>
              <h2 className={styles.h2}>
                Small things, <em>built slowly</em>.
              </h2>
            </div>
          </div>
          <div className={`${styles.projects} reveal-stagger`}>
            {PROJECTS.map((p) => (
              <a
                key={p.num}
                className={styles.project}
                href={p.href ?? "#"}
                target={p.href ? "_blank" : undefined}
                rel={p.href ? "noopener noreferrer" : undefined}
              >
                <div className={styles.projectHead}>
                  <span>PROJECT · {p.num}</span>
                  <span className={`${styles.pill} ${styles[`pill_${p.status}`]}`}>
                    {STATUS_LABEL[p.status]}
                  </span>
                </div>
                <h3 className={styles.projectTitle}>{p.title}</h3>
                <p className={styles.projectDesc}>{p.desc}</p>
                <div className={styles.projectFoot}>
                  <span>
                    {p.meta} · {p.year}
                  </span>
                  <span className={styles.projectArrow}>→</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section className={styles.section}>
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
