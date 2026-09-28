import { Briefcase, GraduationCap } from "lucide-react";
import { experience } from "../data";
import { Reveal, SectionHeading } from "./ui";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <SectionHeading index="03" title="Experience" className="mb-16 sm:mb-20" />
        </Reveal>
        <h2 id="exp-heading" className="sr-only">
          Career & Training Timeline
        </h2>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Timeline */}
          <div className="lg:col-span-8">
            <ol className="relative space-y-0 border-l border-paper/12 pl-8">
              {experience.map((job, i) => (
                <Reveal key={job.company} delay={i * 0.08}>
                  <li className="group relative pb-12 last:pb-0">
                    {/* Node */}
                    <span
                      aria-hidden="true"
                      className={
                        job.current
                          ? "absolute top-1 -left-[38.5px] grid size-[13px] place-items-center rounded-full bg-paper ring-4 ring-void"
                          : "absolute top-1 -left-[38.5px] grid size-[13px] place-items-center rounded-full bg-well ring-4 ring-void"
                      }
                    >
                      {job.current && (
                        <span className="absolute size-full animate-ping rounded-full bg-paper/50" />
                      )}
                    </span>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-md bg-well ring-1 ring-paper/8">
                        {i === 0 ? (
                          <Briefcase className="size-4 text-paper" aria-hidden="true" />
                        ) : (
                          <GraduationCap className="size-4 text-paper" aria-hidden="true" />
                        )}
                      </span>
                      <span className="font-mono text-xs tracking-[0.1em] text-fog uppercase tabular-nums">
                        {job.period}
                      </span> 
                    </div>

                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-paper sm:text-2xl">
                      {job.role}
                      <span className="font-normal text-fog"> at {job.company}</span>
                    </h3>
                    <p className="mt-2 max-w-xl text-md leading-6 text-fog">{job.note}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Currently card */}
          <div className="lg:col-span-4">
            <Reveal delay={0.15}>
              <div className="rounded-md bg-well/50 p-6 ring-1 ring-paper/6 ring-inset sm:p-7">
                <p className="font-mono text-xs tracking-[0.14em] text-fog uppercase">
                  Right now
                </p>
                <p className="mt-4 text-xl leading-snug font-medium tracking-tight text-paper">
                  Shipping MERN features at Co Dev — and open to full-stack roles &
                  contract work.
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-paper/8 pt-6 text-md text-fog">
                  <li className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-fog/60" />
                    Modular React component systems
                  </li>
                  <li className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-fog/60" />
                    REST API integration & data flows
                  </li>
                  <li className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-fog/60" />
                    Responsive layout maintenance
                  </li>
                </ul>
                <a
                  href="#contact"
                  className="mt-7 inline-flex h-10 items-center rounded-md bg-snow px-4 text-md font-medium text-ink transition-all duration-150 ease-out hover:bg-paper active:scale-[0.98]"
                >
                  Discuss an Opportunity
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
