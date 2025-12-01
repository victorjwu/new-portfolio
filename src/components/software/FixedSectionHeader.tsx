import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/software/FixedSectionHeader.module.css';

interface FixedSectionHeaderProps {
  activeSection: string;
}

const FixedSectionHeader: React.FC<FixedSectionHeaderProps> = ({ activeSection }) => {
  return (
    <div className={styles.headerContainer}>
      <AnimatePresence mode="wait">
        <motion.h2
          key={activeSection}
          className={styles.headerTitle}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Custom ease for premium feel
        >
          {activeSection}
        </motion.h2>
      </AnimatePresence>
      <div className={styles.decorativeLine} />
    </div>
  );
};

export default FixedSectionHeader;
