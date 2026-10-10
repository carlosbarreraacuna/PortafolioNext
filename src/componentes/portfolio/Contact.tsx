"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/motion";
import { useI18n } from "./I18nProvider";
import { Section, SectionTitle } from "./Section";
import { CONTACT } from "@/content/translations";

type Field = "name" | "name2" | "email" | "phone" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "toon-control w-full bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-shadow duration-200 focus-visible:shadow-toon aria-[invalid=true]:border-red-600";

export function Contact() {
  const { t } = useI18n();
  const f = t.contact.form;
  const root = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => revealOnScroll(root.current!));
      return () => mm.revert();
    },
    { scope: root },
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(["name", "name2", "email", "phone", "message"].map((k) => [k, String(data.get(k) ?? "").trim()])) as Record<Field, string>;

    const next: Errors = {};
    (Object.keys(values) as Field[]).forEach((k) => {
      if (!values[k]) next[k] = f.required;
    });
    if (!next.email && !EMAIL_RE.test(values.email)) next.email = f.invalidEmail;
    setErrors(next);
    if (Object.keys(next).length) {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      formRef.current?.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const field = (name: Field, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={`c-${name}`} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={`c-${name}`}
        name={name}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `c-${name}-err` : undefined}
        className={inputClass}
        {...props}
      />
      {errors[name] && (
        <p id={`c-${name}-err`} className="text-sm font-medium text-red-600 dark:text-red-400">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <Section id="contact" ref={root}>
      <SectionTitle>{t.sections.contact}</SectionTitle>

      <a
        data-reveal
        href={`mailto:${CONTACT.email}`}
        className="group mt-10 inline-flex max-w-full items-center gap-3 break-all font-display text-2xl font-extrabold tracking-tighter text-ink underline decoration-accent decoration-4 underline-offset-[10px] transition-colors duration-200 hover:decoration-ink sm:text-4xl lg:text-5xl"
      >
        {CONTACT.email}
        <ArrowUpRight size={36} weight="bold" className="shrink-0 text-accent-text transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
      </a>

      <div className="mt-16 grid gap-14 lg:grid-cols-12">
        <dl data-reveal className="flex flex-col gap-8 lg:col-span-4">
          <div className="flex flex-col gap-1">
            <dt className="text-sm text-muted">{t.contact.phone}</dt>
            <dd>
              <a href={CONTACT.phoneHref} className="text-lg font-bold text-accent-text">
                {CONTACT.phone}
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm text-muted">{t.contact.based}</dt>
            <dd className="text-lg font-semibold">{t.contact.basedValue}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm text-muted">{t.contact.hours}</dt>
            <dd className="text-lg font-semibold">{t.contact.hoursValue}</dd>
          </div>
        </dl>

        <form data-reveal ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
          {field("name", f.name, { autoComplete: "given-name" })}
          {field("name2", f.lastName, { autoComplete: "family-name" })}
          {field("email", f.email, { type: "email", autoComplete: "email", inputMode: "email" })}
          {field("phone", f.phone, { type: "tel", autoComplete: "tel", inputMode: "tel" })}

          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="c-message" className="text-sm font-semibold text-ink">
              {f.message}
            </label>
            <textarea
              id="c-message"
              name="message"
              rows={5}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "c-message-err" : undefined}
              className={`${inputClass} resize-y`}
            />
            {errors.message && (
              <p id="c-message-err" className="text-sm font-medium text-red-600 dark:text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="toon-btn inline-flex h-12 items-center justify-center whitespace-nowrap bg-accent px-7 text-base font-bold text-on-accent disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? f.sending : f.send}
            </button>
            <p role="status" aria-live="polite" className="flex items-center gap-2 text-sm font-medium">
              {status === "success" && (
                <>
                  <CheckCircle size={20} weight="fill" className="text-accent-text" aria-hidden="true" />
                  <span>{f.success}</span>
                </>
              )}
              {status === "error" && (
                <>
                  <WarningCircle size={20} weight="fill" className="text-red-600 dark:text-red-400" aria-hidden="true" />
                  <span>{f.error}</span>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
