import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '../../styles/software/TechStack.module.css';

interface TechGroup {
  name: string;
  items: string[];
}

const techGroups: TechGroup[] = [
  {
    name: 'Languages',
    items: ['Python', 'Java', 'C++', 'TypeScript', 'JavaScript', 'Kotlin']
  },
  {
    name: 'Frontend',
    items: ['React', 'Next.js', 'Framer Motion', 'HTML/CSS', 'Tailwind']
  },
  {
    name: 'Backend',
    items: ['Node.js', 'Express', 'SQL', 'AWS' ]
  },
  {
    name: 'ML/AI',
    items: ['PyTorch', 'TensorFlow', 'Sentiment Analysis (BERT, DistilBERT)']
  }
];

const TechStack: React.FC = () => {
  return (
    <div className={styles.container}>
      {techGroups.map((group, groupIndex) => (
        <div key={group.name} className={styles.group}>
          <h3 className={styles.groupTitle}>{group.name}</h3>
          <div className={styles.grid}>
            {group.items.map((tech, index) => (
              <TechBadge key={tech} tech={tech} index={index + (groupIndex * 5)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const TechBadge: React.FC<{ tech: string; index: number }> = ({ tech, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Subtle floating effect
  const randomFactor = (index % 3) + 1;
  const y = useTransform(scrollYProgress, [0, 1], [10 * randomFactor, -10 * randomFactor]);
  
  return (
    <motion.div 
      ref={ref}
      className={styles.badge}
      style={{ y }}
      whileHover={{ 
        scale: 1.05, 
        backgroundColor: "var(--swe-text-brown)", 
        color: "#FFFFFF",
        borderColor: "var(--swe-text-brown)"
      }}
      transition={{ duration: 0.2 }}
    >
      {tech}
    </motion.div>
  );
};

export default TechStack;
