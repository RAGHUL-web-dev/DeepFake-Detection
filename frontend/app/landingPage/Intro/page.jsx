'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

const NAME = 'DeepShield';

function LandingServices() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  const controls = useAnimation();
  const iconControls = useAnimation();

  const [revealText, setRevealText] = useState(false);
  const [isAutoRoaming, setIsAutoRoaming] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isInView) {
      // Reset state for a fresh start
      setRevealText(false);
      setIsAutoRoaming(true);

      // Container expand animation
      controls.start({
        width: '98%',
        transition: { duration: 1.2, ease: 'easeInOut' },
      });

      // Icon roaming sequence (6 seconds)
      iconControls.start({
        x: [0, 300, -350, 400, -200, 350, 0],
        y: [0, -200, 150, -100, 200, -150, 0],
        scale: [1, 1.5, 1.2, 1.8, 1.3, 1.6, 1],
        rotate: [0, 45, -45, 90, -90, 180, 0],
        transition: {
          duration: 6,
          ease: 'easeInOut',
        },
      }).then(() => {
        setIsAutoRoaming(false);
        setRevealText(true);
      });
    } else {
      // Reset when scrolling out
      controls.start({
        width: '80%',
        transition: { duration: 0.5, ease: 'easeInOut' },
      });
      iconControls.stop();
      setRevealText(false);
      setIsAutoRoaming(true);
      setMousePos({ x: 0, y: 0 });
    }
  }, [isInView, controls, iconControls]);

  const handleMouseMove = (e) => {
    if (!isAutoRoaming && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePos({ x, y });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  };

  return (
    <section
      className="flex min-h-screen w-full items-center justify-center bg-[var(--color-dark)] py-20"
    >
      <motion.div
        ref={containerRef}
        initial={{ width: '80%' }}
        animate={controls}
        onMouseMove={handleMouseMove}
        className="relative flex min-h-[85vh] items-center justify-center rounded-[3rem] border border-white/10 bg-[var(--color-dark-light)]/50 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 h-full w-full bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_70%)] opacity-20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/2 h-full w-full bg-[radial-gradient(circle,var(--color-secondary)_0%,transparent_70%)] opacity-10 blur-3xl" />
        </div>

        {/* Magnifying Glass */}
        <motion.div
          animate={isAutoRoaming ? iconControls : { x: mousePos.x, y: mousePos.y, scale: 1.2 }}
          transition={isAutoRoaming ? undefined : { type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] cursor-none pointer-events-none"
        >
          <div className="relative flex items-center justify-center">
            <Search
              size={34}
              className="text-[var(--color-primary-light)] opacity-80"
            />
            {/* Inner Glass Reflect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent opacity-30" />
          </div>
        </motion.div>

        {/* Text Reveal */}
        {revealText && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="z-10 text-center px-6"
          >
            <h2 className="flex flex-wrap justify-center text-6xl font-black tracking-tighter text-[var(--color-light)] md:text-8xl">
              {NAME.split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className={index >= 4 ? 'text-[var(--color-primary-light)]' : ''}
                >
                  {char}
                </motion.span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-8 max-w-2xl text-xl font-medium leading-relaxed text-[var(--color-light-gray)]/80 md:text-2xl"
            >
              AI-powered <span className="text-[var(--color-light)]">deepfake detection</span> with
              forensic analysis and blockchain-backed proof of authenticity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="mt-12"
            >
              <button className="rounded-full bg-[var(--color-primary)] px-10 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-[var(--color-primary-light)] hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)]">
                Explore Technology
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

export default LandingServices;