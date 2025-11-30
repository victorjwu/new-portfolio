import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/software/TechStack.module.css';

interface SkillCategory {
  category: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "Go"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Vue", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "Docker", "AWS", "Vercel", "Figma"],
  },
];

const TechStack: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Tech Stack</h2>
      
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skillCategories.map((category, index) => (
          <motion.div key={index} className={styles.category} variants={categoryVariants}>
            <h3 className={styles.categoryTitle}>{category.category}</h3>
            <ul className={styles.skillList}>
              {category.skills.map((skill, skillIndex) => (
                <li key={skillIndex} className={styles.skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TechStack;
