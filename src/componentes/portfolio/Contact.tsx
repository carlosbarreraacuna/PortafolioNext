"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle, GithubLogo, LinkedinLogo, WarningCircle } from "@phosphor-icons/react";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";
import { revealSection } from "@/lib/motion";
import { useI18n } from "./I18nProvider";
import { Head } from "./Section";
import { CONTACT } from "@/content/translations";

type Field = "name" | "name2" | "email" | "phone" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const [EMAIL_USER, EMAIL_HOST] = CONTACT.email.split("@");

// Campos sobre el naranja: fondo casi blanco, sin borde, foco en tinta para que se vea sobre el acento.
const inputClass =
  "w-full bg-[#fff6f1] px-4 py-3 text-body text-[#0b1222] placeholder:text-[#0b1222]/50 focus-visible:outline-[#0b1222] aria-[invalid=true]:outline aria-[invalid=true]:outline-2 aria-[invalid=true]:outline-[#7a1500]";

/**
 * Contacto sobre el campo de acento: el correo como texto de cartel (es el enlace principal), la escena 3D
 * saludando con los datos directos debajo, y el formulario de siempre al lado.
 */
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
      mm.add(CON_MOVIMIENTO, () => {
        revealSection(root.current!);
        // La foto sube un poco mas lento que la pagina: separa la escena del formulario.
        gsap.fromTo(".contact-photo img", { yPercent: -6, scale: 1.12 }, {
          yPercent: 6,
          scale: 1.12,
          ease: "none",
          scrollTrigger: { trigger: ".contact-photo", start: "top bottom", end: "bottom top", scrub: true },
        });
      });
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

  const error = (name: Field) =>
    errors[name] && (
      <p id={`c-${name}-err`} className="text-small font-semibold">
        {errors[name]}
      </p>
    );

  const field = (name: Field, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={`c-${name}`} className="text-small font-semibold">
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
      {error(name)}
    </div>
  );

  return (
    <section id="contact" ref={root} className="scroll-mt-16 bg-accent px-5 py-24 text-on-accent md:px-8 md:py-32">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <Head lines={[t.contact.head]} className="text-heading" />
        <p data-reveal className="max-w-[30ch] text-lead">
          {t.contact.lead}
        </p>
      </div>

      <a
        data-reveal
        href={`mailto:${CONTACT.email}`}
        className="group mt-14 flex items-end gap-4 font-display text-[clamp(2.4rem,6.6vw,8rem)] leading-[0.95] transition-colors duration-300 hover:text-white md:mt-20"
      >
        <span className="min-w-0">
          <span className="block lg:inline">{EMAIL_USER}@</span>
          <span className="block lg:inline">{EMAIL_HOST}</span>
        </span>
        <ArrowUpRight
          weight="bold"
          aria-hidden="true"
          className="mb-[0.12em] size-[0.6em] shrink-0 transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2"
        />
      </a>

      <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12 lg:gap-10">
        <div data-reveal className="flex flex-col gap-8 lg:col-span-5">
          <div className="contact-photo aspect-[4/5] overflow-clip bg-field">
            <Image
              src="/scenes/wave.webp"
              alt={t.pictures.wave.alt}
              width={1100}
              height={1366}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="size-full object-cover"
            />
          </div>
          <dl className="grid gap-5 text-body sm:grid-cols-2">
            <div>
              <dt className="text-small">{t.contact.phone}</dt>
              <dd>
                <a href={CONTACT.phoneHref} className="link-draw font-semibold">
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-small">{t.contact.hoursValue}</dt>
              <dd className="font-semibold">{t.contact.basedValue}</dd>
            </div>
          </dl>
          <ul className="flex gap-6 text-body font-semibold">
            <li>
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer noopener" className="link-draw inline-flex items-center gap-2">
                <LinkedinLogo size={22} aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={CONTACT.github} target="_blank" rel="noreferrer noopener" className="link-draw inline-flex items-center gap-2">
                <GithubLogo size={22} aria-hidden="true" /> GitHub
              </a>
            </li>
          </ul>
        </div>

        <div data-reveal className="lg:col-span-7">
          <h3 className="text-lead font-semibold">{t.contact.formHead}</h3>
          <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
            {field("name", f.name, { autoComplete: "given-name" })}
            {field("name2", f.lastName, { autoComplete: "family-name" })}
            {field("email", f.email, { type: "email", autoComplete: "email", inputMode: "email" })}
            {field("phone", f.phone, { type: "tel", autoComplete: "tel", inputMode: "tel" })}

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="c-message" className="text-small font-semibold">
                {f.message}
              </label>
              <textarea
                id="c-message"
                name="message"
                rows={6}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "c-message-err" : undefined}
                className={`${inputClass} resize-y`}
              />
              {error("message")}
            </div>

            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
              <button type="submit" disabled={status === "sending"} className="btn bg-field text-field-ink hover:bg-field-2">
                {status === "sending" ? f.sending : f.send}
              </button>
              <p role="status" aria-live="polite" className="flex items-center gap-2 text-body font-semibold">
                {status === "success" && (
                  <>
                    <CheckCircle size={22} weight="fill" aria-hidden="true" />
                    <span>{f.success}</span>
                  </>
                )}
                {status === "error" && (
                  <>
                    <WarningCircle size={22} weight="fill" aria-hidden="true" />
                    <span>{f.error}</span>
                  </>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
