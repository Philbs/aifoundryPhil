import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Slide = ({ content, direction }) => {
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <motion.div
      key={content.id}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }}
      className="slide-content glass-effect"
    >
      <div className="text-section">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="title-gradient"
        >
          {content.title}
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {content.description}
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="image-section"
      >
        {content.image ? (
          <img src={content.image} alt={content.title} />
        ) : (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ilustração será gerada aqui</div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Slide;
