import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  transition?: 'fade' | 'flash' | 'slide';
}

const PageTransition = ({ children, transition = 'fade' }: PageTransitionProps) => {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 }
    },
    flash: {
      initial: { backgroundColor: '#fff', opacity: 0 },
      animate: { backgroundColor: 'transparent', opacity: 1 },
      exit: { backgroundColor: '#fff', opacity: 0 },
      transition: { duration: 0.3 }
    },
    slide: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
      transition: { duration: 0.5 }
    }
  };

  const selectedVariant = variants[transition];

  return (
    <motion.div
      className="w-full h-full"
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      exit={selectedVariant.exit}
      transition={selectedVariant.transition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;