import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Hero.module.css';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  // 1. Name Container Animation (Slides up after rejoin)
  const nameContainerVariants: Variants = {
    hidden: { y: '15vh' }, // Start centered (compensating for padding-bottom)
    visible: {
      y: 0,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        delay: 2.2, // Speed up: 3.2 -> 2.2
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  // 2. Left Word "VICTOR" (Fade in with blur)
  const leftWordVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        opacity: { duration: 0.8, ease: "easeOut", delay: 0.5 },
        filter: { duration: 2.5, ease: "easeOut", delay: 0.5 }, // Longer blur-to-focus
      },
    },
  };

  // 3. Right Word "WU" (Fade in with blur)
  const rightWordVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        opacity: { duration: 0.8, ease: "easeOut", delay: 0.6 },
        filter: { duration: 2.5, ease: "easeOut", delay: 0.6 }, // Longer blur-to-focus
      },
    },
  };

  // 4. Curtain Animation (Fades out to reveal video)
  const curtainVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 0.3, // Final tint
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        delay: 2.2, // Speed up: 3.2 -> 2.2
      },
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  // 5. Subline Animation
  const sublineVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 3.5, // Speed up: 4.5 -> 3.5
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  // 6. Buttons Animation
  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 3.8 + custom * 0.1, // Speed up: 4.8 -> 3.8
      },
    }),
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
  };

  const handleSWEClick = () => {
    navigate('/software');
  };

  const handleCreativeClick = () => {
    console.log("Navigating to Art & Creative...");
  };

  return (
    <section className={styles.hero}>
      <motion.div 
        className={styles.overlay}
        style={{ backgroundColor: '#000', zIndex: 1 }}
        variants={curtainVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      />
      <div className={styles.content}>
        <motion.h1 
          className={styles.name} 
          variants={nameContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.span variants={leftWordVariants} style={{ display: 'inline-block' }}>VICTOR</motion.span>
          {" "}
          <motion.span variants={rightWordVariants} style={{ display: 'inline-block' }}>WU</motion.span>
        </motion.h1>
        
        <motion.p 
          className={styles.subline} 
          variants={sublineVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          Everything I've been working on lately...
          <br />
          (This site is a work in progress)
        </motion.p>
        
        <div className={styles.buttonRow}>
          <motion.button 
            className={styles.pathButton}
            variants={buttonVariants}
            custom={0}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            onClick={handleSWEClick}
            style={{ willChange: 'opacity, transform' }}
          >
            Software Engineering
          </motion.button>
          
          <motion.button 
            className={styles.pathButton}
            variants={buttonVariants}
            custom={1}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            onClick={handleCreativeClick}
            style={{ willChange: 'opacity, transform' }}
          >
            Art & Creative
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
