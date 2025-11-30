import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/software/ProjectsShowcase.module.css';

interface Project {
  title: string;
  description: string;
  tags: string[];
  imageColor: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack marketplace with real-time inventory management and payment processing.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    imageColor: "#1a1a2e",
  },
  {
    title: "Analytics Dashboard",
    description: "Data visualization platform for business intelligence with interactive charts.",
    tags: ["TypeScript", "D3.js", "Express", "MongoDB"],
    imageColor: "#16213e",
  },
  {
    title: "Mobile Fitness App",
    description: "Cross-platform fitness tracking application with social features.",
    tags: ["React Native", "Firebase", "Redux"],
    imageColor: "#0f3460",
  },
  {
    title: "AI Content Generator",
    description: "Machine learning powered tool for automated content creation and optimization.",
    tags: ["Python", "TensorFlow", "FastAPI"],
    imageColor: "#1a1a2e",
  },
];

const ProjectsShowcase: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Selected Projects</h2>
      
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={styles.card}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className={styles.image} style={{ backgroundColor: project.imageColor }}>
              <span className={styles.imagePlaceholder}>{project.title.charAt(0)}</span>
            </div>
            
            <div className={styles.cardContent}>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>
              
              <div className={styles.tags}>
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProjectsShowcase;
