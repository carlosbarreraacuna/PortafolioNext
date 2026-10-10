"use client";

import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import { useI18n } from "./I18nProvider";
import { CONTACT } from "@/content/translations";

const SOCIAL = [
  { label: "LinkedIn", href: CONTACT.linkedin, Icon: LinkedinLogo },
  { label: "GitHub", href: CONTACT.github, Icon: GithubLogo },
  { label: "Instagram", href: CONTACT.instagram, Icon: InstagramLogo },
];

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t-2 border-outline px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="text-sm text-muted">{t.contact.copyright}</p>
        <ul className="flex items-center gap-3">
          {SOCIAL.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="toon-btn grid size-11 place-items-center bg-surface text-ink"
              >
                <Icon size={22} weight="regular" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
