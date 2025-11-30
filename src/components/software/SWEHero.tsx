import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/software/SWEHero.module.css';

const SWEHero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className={styles.hero}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.profilePic} variants={itemVariants}>
        <div className={styles.placeholder}>VW</div>
      </motion.div>
      
      <motion.h1 className={styles.name} variants={itemVariants}>
        Victor Wu
      </motion.h1>
      
      <motion.p className={styles.tagline} variants={itemVariants}>
        Software Engineer
      </motion.p>
      
      <motion.div className={styles.links} variants={itemVariants}>
        <a href="/resume.pdf" className={styles.link} target="_blank" rel="noopener noreferrer">
          Resume
        </a>
        <a href="https://linkedin.com/in/yourprofile" className={styles.link} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/yourusername" className={styles.link} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="mailto:your.email@example.com" className={styles.link}>
          Email
        </a>
      </motion.div>
    </motion.section>
  );
};

export default SWEHero;
