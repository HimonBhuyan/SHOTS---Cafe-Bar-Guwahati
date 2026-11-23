import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#d4891c] via-[#f2b441] to-[#ffe08a] z-[60] pointer-events-none shadow-[0_0_10px_rgba(242,180,65,0.7)]"
    />
  );
}

const DIRECTION_OFFSETS = {
  up: { y: 42, x: 0 },
  down: { y: -42, x: 0 },
  left: { x: 48, y: 0 },
  right: { x: -48, y: 0 },
  none: { x: 0, y: 0 },
};

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  rotate = 0,
  scale = 1,
  className = '',
}) {
  const offset = DIRECTION_OFFSETS[direction] || DIRECTION_OFFSETS.up;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        rotate,
        scale: scale < 1 ? scale : 0.96,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        type: 'spring',
        stiffness: 110,
        damping: 18,
        delay,
        duration,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, stagger = 0.08, delayChildren = 0.05, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, y = 32, rotate = 0, className = '', style }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y, scale: 0.94, rotate: rotate * 1.5 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate,
          transition: {
            type: 'spring',
            stiffness: 130,
            damping: 16,
          },
        },
      }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollParallax({ children, yRange = [-35, 35], rotateRange = [0, 0], className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, rotate }}>{children}</motion.div>
    </div>
  );
}
