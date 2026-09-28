import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

/* ── Scroll reveal — respects reduced motion ────────────────── */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section heading — index label + title ──────────────────── */
export function SectionHeading({
  index,
  title,
  className,
}: {
  index: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline justify-between gap-4", className)}>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs tracking-[0.14em] text-fog uppercase">
          /{index}
        </span>
        <h2 className="text-sm font-medium text-paper">
          {title}
        </h2>
      </div>
      <span className="hidden h-px flex-1 bg-line-dark sm:block" aria-hidden="true" />
    </div>
  );
}

/* ── Button — all states: default / hover / focus-visible / active / disabled ── */
type ButtonVariant = "primary" | "secondary" | "ghost";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
}) {
  const base =
    "group inline-flex h-11 items-center gap-2 rounded-md px-5 text-md font-medium transition-all duration-150 ease-out select-none active:scale-[0.98]";
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-snow text-ink hover:bg-paper hover:shadow-[0_0_0_1px_rgba(255,255,255,0.24),0_8px_24px_rgba(255,255,255,0.12)]",
    secondary:
      "bg-transparent text-paper ring-1 ring-line-dark ring-inset hover:bg-paper/8 hover:ring-paper/25",
    ghost: "bg-transparent text-fog hover:text-paper hover:bg-paper/6",
  };
  return (
    <a
      href={href}
      className={cn(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/* ── Arrow link — text link with kinetic arrow ──────────────── */
export function ArrowLink({
  href,
  children,
  className,
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <a
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-1.5 text-md font-medium transition-colors duration-150 ease-out",
        tone === "light" ? "text-paper" : "text-ink",
        className
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className={cn(
            "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/link:scale-x-100",
            tone === "light" ? "bg-paper" : "bg-ink"
          )}
        />
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-4 transition-transform duration-150 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 12L12 4M12 4H5M12 4v7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

/* ── Tag / chip ─────────────────────────────────────────────── */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm bg-paper/6 px-2.5 py-1 text-sm font-medium text-fog ring-1 ring-paper/8 ring-inset">
      {children}
    </span>
  );
}
