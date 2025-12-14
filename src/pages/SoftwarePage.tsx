import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SoftwarePage.module.css';
import { 
  AboutSection, 
  ExperienceSection, 
  EducationSection, 
  ProjectsSection, 
  SkillsSection 
} from '../components/software/SWESections';

const SoftwarePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const sections = [
    { id: 'about', label: 'about' },
    { id: 'experience', label: 'experience' },
    { id: 'education', label: 'education' },
    { id: 'projects', label: 'projects' },
    { id: 'skills', label: 'skills' },
  ];

  React.useEffect(() => {
    // Increase timer to cover the full duration of entrance animations
    const timer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  // Handle wheel scroll to switch sections
  React.useEffect(() => {
    let isThrottled = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Prevent native scroll
      if (isThrottled) return;

      if (Math.abs(e.deltaY) > 100) { // Doubled threshold (50 -> 100)
        isThrottled = true;
        
        const currentIndex = sections.findIndex(s => s.id === activeSection);
        if (e.deltaY > 0) {
          // Scroll Down -> Next Section
          if (currentIndex < sections.length - 1) {
            setActiveSection(sections[currentIndex + 1].id);
          }
        } else {
          // Scroll Up -> Previous Section
          if (currentIndex > 0) {
            setActiveSection(sections[currentIndex - 1].id);
          }
        }

        setTimeout(() => {
          isThrottled = false;
        }, 1000); // Keep debounce
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, sections]);

  const renderSection = () => {
    switch (activeSection) {
      case 'about': return <AboutSection />;
      case 'experience': return <ExperienceSection />;
      case 'education': return <EducationSection />;
      case 'projects': return <ProjectsSection />;
      case 'skills': return <SkillsSection />;
      default: return <AboutSection />;
    }
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    // Standard states (instant/fast interaction)
    visible: {
      opacity: 1,
      x: 0,
      color: "rgba(255, 255, 255, 0.5)",
      transition: { duration: 0.3 }
    },
    active: {
      opacity: 1,
      x: 0,
      color: "rgba(255, 255, 255, 1.0)",
      fontWeight: 400,
      transition: { duration: 0.3 }
    },
    // Entrance states (slow synchronized delay)
    visibleEntrance: (custom: number) => ({
      opacity: 1,
      x: 0,
      color: "rgba(255, 255, 255, 0.5)",
      transition: {
        delay: 0.6 + (custom * 0.1),
        duration: 0.8,
        ease: "easeOut"
      }
    }),
    activeEntrance: (custom: number) => ({
      opacity: 1,
      x: 0,
      color: "rgba(255, 255, 255, 1.0)",
      fontWeight: 400,
      transition: {
        delay: 0.6 + (custom * 0.1),
        duration: 0.8,
        ease: "easeOut"
      }
    }),
    hover: { 
      x: 4, 
      color: "rgba(255, 255, 255, 0.8)",
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.98 }
  };

  const backButtonVariants: Variants = {
    // ... (unchanged)
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { delay: 0.5, duration: 0.8 }
    },
    hover: { 
      y: -2,
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Exit Overlay */}
      <motion.div
        className={styles.exitOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      {/* ... (wrapper) */}
      <div className={styles.overlay} />

      <div className={styles.leftColumn}>
        <div className={styles.backButtonWrapper}>
          <motion.button 
            onClick={() => {
              setIsExiting(true);
              setTimeout(() => {
                navigate('/', { state: { skipTransition: true } });
              }, 800);
            }} 
            className={styles.backButton}
            variants={backButtonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            style={{ 
              willChange: 'opacity, transform', 
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)' 
            }}
          >
            ← Back
          </motion.button>
        </div>

        <div className={styles.headerContainer}>
           <motion.h1 
            className={styles.headerName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span style={{ display: 'inline-block' }}>VICTOR</span>
            {" "}
            <span style={{ display: 'inline-block' }}>WU</span>
          </motion.h1>
          <motion.p 
            className={styles.headerSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }} 
          >
            software engineer
          </motion.p>
        </div>

        <nav className={styles.nav}>
          {sections.map((section, i) => {
            // Determine active/visible state based on section
            const isActive = activeSection === section.id;
            
            // Choose the correct variant name based on loading state
            let animateState = "visible";
            if (isFirstLoad) {
              animateState = isActive ? "activeEntrance" : "visibleEntrance";
            } else {
              animateState = isActive ? "active" : "visible";
            }

            return (
              <motion.button
                key={section.id}
                custom={i}
                variants={buttonVariants}
                initial="hidden"
                animate={animateState}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setActiveSection(section.id)}
                className={styles.navItem} 
                style={{ 
                  willChange: 'opacity, transform', 
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)' 
                }}
              >
                {section.label}
              </motion.button>
            );
          })}
        </nav>
      </div>

      <div className={styles.rightColumn}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} 
            transition={{ 
              duration: 0.5, 
              ease: "easeOut", 
              // Synchronize content arrival with other elements
              delay: isFirstLoad ? 0.6 : 0 
            }} 
            style={{ willChange: 'opacity, transform', backfaceVisibility: 'hidden' }}
            className={styles.sectionContainer}
          >
             {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SoftwarePage;
