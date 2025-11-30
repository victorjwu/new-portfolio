import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/software/ExperienceTimeline.module.css';

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

const experiences: Experience[] = [
  {
    company: "Google",
    role: "Software Engineer",
    period: "December 2025 - Present",
    description: "Building distributed infrastructure + review tooling for YouTube content evaluation.",
  },
  {
    company: "Amazon Robotics",
    role: "Software Development Engineer",
    period: "July 2025 - December 2025",
    description: "Developed real-time orchestration + observability logic for Vulcan Stow to support system-wide visibility and automation.",
  },
  {
    company: "Amazon Robotics",
    role: "Software Development Engineer Intern",
    period: "May 2024 - August 2024",
    description: "Built a React + AWS Lambda observability tool unifying multi-subsystem data pipelines within Vulcan Stow.",
  },
  {
    company: "Amazon Robotics",
    role: "Software Development Engineer Intern",
    period: "May 2023 - August 2023",
    description: "Developed Python tooling to replicate the Match algorithm offline for Vulcan Stow ",
  },
];

const ExperienceTimeline: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as any;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Experience</h2>
      
      <motion.div
        className={styles.timeline}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {experiences.map((exp, index) => (
          <motion.div key={index} className={styles.item} variants={itemVariants}>
            <div className={styles.node} />
            <div className={styles.content}>
              <div className={styles.header}>
                <h3 className={styles.role}>{exp.role}</h3>
                <span className={styles.period}>{exp.period}</span>
              </div>
              <p className={styles.company}>{exp.company}</p>
              <p className={styles.description}>{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ExperienceTimeline;
