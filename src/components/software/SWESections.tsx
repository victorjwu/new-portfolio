import React from 'react';
import styles from '../../styles/SoftwarePage.module.css';

interface SimpleLinkProps {
  href: string;
  children: React.ReactNode;
}

const ExternalLink: React.FC<SimpleLinkProps> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
    {children}
  </a>
);

export const AboutSection: React.FC = () => (
  <div className={styles.sectionContent}>
    <p className={styles.summaryText}>
      I'm a software engineer passionate about building premium, intuitive user experiences and robust distributed systems. Currently working at Google on YouTube content evaluation infrastructure.
    </p>
    <div className={styles.linkGroup}>
      <ExternalLink href="https://drive.google.com/file/d/1vLk173MkB2Lh3E6X2K-uF8LAL7K6fI9-/view?usp=sharing">Resume</ExternalLink>
      <ExternalLink href="https://github.com/victorjwu">GitHub</ExternalLink>
      <ExternalLink href="https://linkedin.com/in/victorjwuGT">LinkedIn</ExternalLink>
    </div>
  </div>
);

export const ExperienceSection: React.FC = () => (
  <div className={styles.sectionContent}>
    <div className={styles.timelineItem}>
      <h3 className={styles.role}>Software Engineer</h3>
      <div className={styles.company}>Google • Dec 2025 - Present</div>
      <p className={styles.description}>Building distributed infrastructure + review tooling for YouTube content evaluation.</p>
    </div>
    
    <div className={styles.timelineItem}>
      <h3 className={styles.role}>Software Development Engineer I</h3>
      <div className={styles.company}>Amazon Robotics • Jul 2025 - Dec 2025</div>
      <p className={styles.description}>Developed real-time orchestration logic + observability tooling for Vulcan Stow.</p>
    </div>

    <div className={styles.timelineItem}>
      <h3 className={styles.role}>Software Development Engineer Intern</h3>
      <div className={styles.company}>Amazon Robotics • May 2024 - Aug 2024</div>
      <p className={styles.description}>Built React + AWS Lambda observability tool unifying multi-subsystem data pipelines for Vulcan Stow.</p>
    </div>
    <div className={styles.timelineItem}>
      <h3 className={styles.role}>Software Development Engineer Intern</h3>
      <div className={styles.company}>Amazon Robotics • May 2023 - Aug 2023</div>
      <p className={styles.description}>Built Python tooling for the Vulcan Stow Match team to replicate robotic behavior offline.</p>
    </div>
  </div>
);

export const EducationSection: React.FC = () => (
  <div className={styles.sectionContent}>
    <div className={styles.timelineItem}>
      <h3 className={styles.role}>Georgia Institute of Technology</h3>
      <div className={styles.company}>BS Computer Science • 2021 - 2025</div>
      <p className={styles.description}>Concentrations in Intelligence and Media.</p>
    </div>
  </div>
);

export const ProjectsSection: React.FC = () => (
  <div className={styles.sectionContent}>
    <div className={styles.timelineItem}>
      <h3 className={styles.role}>Microsoft ABAC CoPilot</h3>
      <p className={styles.description}>NLP model translating natural language to JSON security policies. 2nd Place GT Junior Design.</p>
    </div>
    
    <div className={styles.timelineItem}>
      <h3 className={styles.role}>mise</h3>
      <p className={styles.description}>Building a restaurant recommendation engine using DistilBERT sentiment analysis on Reddit threads.</p>
    </div>

    <div className={styles.timelineItem}>
      <h3 className={styles.role}>Portfolio</h3>
      <p className={styles.description}>This site. Built with React, TypeScript, and Framer Motion.</p>
    </div>
  </div>
);

export const SkillsSection: React.FC = () => (
  <div className={styles.sectionContent}>
    <div className={styles.timelineItem}>
      <h3 className={styles.role}>Languages</h3>
      <p className={styles.description}>Python, Java, C++, TypeScript, JavaScript, Kotlin</p>
    </div>
    <div className={styles.timelineItem}>
      <h3 className={styles.role}>Frontend</h3>
      <p className={styles.description}>React, Next.js, Framer Motion, HTML/CSS</p>
    </div>
    <div className={styles.timelineItem}>
      <h3 className={styles.role}>Backend / ML</h3>
      <p className={styles.description}>Node.js, AWS, SQL, PyTorch, TensorFlow, MongoDB</p>
    </div>
  </div>
);
