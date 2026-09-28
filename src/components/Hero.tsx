import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Terminal } from "lucide-react";
import { useRef } from "react";
import { profile } from "../data";
import { ButtonLink } from "./ui";

/* Masked line reveal — text slides up from behind an overflow mask */
function MaskedLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: reduce ? 0 : "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="dot-grid relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* Soft radial glow anchored to the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] h-[60vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{
          background: "radial-gradient(closest-side, oklch(1 0 0 / 0.05), transparent)",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 pt-32 pb-16 sm:px-8"
      >
        {/* Operator meta row */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          <span className="flex items-center gap-1.5 font-mono text-xs tracking-[0.14em] text-fog uppercase">
            <Terminal className="size-3.5" aria-hidden="true" />
            {profile.name} — Portfolio 2026
          </span>
          <span className="inline-flex items-center gap-2 rounded-md bg-paper/6 py-1.5 pr-3 pl-2.5 text-xs font-medium text-paper ring-1 ring-paper/10 ring-inset">
            <span className="relative flex size-1.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </span>
        </motion.div>

        {/* Display headline */}
        <h1 className="text-display font-semibold text-paper uppercase select-none">
          <MaskedLine delay={0.25}>Fast, intuitive,</MaskedLine>
          <MaskedLine delay={0.37}>
            &amp; responsive
          </MaskedLine>
          <MaskedLine delay={0.49}>
            <span className="text-paper/75">web applications.</span>
          </MaskedLine>
        </h1>

        {/* Sub row */}
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-lg text-fog"
          >
            Hi, I'm Ali —{" "}
            <span className="text-paper">
              a full-stack developer specializing in React, JavaScript, and Tailwind CSS.
            </span>{" "}
            I build high-performance interfaces and responsive web systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="#work">Explore Featured Work</ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Contact Me
            </ButtonLink>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#work"
        aria-label="Scroll to featured projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fog transition-colors duration-150 hover:text-paper sm:flex"
      >
        <span className="font-mono text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.span
          animate={reduce ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
