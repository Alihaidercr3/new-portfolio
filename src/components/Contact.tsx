import {
  ArrowUp,
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { profile, socials, web3formsKey } from "../data";
import { cn } from "../utils/cn";
import { Reveal } from "./ui";

type FormState = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-md bg-well/60 px-4 py-3.5 text-md text-paper ring-1 ring-paper/10 ring-inset transition-all duration-150 ease-out outline-none placeholder:text-fog/70 hover:ring-paper/20 disabled:cursor-not-allowed disabled:opacity-60";

/* ── Contact form — Web3Forms, all states implemented ───────── */
function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const busy = state === "submitting";
  const done = state === "success";

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    setState("submitting");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", web3formsKey);
    formData.append("subject", `Portfolio inquiry from ${form.name}`);
 
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setState("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  return (
    <form onSubmit={submit} aria-label="Contact form" className="w-full max-w-xl">
      {/* Honeypot — bots only, hidden from users & AT */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-md text-fog">
            Your name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Jane Cooper"
            value={form.name}
            onChange={update("name")}
            disabled={busy}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-md text-fog">
            Your email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            value={form.email}
            onChange={update("email")}
            disabled={busy}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className="mb-2 block text-md text-fog">
          Project details or inquiry
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about the role, the product, or the problem you're solving…"
          value={form.message}
          onChange={update("message")}
          disabled={busy}
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <button
          type="submit"
          disabled={busy}
          className={cn(
            "inline-flex h-11 w-full items-center justify-center gap-2 rounded-md px-6 text-md font-medium transition-all duration-150 ease-out active:scale-[0.98]",
            "bg-snow text-ink hover:bg-paper disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          {busy ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : done ? (
            <>
              <CheckCircle2 className="size-4" aria-hidden="true" />
              Send Another
            </>
          ) : (
            "Send Message"
          )}
        </button>

        <a
          href={`mailto:${profile.email}`}
          className="group inline-flex items-center gap-1.5 text-md font-medium text-fog transition-colors duration-150 hover:text-paper"
        >
          or email directly
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>

      {/* Live region for state announcements */}
      <div aria-live="polite" className="mt-4 min-h-6">
        {done && (
          <p className="flex items-center gap-1.5 text-sm text-emerald-300">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            Message sent — I'll get back to you within one business day.
          </p>
        )}
        {state === "error" && (
          <p className="flex items-center gap-1.5 text-sm text-red-300">
            <CircleAlert className="size-4" aria-hidden="true" />
            Send failed — please try again or email me directly.
          </p>
        )}
      </div>
    </form>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20">
      <div className="border-t border-line-dark">
        <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.14em] text-fog uppercase">
              /05 — Contact
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="contact-heading"
              className="mt-8 text-display-md font-semibold tracking-tight text-paper uppercase sm:text-display"
            >
              Let's build
              <br />
              <span className="text-fog">something together.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="mt-14">
            <ContactForm />
          </Reveal>
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-line-dark">
        <div className="mx-auto max-w-[1400px] px-5 pt-14 pb-8 sm:px-8">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-md font-semibold text-paper">{profile.name}</p>
              <p className="mt-1 text-md text-fog">{profile.role} — React · Tailwind · MERN</p>
            </div>

            <nav aria-label="Social" className="flex flex-wrap gap-x-6 gap-y-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group inline-flex items-center gap-1 text-md text-fog transition-colors duration-150 hover:text-paper"
                >
                  <span className="underline decoration-fog/50 underline-offset-4 group-hover:decoration-paper">
                    {s.label}
                  </span>
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              ))}
            </nav>

            <a
              href="#top"
              aria-label="Back to top"
              className="group inline-flex h-10 items-center gap-2 self-start rounded-md px-4 text-md text-fog ring-1 ring-line-dark ring-inset transition-colors duration-150 hover:bg-paper/6 hover:text-paper"
            >
              Back to top
              <ArrowUp
                className="size-4 transition-transform duration-150 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="mt-12 flex flex-col gap-2 border-t border-line-dark pt-6 text-xs text-fog sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
            <p>Built with React, TypeScript & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </section>
  );
}
