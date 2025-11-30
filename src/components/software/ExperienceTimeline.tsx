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
    company: "Company Name",
    role: "Senior Software Engineer",
    period: "2022 - Present",
    description: "Led development of scalable microservices architecture. Improved system performance by 40% through optimization.",
  },
  {
    company: "Previous Company",
    role: "Software Engineer",
    period: "2020 - 2022",
    description: "Built responsive web applications using React and TypeScript. Collaborated with design team on user experience.",
  },
  {
    company: "Startup Inc",
    role: "Junior Developer",
    period: "2018 - 2020",
    description: "Developed features for mobile and web platforms. Participated in agile development process.",
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
  };

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
