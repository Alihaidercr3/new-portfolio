import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "../data";
import { cn } from "../utils/cn";

const links = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Escape closes the menu; scroll locked while open */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        scrolled && !open
          ? "border-b border-line-dark bg-void/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8"
      >
        {/* Logo */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-md font-semibold tracking-tight text-paper"
        >
          <span className="grid size-7 place-items-center rounded-sm bg-snow text-xs font-bold text-ink transition-colors duration-150 group-hover:bg-paper">
            {profile.shortName}
          </span>
          <span className="hidden sm:inline">
            {profile.name.split(" ")[0].toLowerCase()}
            <span className="text-fog">.dev</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-sm px-3 py-2 text-md text-fog transition-colors duration-150 ease-out hover:bg-paper/6 hover:text-paper"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right cluster: role + CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <span className="font-mono text-xs tracking-[0.04em] text-paper/70">
            {profile.role}
          </span>
          <a
            href="#contact"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-snow px-4 text-md font-medium text-ink transition-all duration-150 ease-out hover:bg-paper active:scale-[0.98]"
          >
            Get in Touch
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center rounded-md text-paper transition-colors duration-150 hover:bg-paper/8 active:scale-95 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-16 z-40 flex flex-col bg-void px-5 pb-8 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1">
              {[...links, { label: "Contact", href: "#contact" }].map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-baseline gap-4 rounded-md py-4 text-3xl font-semibold tracking-tight text-paper transition-colors hover:text-fog sm:text-4xl"
                >
                  <span className="font-mono text-xs text-fog">0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center justify-between border-t border-line-dark pt-6">
              <span className="font-mono text-xs text-fog uppercase">{profile.role}</span>
              <a
                href={`mailto:${profile.email}`}
                className="text-sm font-medium text-paper underline decoration-fog underline-offset-4 hover:decoration-paper"
              >
                Email me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
