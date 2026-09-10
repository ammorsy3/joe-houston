"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";

import { siteConfig } from "@/app/lib/site-config";
import { cn, formatPhone, telHref } from "@/app/lib/utils";
import {
  EMPTY_LEAD_FORM,
  PROPERTY_TYPES,
  SITUATIONS,
  validateLead,
  type LeadFieldErrors,
  type LeadFormState,
} from "@/app/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "w-full rounded-sm border bg-paper px-4 py-3 text-[0.9375rem] text-ink transition-colors placeholder:text-body/70";

export function LeadForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<LeadFormState>(EMPTY_LEAD_FORM);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const fieldId = (name: keyof LeadFormState) => `${uid}-${name}`;
  const errorId = (name: keyof LeadFormState) => `${uid}-${name}-error`;

  function update<K extends keyof LeadFormState>(name: K, value: LeadFormState[K]) {
    setValues((current) => ({ ...current, [name]: value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function focusFirstError(fieldErrors: LeadFieldErrors) {
    const first = Object.keys(fieldErrors)[0];
    if (!first) return;
    formRef.current
      ?.querySelector<HTMLElement>(`[name="${first}"]`)
      ?.focus({ preventScroll: false });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const result = validateLead(values);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("idle");
      focusFirstError(result.errors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const payload: { ok?: boolean; errors?: LeadFieldErrors } = await response
        .json()
        .catch(() => ({}));

      if (response.ok && payload.ok) {
        setStatus("success");
        return;
      }

      // The server re-validated and disagreed — surface its field errors.
      if (payload.errors && Object.keys(payload.errors).length > 0) {
        setErrors(payload.errors);
        setStatus("idle");
        focusFirstError(payload.errors);
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-card border border-hairline bg-paper p-8 shadow-panel sm:p-10"
        role="status"
      >
        <span
          aria-hidden="true"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-terracotta"
        >
          <svg
      aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 text-terracotta"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12.5 4.5 4.5L19 7" />
          </svg>
        </span>

        <h3 className="display-sm mt-6 text-[1.625rem] text-ink">
          Got it. We&rsquo;ll call you within 24 hours.
        </h3>

        <p className="mt-4 text-[0.9375rem] leading-[1.75] text-body">
          Your property is with us now. We&rsquo;ll review the address, pull the
          comparable sales, and call you with a straightforward cash number. No
          obligation, and no pressure if the timing isn&rsquo;t right.
        </p>

        <p className="mt-6 text-[0.9375rem] text-body">
          Need to talk sooner?{" "}
          <a
            href={telHref(siteConfig.phone.raw)}
            className="font-medium text-ink underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold-deep"
          >
            Call {siteConfig.phone.display}
          </a>
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <div className="rounded-card border border-hairline bg-paper shadow-panel">
      <div aria-hidden="true" className="gilded h-1.5" />
      <div className="p-6 sm:p-8">
      <h2 className="display-sm text-[1.625rem] text-ink">Get a cash offer</h2>
      <p className="mt-2 text-[0.9375rem] text-body">
        Tell us where the property is. We&rsquo;ll do the rest.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
        <Field
          label="Property address"
          id={fieldId("address")}
          error={errors.address}
          errorId={errorId("address")}
        >
          <input
            id={fieldId("address")}
            name="address"
            type="text"
            autoComplete="street-address"
            placeholder="123 Main St, City, ST"
            value={values.address}
            onChange={(event) => update("address", event.target.value)}
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? errorId("address") : undefined}
            className={cn(fieldBase, errors.address ? "border-ink" : "border-hairline")}
          />
        </Field>

        <Field
          label="Full name"
          id={fieldId("name")}
          error={errors.name}
          errorId={errorId("name")}
        >
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId("name") : undefined}
            className={cn(fieldBase, errors.name ? "border-ink" : "border-hairline")}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Phone"
            id={fieldId("phone")}
            error={errors.phone}
            errorId={errorId("phone")}
          >
            <input
              id={fieldId("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(555) 000-0000"
              value={values.phone}
              onChange={(event) => update("phone", formatPhone(event.target.value))}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? errorId("phone") : undefined}
              className={cn(fieldBase, errors.phone ? "border-ink" : "border-hairline")}
            />
          </Field>

          <Field
            label="Email"
            id={fieldId("email")}
            error={errors.email}
            errorId={errorId("email")}
          >
            <input
              id={fieldId("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? errorId("email") : undefined}
              className={cn(fieldBase, errors.email ? "border-ink" : "border-hairline")}
            />
          </Field>
        </div>

        <Field
          label="Property type"
          id={fieldId("propertyType")}
          error={errors.propertyType}
          errorId={errorId("propertyType")}
        >
          <SelectShell>
            <select
              id={fieldId("propertyType")}
              name="propertyType"
              value={values.propertyType}
              onChange={(event) => update("propertyType", event.target.value)}
              aria-invalid={Boolean(errors.propertyType)}
              aria-describedby={
                errors.propertyType ? errorId("propertyType") : undefined
              }
              className={cn(
                fieldBase,
                "appearance-none pr-11",
                errors.propertyType ? "border-ink" : "border-hairline",
                values.propertyType === "" && "text-body",
              )}
            >
              <option value="">Select a property type</option>
              {PROPERTY_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </SelectShell>
        </Field>

        <Field
          label={<>What&rsquo;s going on with the property?</>}
          id={fieldId("situation")}
          error={errors.situation}
          errorId={errorId("situation")}
        >
          <SelectShell>
            <select
              id={fieldId("situation")}
              name="situation"
              value={values.situation}
              onChange={(event) => update("situation", event.target.value)}
              aria-invalid={Boolean(errors.situation)}
              aria-describedby={errors.situation ? errorId("situation") : undefined}
              className={cn(
                fieldBase,
                "appearance-none pr-11",
                errors.situation ? "border-ink" : "border-hairline",
                values.situation === "" && "text-body",
              )}
            >
              <option value="">Select a situation</option>
              {SITUATIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </SelectShell>
        </Field>

        {/* Honeypot. Off-screen rather than display:none, which bots skip. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor={fieldId("website")}>Website</label>
          <input
            id={fieldId("website")}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </div>

        <div className="pt-1">
          <label
            htmlFor={fieldId("consent")}
            className="flex cursor-pointer items-start gap-3"
          >
            <input
              id={fieldId("consent")}
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(event) => update("consent", event.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? errorId("consent") : undefined}
              className={cn(
                "mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 rounded-[4px] border accent-ink",
                errors.consent ? "border-ink" : "border-hairline",
              )}
            />
            <span className="text-[0.8125rem] leading-[1.6] text-body">
              I agree to be contacted by {siteConfig.company.name} by phone, text
              and email about this property. Consent is not a condition of any
              sale. See our{" "}
              <Link
                href="/privacy"
                className="text-ink underline decoration-hairline underline-offset-2 transition-colors hover:decoration-gold"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.consent ? (
            <FieldError id={errorId("consent")} className="mt-2 pl-[1.875rem]">
              {errors.consent}
            </FieldError>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-sm bg-ink px-7 py-4 text-[0.9375rem] font-medium text-paper transition-[color,background-color,box-shadow] hover:bg-gold hover:text-ink hover:shadow-[0_8px_28px_color-mix(in_srgb,var(--color-gold)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Spinner />
              Sending&hellip;
            </>
          ) : (
            "Get My Cash Offer"
          )}
        </button>

        <div aria-live="polite">
          {status === "error" ? (
            <p className="rounded-sm border border-ink/25 bg-limestone px-4 py-3 text-[0.8125rem] leading-[1.6] text-ink">
              Something went wrong sending that. Please try again — or call us
              directly at{" "}
              <a
                href={telHref(siteConfig.phone.raw)}
                className="font-medium underline decoration-gold decoration-2 underline-offset-4"
              >
                {siteConfig.phone.display}
              </a>{" "}
              and we&rsquo;ll take the details over the phone.
            </p>
          ) : null}
        </div>

        <p className="text-center text-[0.75rem] leading-[1.6] text-body">
          No obligation. No fees. We respond within 24 hours.
        </p>
      </form>
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  error,
  errorId,
  children,
}: {
  label: ReactNode;
  id: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.8125rem] font-medium text-ink"
      >
        {label}
      </label>
      {children}
      {error ? (
        <FieldError id={errorId} className="mt-2">
          {error}
        </FieldError>
      ) : null}
    </div>
  );
}

function FieldError({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      id={id}
      className={cn(
        "flex items-start gap-1.5 text-[0.8125rem] leading-[1.5] font-medium text-ink",
        className,
      )}
    >
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="mt-[0.1875rem] h-3.5 w-3.5 shrink-0 text-terracotta"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <circle cx="8" cy="8" r="6.25" />
        <path d="M8 5v3.5M8 11h.01" />
      </svg>
      {children}
    </p>
  );
}

function SelectShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-body"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m4 6 4 4 4-4" />
      </svg>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="9" className="opacity-30" />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </svg>
  );
}
