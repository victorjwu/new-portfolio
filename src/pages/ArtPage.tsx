import { useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Photo from "../components/Photo";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import DesignPlaceholder from "../components/DesignPlaceholder";
import SectionRail from "../components/SectionRail";
import { useReveal } from "../hooks/useReveal";
import { useMicroFx } from "../hooks/useMicroFx";
import { PHOTOS, DESIGN_WORK, SOCIALS } from "../content/art";
import styles from "./ArtPage.module.css";

const RAIL_ITEMS = [
  { id: "hero", num: "01", label: "Intro" },
  { id: "photography", num: "02", label: "Photography" },
  { id: "design", num: "03", label: "Design" },
  { id: "elsewhere", num: "04", label: "Elsewhere" },
];

export default function ArtPage() {
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
        <section id="hero" className={`${styles.hero} reveal`}>
          <div className={styles.eyebrow}>ART &amp; CREATIVE / 2025 — 2026</div>
          <h1 className={styles.h1}>
            Photographs and <em>quiet design</em>
            <br />
            for things I love.
          </h1>
          <div className={styles.heroSub}>
            <p className={styles.heroLede}>
              Quiet visual work — photographs from places I've traveled to,
              marks for small things, and the occasional piece of furniture I
              haven't shipped yet.
            </p>
            <p className={styles.heroMeta}>
              Selected work below. Photo grid is a small subset — full sets will
              live on Instagram.
            </p>
          </div>
        </section>

        {/* Photography */}
        <section id="photography" className={styles.section}>
          <div className={`${styles.head} reveal`}>
            <div className={styles.eyebrowMute}>Photography</div>
            <h2 className={styles.h2}>
              Photography with a focus on <em>compositoin</em>
            </h2>
          </div>
          <div className={`${styles.grid} reveal`}>
            {PHOTOS.map((p, i) => (
              <div
                key={p.id}
                className={styles.cell}
                style={{
                  gridColumn: `span ${p.span.col}`,
                  gridRow: `span ${p.span.row}`,
                }}
                data-tilt="2.5"
              >
                <div
                  className={styles.cellInner}
                  data-parallax={6 + (i % 3) * 2}
                >
                  {p.real ? (
                    <>
                      <Photo
                        src={p.real}
                        alt={p.cap}
                        priority={i < 2}
                        className={styles.cellPicture}
                        imgClassName={styles.cellImg}
                      />
                      <span className={`${styles.cap} ${styles.capLight}`}>
                        {p.cap}
                      </span>
                      <span className={`${styles.idTag} ${styles.capLight}`}>
                        {p.id}
                      </span>
                    </>
                  ) : (
                    <PhotoPlaceholder
                      seed={p.seed ?? 0}
                      cap={p.cap}
                      id={p.id}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.gridFoot}>
            <span>SHOT ON · FUJIFILM X100VI / Film Sim : KODAK PORTRA 400</span>
            <a
              className={`${styles.gridFootLink} tactile-soft`}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              FULL SET — INSTAGRAM @vjwuphotos →
            </a>
          </div>
        </section>

        {/* Design */}
        <section id="design" className={styles.section}>
          <div className={`${styles.head} reveal`}>
            <div className={styles.eyebrowMute}>Design</div>
            <h2 className={styles.h2}>
              Ineterior design and the <em>occasional</em> UI work
            </h2>
          </div>
          <div className={`${styles.designGrid} reveal-stagger`}>
            {DESIGN_WORK.map((d, i) => (
              <article
                key={d.title}
                className={`${styles.designCard} tactile-soft`}
                data-spotlight
                data-tilt="2"
              >
                <div className={styles.designInner}>
                  <div className={styles.designMedia}>
                    <DesignPlaceholder index={i} label={`PROJECT 0${i + 1}`} />
                  </div>
                  <div className={styles.designBody}>
                    <div className={styles.designYear}>{d.year}</div>
                    <div className={styles.designTitle}>{d.title}</div>
                    <div className={styles.designDesc}>{d.desc}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Elsewhere */}
        <section id="elsewhere" className={styles.section}>
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
                className={`${styles.social} tactile-soft`}
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
