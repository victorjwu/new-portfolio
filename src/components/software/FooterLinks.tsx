import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/software/FooterLinks.module.css';

const FooterLinks: React.FC = () => {
  const links = [
    { label: "Resume", href: "https://drive.google.com/file/d/1vLk173MkB2Lh3E6X2K-uF8LAL7K6fI9-/view?usp=sharing" },
    { label: "GitHub", href: "https://github.com/victorjwu" },
    { label: "LinkedIn", href: "https://linkedin.com/in/victorjwuGT" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      className={styles.footer}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className={styles.links}>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className={styles.link}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
      
      <p className={styles.copyright}>
        © {new Date().getFullYear()} Victor Wu
      </p>
    </motion.footer>
  );
};

export default FooterLinks;
