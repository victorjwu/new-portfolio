import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/software/SWEHero.module.css';

const SWEHero: React.FC = () => {
  const navigate = useNavigate();
  
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
  } as any;

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as any;

  return (
    <motion.section
      className={styles.hero}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.button 
        className={styles.backButton}
        onClick={() => navigate('/')}
        variants={itemVariants}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back
      </motion.button>
      
    <motion.div className={styles.profilePic} variants={itemVariants}>
    <img
        src="src/assets/vjw-1-ps.jpg"
        alt="Victor Wu"
        className={styles.profileImage}
    />
    </motion.div>

      
      <motion.h1 className={styles.name} variants={itemVariants}>
        Victor Wu
      </motion.h1>
      
      <motion.p className={styles.tagline} variants={itemVariants}>
        Software Engineer at Google
      </motion.p>
      
      <motion.div className={styles.links} variants={itemVariants}>
        <a href="https://drive.google.com/file/d/1vLk173MkB2Lh3E6X2K-uF8LAL7K6fI9-/view?usp=sharing" className={styles.link} target="_blank" rel="noopener noreferrer">
          Resume
        </a>
        <a href="https://linkedin.com/in/victorjwuGT" className={styles.link} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/victorjwu" className={styles.link} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </motion.div>
    </motion.section>
  );
};

export default SWEHero;
