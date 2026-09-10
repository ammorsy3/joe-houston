/** Small shared helpers. Kept dependency-free on purpose. */

type ClassValue = string | number | null | undefined | false | ClassValue[];

/**
 * Class merge helper. Flattens nested arrays, drops falsy values and
 * collapses whitespace so conditional classes stay readable at the call site.
 *
 *   cn("px-4", isActive && "text-ink", ["rounded", null])
 */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];

  for (const value of values) {
    if (!value && value !== 0) continue;
    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }

  return out.join(" ").replace(/\s+/g, " ").trim();
}

/** Strips everything but digits, and drops a leading US country code. */
export function phoneDigits(input: string): string {
  const digits = input.replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
}

/**
 * Formats a US phone number for display, formatting progressively so it can
 * also be used to mask an input as someone types.
 *
 *   formatPhone("7135550142") -> "(713) 555-0142"
 *   formatPhone("71355")      -> "(713) 55"
 */
export function formatPhone(input: string): string {
  const d = phoneDigits(input).slice(0, 10);
  if (d.length === 0) return "";
  if (d.length < 4) return `(${d}`;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** Builds a `tel:` href from any loosely formatted number. */
export function telHref(input: string): string {
  return `tel:+1${phoneDigits(input)}`;
}

/**
 * The soonest realistic closing date, as a seller would say it out loud.
 * Anchored to Central time because the market is Austin, so the date does not
 * flip a day early for a server running in UTC.
 *
 *   closingDate(14) -> "Wednesday, September 24"
 */
export function closingDate(daysOut: number, now: Date = new Date()): string {
  const target = new Date(now.getTime() + daysOut * 24 * 60 * 60 * 1000);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(target);
}
