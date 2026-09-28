import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { certificates, type Certificate } from "../data";
import { Reveal, SectionHeading } from "./ui";

/* Monogram tile — replace with real cert PNG via `image` in data.ts */
function CertVisual({ cert, large = false }: { cert: Certificate; large?: boolean }) {
  if (cert.image) {
    return (
      <img
        src={cert.image}
        alt={`${cert.name} certificate issued by ${cert.issuer}`}
        loading="lazy"
        className={
          large
            ? "max-h-64 w-full object-contain"
            : "aspect-video w-full object-cover"
        }
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className={
        "dot-grid relative grid place-items-center overflow-hidden bg-well/60 " +
        (large ? "h-52 rounded-md" : "aspect-video")
      }
    >
      <span
        className="absolute top-3 left-3 size-2 rounded-full"
        style={{ background: cert.brandDot }}
      />
      <span
        className={
          "font-semibold tracking-tight text-paper/90 select-none " +
          (large ? "text-7xl" : "text-5xl")
        }
      >
        {cert.monogram}
      </span>
      <span className="absolute right-3 bottom-3 font-mono text-[10px] tracking-[0.14em] text-fog uppercase">
        {cert.issuer}
      </span>
    </div>
  );
}

export function Certifications() {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const open = (cert: Certificate, trigger: HTMLButtonElement) => {
    lastTrigger.current = trigger;
    setSelected(cert);
  };

  const close = () => {
    setSelected(null);
    lastTrigger.current?.focus();
  };

  /* Focus management + Escape + scroll lock */
  useEffect(() => {
    if (!selected) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section
      id="certifications"
      aria-labelledby="certs-heading"
      className="scroll-mt-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <SectionHeading index="04" title="Credentials" className="mb-16 sm:mb-20" />
        </Reveal>
        <h2 id="certs-heading" className="sr-only">
          Verified Certifications
        </h2>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.07}>
              <li className="h-full">
                <button
                  type="button"
                  onClick={(e) => open(cert, e.currentTarget)}
                  aria-haspopup="dialog"
                  className="group flex h-full w-full flex-col overflow-hidden rounded-md bg-well/50 text-left ring-1 ring-paper/6 ring-inset transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-well hover:ring-paper/12"
                >
                  <CertVisual cert={cert} />
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-md leading-6 font-semibold text-paper">
                        {cert.name}
                      </h3>
                      <BadgeCheck
                        className="mt-0.5 size-4 shrink-0 text-fog"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-1.5 font-mono text-xs text-fog">
                      {cert.issuer} — {cert.date}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-5 text-md font-medium text-paper">
                      View Details
                      <ArrowUpRight
                        className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </button>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* ── Certificate dialog ─────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] grid place-items-center p-4"
          >
            <div
              aria-hidden="true"
              onClick={close}
              className="absolute inset-0 bg-void/70 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cert-dialog-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-lg rounded-md bg-void p-6 ring-1 ring-paper/12 sm:p-8"
            >
              <button
                type="button"
                ref={closeRef}
                onClick={close}
                aria-label="Close certificate preview"
                className="absolute top-4 right-4 z-10 grid size-9 place-items-center rounded-md text-fog transition-colors duration-150 hover:bg-paper/8 hover:text-paper"
              >
                <X className="size-4" aria-hidden="true" />
              </button>

              <CertVisual cert={selected} large />

              <h3
                id="cert-dialog-title"
                className="mt-6 text-xl font-semibold tracking-tight text-paper"
              >
                {selected.name}
              </h3>
              <p className="mt-1.5 font-mono text-xs text-fog">
                {selected.issuer} — {selected.date}
              </p>
              <p className="mt-4 text-md leading-6 text-fog">{selected.description}</p>

              <button
                type="button"
                onClick={close}
                className="mt-7 inline-flex h-10 items-center rounded-md px-4 text-md font-medium text-paper ring-1 ring-line-dark ring-inset transition-colors duration-150 hover:bg-paper/8"
              >
                Close Preview
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
