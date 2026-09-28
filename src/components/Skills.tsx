import { useReducedMotion } from "framer-motion";
import { Asterisk } from "lucide-react";
import { marqueeItems, skillGroups, stats } from "../data";
import { Reveal, SectionHeading } from "./ui";

/* ── Tech marquee — decorative, hidden from AT ───────────────── */
export function Marquee() {
  const reduce = useReducedMotion();
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div
      aria-hidden="true"
      className="mask-fade-x overflow-hidden border-y border-line-dark py-5"
    >
      <div
        className={
          reduce
            ? "flex w-max items-center gap-10"
            : "flex w-max animate-marquee items-center gap-10"
        }
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-2xl font-medium tracking-tight whitespace-nowrap text-fog"
          >
            {item}
            <Asterisk className="size-5 text-paper/30" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-20">
      <Marquee />

      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <SectionHeading index="02" title="Skills & Toolkit" className="mb-16 sm:mb-20" />
        </Reveal>
        <h2 id="skills-heading" className="sr-only">
          Technical Competencies
        </h2>

        {/* Competency cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.n} delay={i * 0.06}>
              <div className="group flex h-full flex-col rounded-md bg-well/50 p-5 ring-1 ring-paper/6 ring-inset transition-colors duration-150 ease-out hover:bg-well hover:ring-paper/12 sm:p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold tracking-tight text-paper">
                    {group.title}
                  </h3>
                  <span className="font-mono text-xs text-fog">{group.n}</span>
                </div>
                <ul className="mt-5 flex flex-col gap-2.5 border-t border-paper/8 pt-5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-lg text-fog transition-colors duration-150 group-hover:text-paper/80"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1 shrink-0 rounded-full bg-fog/60"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats strip */}
        <Reveal delay={0.2}>
          <dl className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-md bg-line-dark ring-1 ring-line-dark sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between gap-6 bg-void px-6 py-7 transition-colors duration-150 hover:bg-well/40 sm:flex-col sm:items-start sm:gap-2"
              >
                <dd className="order-1 text-4xl font-semibold tracking-tight text-paper tabular-nums sm:order-2">
                  {s.value}
                </dd>
                <dt className="order-2 text-sm text-fog sm:order-1">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
