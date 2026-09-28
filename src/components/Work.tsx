import { ArrowUpRight, Globe } from "lucide-react";
import { projects, type Project } from "../data";
import { Reveal, SectionHeading, Tag } from "./ui";

function LivePreview({ project }: { project: Project }) {
  return (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`${project.title} — open live site in a new tab`}
      className="group/preview relative block overflow-hidden rounded-md bg-well ring-1 ring-paper/8 transition-colors duration-150 hover:ring-paper/20"
    >
      {/* Browser chrome bar */}
      <div className="flex h-9 items-center gap-3 border-b border-paper/8 bg-void px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="size-2 rounded-full bg-paper/15" />
          <i className="size-2 rounded-full bg-paper/15" />
          <i className="size-2 rounded-full bg-paper/15" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1.5 truncate font-mono text-[11px] text-fog">
          <Globe className="size-3 shrink-0" aria-hidden="true" />
          {project.liveUrl.replace("https://", "").replace("/", "")}
        </span>
        <ArrowUpRight
          className="size-3.5 shrink-0 text-fog transition-all duration-150 group-hover/preview:translate-x-0.5 group-hover/preview:-translate-y-0.5 group-hover/preview:text-paper"
          aria-hidden="true"
        />
      </div>

      {/* Live embed */}
      <div className="relative h-72 overflow-hidden sm:h-80">
        <iframe
          src={project.liveUrl}
          title={project.iframeTitle}
          loading="lazy"
          tabIndex={-1}
          className="pointer-events-none h-full w-full scale-[0.98] border-none opacity-90 transition-opacity duration-300 group-hover/preview:opacity-100"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-void/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/preview:opacity-100"
        >
          <span className="rounded-md bg-snow px-4 py-2 text-md font-semibold text-ink">
            Open Live Site ↗
          </span>
        </div>
      </div>
    </a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal className="group" delay={index * 0.08}>
      <article>
        <LivePreview project={project} />

        <div className="mt-6 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="font-mono text-xs tracking-[0.14em] text-fog uppercase">
              Project 0{index + 1} — {project.year}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 transition-colors duration-150 hover:text-fog"
              >
                {project.title}
              </a>
            </h3>
            <p className="mt-3 max-w-xl text-md leading-6 text-fog">{project.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} — view live project in a new tab`}
            className="hidden shrink-0 items-center gap-1.5 rounded-md px-4 py-2.5 text-md font-medium text-paper ring-1 ring-line-dark ring-inset transition-all duration-150 hover:bg-paper/8 hover:ring-paper/25 sm:inline-flex"
          >
            View Live
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="relative scroll-mt-20">
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <SectionHeading index="01" title="Featured Projects" className="mb-16 sm:mb-20" />
        </Reveal>
        <h2 id="work-heading" className="sr-only">
          Featured Projects
        </h2>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* GitHub row */}
        <Reveal className="mt-16">
          <a
            href="https://github.com/Alihaidercr3"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-6 border-y border-line-dark py-5 transition-colors duration-150 hover:bg-paper/4"
          >
            <span className="pl-2 text-lg font-medium text-paper transition-transform duration-300 ease-out group-hover:translate-x-2 sm:pl-4">
              More experiments, components & course work
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 pr-2 text-md text-fog transition-colors duration-150 group-hover:text-paper sm:pr-4">
              Browse GitHub
              <ArrowUpRight
                className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
