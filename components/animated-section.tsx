// components/animated-section.tsx
import React, { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: ReactNode;
  title: string;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, title, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref);

  return (
    <div ref={ref} className="my-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className={className}
      >
        {title}
      </motion.h2>
      {children}
    </div>
  );
};

export default AnimatedSection;
