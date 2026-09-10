import type { NextRequest } from "next/server";

import { validateLead } from "@/app/lib/validation";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: "Expected a JSON body." },
      { status: 400 },
    );
  }

  const result = validateLead(body);

  if (!result.ok) {
    // Client-side validation already ran; anything landing here is either a
    // stale client or something poking the endpoint directly.
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const lead = result.data;

  // Honeypot. A person never sees this field, so a value in it is a bot.
  // Rejected with a plain 400 and nothing that hints at why.
  if (lead.website) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const { website: _honeypot, ...payload } = lead;
  const submission = {
    ...payload,
    submittedAt: new Date().toISOString(),
    // Useful for attribution once a CRM is wired up.
    userAgent: request.headers.get("user-agent") ?? null,
    referer: request.headers.get("referer") ?? null,
  };

  console.log("[lead]", submission);

  /* =========================================================================
   * TODO — WIRE UP LEAD DELIVERY
   *
   * Right now this handler only logs. A lead that lands in a server log is a
   * lead nobody calls, so all four of these should be in place before the site
   * takes real traffic. Each is independent — add them in whatever order the
   * client's tooling allows.
   *
   * 1. PERSIST TO SUPABASE
   *    Give the lead a permanent home so nothing is lost between systems.
   *
   *      import { createClient } from "@/app/supabase/server";
   *      const supabase = await createClient();
   *      const { error } = await supabase.from("leads").insert(submission);
   *      if (error) { ...log and keep going — never fail the visitor's request }
   *
   *    See app/supabase/server.ts for the setup steps. Insert with the service
   *    role key from a server-only env var, and keep RLS on for the anon key.
   *
   * 2. CRM WEBHOOK
   *    Push the lead into whatever the client already works out of
   *    (Podio, Follow Up Boss, REsimpli, HubSpot, Zapier, Make).
   *
   *      await fetch(process.env.CRM_WEBHOOK_URL!, {
   *        method: "POST",
   *        headers: { "Content-Type": "application/json" },
   *        body: JSON.stringify(submission),
   *      });
   *
   * 3. EMAIL NOTIFICATION
   *    Internal alert to the acquisitions inbox, plus an optional confirmation
   *    to the seller. Resend, Postmark or SendGrid all work here.
   *
   *      await resend.emails.send({
   *        from: "leads@[DOMAIN]",
   *        to: process.env.LEAD_NOTIFICATION_EMAIL!,
   *        subject: `New lead — ${submission.address}`,
   *        text: JSON.stringify(submission, null, 2),
   *      });
   *
   * 4. INSTANT SMS TRIGGER
   *    Speed to lead decides who buys the house. Text the acquisitions phone
   *    the moment this fires, and optionally auto-text the seller.
   *
   *      await twilio.messages.create({
   *        to: process.env.ACQUISITIONS_PHONE!,
   *        from: process.env.TWILIO_NUMBER!,
   *        body: `New lead: ${submission.name} — ${submission.address}`,
   *      });
   *
   *    NOTE ON CONSENT: the form's consent checkbox is what permits phone,
   *    text and email contact. Store `consent`, `submittedAt` and the visitor's
   *    IP alongside the lead — that record is the proof of consent if a TCPA
   *    complaint ever surfaces. Do not text anyone whose record lacks it.
   *
   * Run these with Promise.allSettled and log failures rather than awaiting
   * them serially — a slow CRM should never turn into a spinner the seller
   * watches, or worse, an error state on a lead you have already captured.
   * ========================================================================= */

  return Response.json({ ok: true });
}
