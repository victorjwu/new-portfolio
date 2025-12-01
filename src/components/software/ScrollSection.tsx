import React, { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';

interface ScrollSectionProps {
  id: string;
  title: string; // The title to show in the header when this section is active
  onInView: (id: string) => void;
  children: React.ReactNode;
  className?: string;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({ id, title, onInView, children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" }); // Trigger when center of section is in view

  useEffect(() => {
    if (isInView) {
      onInView(title);
    }
  }, [isInView, onInView, title]);

  return (
    <div id={id} ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollSection;
