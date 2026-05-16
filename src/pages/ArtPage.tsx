import { useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import DesignPlaceholder from "../components/DesignPlaceholder";
import { useReveal } from "../hooks/useReveal";
import { PHOTOS, DESIGN_WORK, SOCIALS } from "../content/art";
import styles from "./ArtPage.module.css";

export default function ArtPage() {
  useReveal();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="page">
      <Nav />
      <main className={`wrap ${styles.main}`}>
        {/* Hero */}
        <section className={`${styles.hero} reveal`}>
          <div className={styles.eyebrow}>ART &amp; CREATIVE / 2020 — 2025</div>
          <h1 className={styles.h1}>
            Photographs, prints, and <em>quiet design</em>
            <br />
            for things I love.
          </h1>
          <div className={styles.heroSub}>
            <p className={styles.heroLede}>
              Quiet visual work — photographs from slow walks through Japan, marks for
              small things, and the occasional piece of furniture I haven't shipped yet.
              I work mostly on 35mm and in Figma.
            </p>
            <p className={styles.heroMeta}>
              Selected work below. Photo grid is a small subset — full sets live on
              Instagram. Reach out if you want prints.
            </p>
          </div>
        </section>

        {/* Photography */}
        <section className={styles.section}>
          <div className={`${styles.head} reveal`}>
            <div className={styles.eyebrowMute}>Photography — Selected</div>
            <h2 className={styles.h2}>
              <em>Spring,</em> Japan — a slow walk through quiet streets.
            </h2>
          </div>
          <div className={`${styles.grid} reveal`}>
            {PHOTOS.map((p) => (
              <div
                key={p.id}
                className={styles.cell}
                style={{
                  gridColumn: `span ${p.span.col}`,
                  gridRow: `span ${p.span.row}`,
                }}
              >
                {p.real ? (
                  <>
                    <img className={styles.cellImg} src={p.real} alt={p.cap} />
                    <span className={`${styles.cap} ${styles.capLight}`}>{p.cap}</span>
                    <span className={`${styles.idTag} ${styles.capLight}`}>{p.id}</span>
                  </>
                ) : (
                  <>
                    <PhotoPlaceholder seed={p.seed ?? 0} cap={p.cap} id={p.id} />
                  </>
                )}
              </div>
            ))}
          </div>
          <div className={styles.gridFoot}>
            <span>SHOT ON · CONTAX T2 / KODAK PORTRA 400</span>
            <a className={styles.gridFootLink} href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              FULL SET — INSTAGRAM @VICTORWU.FILM →
            </a>
          </div>
        </section>

        {/* Design */}
        <section className={styles.section}>
          <div className={`${styles.head} reveal`}>
            <div className={styles.eyebrowMute}>Design — Selected</div>
            <h2 className={styles.h2}>
              Identity, editorial, and <em>the occasional</em> piece of furniture.
            </h2>
          </div>
          <div className={`${styles.designGrid} reveal-stagger`}>
            {DESIGN_WORK.map((d, i) => (
              <article key={d.title} className={styles.designCard}>
                <div className={styles.designMedia}>
                  <DesignPlaceholder index={i} label={`PROJECT 0${i + 1}`} />
                </div>
                <div className={styles.designBody}>
                  <div className={styles.designYear}>{d.year}</div>
                  <div className={styles.designTitle}>{d.title}</div>
                  <div className={styles.designDesc}>{d.desc}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Elsewhere */}
        <section className={styles.section}>
          <div className={`${styles.head} reveal`}>
            <div className={styles.eyebrowMute}>Elsewhere</div>
            <h2 className={styles.h2}>
              Other <em>quiet corners</em> of the internet.
            </h2>
          </div>
          <div className={`${styles.socials} reveal-stagger`}>
            {SOCIALS.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                <span className={styles.socialArrow}>↗</span>
                <div className={styles.socialPlatform}>{s.platform}</div>
                <div className={styles.socialHandle}>{s.handle}</div>
                <div className={styles.socialMeta}>{s.meta}</div>
                <div className={styles.socialStatRow}>
                  <span>{s.stat}</span>
                  <span>{s.tag}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
