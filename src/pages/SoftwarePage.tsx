import React from 'react';
import { motion } from 'framer-motion';
import SWEHero from '../components/software/SWEHero';
import ExperienceTimeline from '../components/software/ExperienceTimeline';
import ProjectsShowcase from '../components/software/ProjectsShowcase';
import TechStack from '../components/software/TechStack';
import FooterLinks from '../components/software/FooterLinks';
import styles from '../styles/SoftwarePage.module.css';

const SoftwarePage: React.FC = () => {
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  } as any;

  return (
    <motion.div
      className={styles.page}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <SWEHero />
      <ExperienceTimeline />
      <ProjectsShowcase />
      <TechStack />
      <FooterLinks />
    </motion.div>
  );
};

export default SoftwarePage;
