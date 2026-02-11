
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const BlendCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999]"
      animate={{
        x: mousePosition.x - 8,
        y: mousePosition.y - 8,
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 50,
        mass: 0.1
      }}
    />
  );
};
