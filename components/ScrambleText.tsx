
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+~|}{[]:;?><";

export const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  // Number of cycles per letter before it settles
  const CYCLES_PER_LETTER = 2;
  const SHUFFLE_SPEED = 50; // ms

  const scramble = () => {
    let pos = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      const scrambled = text.split("").map((char, index) => {
        if (index < pos) {
          return text[index];
        }
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join("");

      setDisplayText(scrambled);
      pos += 1 / CYCLES_PER_LETTER;

      if (pos > text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, SHUFFLE_SPEED);
  };

  // Trigger on mount
  useEffect(() => {
    scramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <motion.div 
      className={className}
      onMouseEnter={() => {
        setIsHovered(true);
        scramble();
      }}
      onMouseLeave={() => setIsHovered(false)}
      // Add a slight shake on hover for extra "glitch" feel
      animate={isHovered ? { x: [0, -2, 2, -1, 0], transition: { duration: 0.2 } } : {}}
    >
      {displayText}
    </motion.div>
  );
};
