'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const statements = [
  'This video never happened.',
  'This face does not exist.',
  'This voice was never spoken.',
  'This evidence was fabricated.',
];

function DeepfakeRealitySection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % statements.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">

          {/* LEFT CONTENT */}
          <div>
            {/* Eyebrow */}
            <p className="mb-4 text-xs font-semibold tracking-widest text-[var(--color-light-gray)]">
              THE REALITY
            </p>

            {/* Heading */}
            <h2 className="mb-6 text-3xl font-extrabold leading-tight text-[var(--color-light)] md:text-4xl">
              Not Everything You See Is Real Anymore.
            </h2>

            {/* Description */}
            <p className="mb-8 max-w-xl text-base leading-relaxed text-[var(--color-light-gray)]">
              Artificial intelligence can now generate images, videos, and voices
              that convincingly imitate real people and real events — blurring
              the line between truth and fabrication.
            </p>

            {/* Animated Statement */}
            <div className="h-10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-lg font-semibold text-[var(--color-primary-light)]"
                >
                  {statements[index]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20">

              {/* Image Placeholder */}
              <div
                className="h-[320px] w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/deepfake-reality.jpg')",
                }}
              />

              {/* Subtle Glitch Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.08, 0] }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 6,
                }}
                className="pointer-events-none absolute inset-0 bg-[var(--color-primary)] mix-blend-overlay"
              />
            </div>

            {/* Caption */}
            <p className="mt-3 text-xs text-[var(--color-light-gray)]">
              AI-generated media can closely resemble real people and events.
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-20 h-px w-full bg-[var(--color-dark)]" />
      </div>
    </section>
  );
}

export default DeepfakeRealitySection;