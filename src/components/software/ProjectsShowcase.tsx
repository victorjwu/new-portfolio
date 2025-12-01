import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/software/ProjectsShowcase.module.css';

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
}

const projects: Project[] = [
    {
    id: 1,
    title: 'Microsoft ABAC CoPilot',
    description: 'Trained an NLP model to translate natural language prompts into JSON Attribute-Based Access Control(ABAC) security policies. Won second place at Georgia Tech Junior Design Expo.',
    techStack: ['Python', 'Flask', 'TensorFlow', 'Mistral AI', 'React'],
    link: '#'
  },
  {
    id: 2,
    title: 'This Portfolio',
    description: 'Working on this portfolio and designing it in Figma. ',
    techStack: ['React', 'TypeScript', 'Framer Motion', 'Figma'],
    link: 'https://github.com/victorjwu/new-portfolio'
  },
  {
    id: 3,
    title: 'mise',
    description: 'Building an application that applies sentiment analysis (DistilBERT) to Reddit threads and food blogs to generate restaurant recommendations.',
    techStack: ['React', 'Node.js', 'MongoDB', 'DistilBERT'],
    link: '#'
  }
];

const ProjectsShowcase: React.FC = () => {
  return (
    <div className={styles.grid}>
      {projects.map((project, index) => (
        <motion.a 
          key={project.id}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.card}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -10 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.cardContent}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDescription}>{project.description}</p>
            
            <div className={styles.techStack}>
              {project.techStack.map((tech) => (
                <span key={tech} className={styles.techBadge}>{tech}</span>
              ))}
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default ProjectsShowcase;
