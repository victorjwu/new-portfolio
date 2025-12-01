import React, { useState } from 'react';
import SWEHero from '../components/software/SWEHero';
import ExperienceTimeline from '../components/software/ExperienceTimeline';
import ProjectsShowcase from '../components/software/ProjectsShowcase';
import TechStack from '../components/software/TechStack';
import FixedSectionHeader from '../components/software/FixedSectionHeader';
import ScrollSection from '../components/software/ScrollSection';
import styles from '../styles/SoftwarePage.module.css';

const SoftwarePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('Introduction');

  return (
    <div className={styles.pageContainer}>
      <FixedSectionHeader activeSection={activeSection} />
      
      <a href="/" className={styles.backButton}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </a>
      
      <main className={styles.content}>
        <ScrollSection id="hero" title="ME" onInView={setActiveSection} className={styles.section}>
          <SWEHero />
        </ScrollSection>
        
        <ScrollSection id="experience" title="Experience" onInView={setActiveSection} className={styles.section}>
          <ExperienceTimeline />
        </ScrollSection>
        
        <ScrollSection id="projects" title="Projects" onInView={setActiveSection} className={styles.section}>
          <ProjectsShowcase />
        </ScrollSection>
        
        <ScrollSection id="tech" title="Tech Stack" onInView={setActiveSection} className={styles.section}>
          <TechStack />
        </ScrollSection>
        
        <div className={styles.footerSection}>
        </div>
      </main>
    </div>
  );
};

export default SoftwarePage;
