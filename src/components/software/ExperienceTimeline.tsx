import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '../../styles/software/ExperienceTimeline.module.css';
import googleLogo from '../../assets/google.png';
import amazonLogo from '../../assets/amazon.png';
import georgiaTechLogo from '../../assets/georgiatech.png';

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  date: string;
  description: string | React.ReactNode;
  logoPlaceholder: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: 'Google',
    role: 'Software Engineer',
    date: 'December 2025 - Present',
    description: 'Building distributed infrastructure + review tooling for YouTube content evaluation.',
    logoPlaceholder: googleLogo,
  },
  {
    id: 2,
    company: 'Amazon Robotics',
    role: 'SDE I',
    date: 'July 2025 - December 2025',
    description: (
      <>
        Developed real-time orchestration logic + observability tooling for <a href="https://www.youtube.com/watch?v=2X4CU3jmw-g" target="_blank" rel="noopener noreferrer" className={styles.link}>Vulcan Stow</a>, to support system-wide visibility and automation.
      </>
    ),
    logoPlaceholder: amazonLogo,
  },
  {
    id: 3,
    company: 'Amazon Robotics',
    role: 'SDE Intern',
    date: 'May 2024 - August 2024',
    description: 'Built a React + AWS Lambda observability tool unifying multi-subsystem data pipelines within Vulcan Stow',
    logoPlaceholder: amazonLogo,
  },
  {
    id: 4,
    company: 'Amazon Robotics',
    role: 'SDE Intern',
    date: 'May 2023 - August 2023',
    description: 'Developed Python tooling to replicate the Match algorithm offline for Vulcan Stow.',
    logoPlaceholder: amazonLogo,
  },
  {
    id: 5,
    company: 'Georgia Tech',
    role: 'BS Computer Science',
    date: '2021 - 2025',
    description: 'Concentrations in Intelligence and Media.',
    logoPlaceholder: georgiaTechLogo,
  },
];

const ExperienceTimeline: React.FC = () => {
  return (
    <div className={styles.timelineContainer}>
      <div className={styles.verticalLine} />
      
      {experiences.map((exp, index) => (
        <TimelineItem key={exp.id} item={exp} index={index} />
      ))}
    </div>
  );
};

const TimelineItem: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
  const isEven = index % 2 === 0;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Reduced parallax intensity to ensure visibility
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  return (
    <motion.div 
      ref={ref}
      className={`${styles.timelineItem} ${isEven ? styles.left : styles.right}`}
      style={{ y }}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <img className={styles.logo} src={item.logoPlaceholder} alt={item.company} />
          <div className={styles.roleInfo}>
            <h3 className={styles.role}>{item.role}</h3>
            <span className={styles.company}>{item.company}</span>
          </div>
        </div>
        <div className={styles.date}>{item.date}</div>
        <p className={styles.description}>{item.description}</p>
      </div>
      
      <div className={styles.dot} />
    </motion.div>
  );
};

export default ExperienceTimeline;
