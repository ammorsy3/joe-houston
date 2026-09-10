"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { siteConfig } from "@/app/lib/site-config";
import { telHref } from "@/app/lib/utils";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the panel if the viewport grows past the mobile breakpoint while it
  // is open, so the page never keeps a hidden panel mounted at desktop width.
  useEffect(() => {
    if (!open) return;

    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (desktop.matches) setOpen(false);
    };

    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/80 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 md:h-20 lg:px-8"
      >
        <Link
          href="/"
          className="display-sm text-[1.25rem] text-ink md:text-[1.375rem]"
        >
          {siteConfig.company.wordmark.primary}{" "}
          {siteConfig.company.wordmark.accent}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[0.875rem] text-body transition-colors hover:text-gold-deep"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button href={telHref(siteConfig.phone.raw)} size="md" variant="gold">
            <PhoneIcon />
            {siteConfig.phone.display}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-ink md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-hairline bg-paper md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-6 py-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href} className="border-b border-hairline last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-[0.9375rem] text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-6xl px-6 pt-2 pb-6">
            <Button
              href={telHref(siteConfig.phone.raw)}
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              <PhoneIcon />
              Call {siteConfig.phone.display}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M3.5 7.5h17M3.5 12h17M3.5 16.5h17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
