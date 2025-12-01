import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '../../styles/software/SWEHero.module.css';
import face from '../../assets/vjw-1-ps.jpg';

const SWEHero: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section 
      ref={ref}
      className={styles.heroSection}
      style={{ opacity, y }}
    >
      <div className={styles.content}>
        <motion.div 
          className={styles.imageContainer}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.profileImageWrapper}>
            <img src={face} alt="Profile" className={styles.profileImage} />
          </div>
        </motion.div>

        <motion.h1 
          className={styles.title}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Victor Wu
        </motion.h1>
        
        <motion.p 
          className={styles.subtitle}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Software Engineer
        </motion.p>

        <motion.div 
          className={styles.decorativeLine}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.div 
          className={styles.links}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="https://drive.google.com/file/d/1vLk173MkB2Lh3E6X2K-uF8LAL7K6fI9-/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={styles.link}>Resume</a>
          <a href="https://github.com/victorjwu" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
          <a href="https://linkedin.com/in/victorjwuGT" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SWEHero;
