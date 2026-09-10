import { z } from "zod";
import { phoneDigits } from "./utils";

/** Select options — shared by the form markup and the schema, so they cannot drift. */
export const PROPERTY_TYPES = [
  "Single family",
  "Duplex / Triplex",
  "Fourplex",
  "5+ units",
  "Land",
  "Other",
] as const;

export const SITUATIONS = [
  "Foreclosure",
  "Inherited or probate",
  "Tired landlord",
  "Needs major repairs",
  "Relocating",
  "Divorce or life change",
  "Vacant",
  "Other",
] as const;

/**
 * The one lead schema. The form validates against it on the client for inline
 * errors, and `app/api/lead/route.ts` validates against it again on the server —
 * client-side validation is a convenience, never a trust boundary.
 *
 * `website` is a honeypot: hidden from people, irresistible to bots. The schema
 * deliberately does NOT reject a filled value — that would come back as a field
 * error naming the trap. The route handler checks it and returns a bare failure.
 */
export const leadSchema = z.object({
  address: z
    .string()
    .trim()
    .min(5, { error: "Enter the property address." })
    .max(200, { error: "That address is too long." }),
  name: z
    .string()
    .trim()
    .min(2, { error: "Enter your full name." })
    .max(100, { error: "That name is too long." }),
  phone: z
    .string()
    .trim()
    .refine((value) => phoneDigits(value).length === 10, {
      error: "Enter a 10-digit phone number.",
    }),
  email: z
    .email({ error: "Enter a valid email address." })
    .max(150, { error: "That email address is too long." }),
  propertyType: z.enum(PROPERTY_TYPES, { error: "Select a property type." }),
  situation: z.enum(SITUATIONS, { error: "Select the situation that fits best." }),
  consent: z.literal(true, {
    error: "Please agree to be contacted so we can reach you about the property.",
  }),
  website: z.string().max(200).optional(),
});

export type Lead = z.output<typeof leadSchema>;

/**
 * What the form actually holds while someone is typing: every control is a
 * string or a boolean, and nothing is narrowed until the schema has run.
 */
export type LeadFormState = {
  address: string;
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  situation: string;
  consent: boolean;
  website: string;
};

export const EMPTY_LEAD_FORM: LeadFormState = {
  address: "",
  name: "",
  phone: "",
  email: "",
  propertyType: "",
  situation: "",
  consent: false,
  website: "",
};

/** One message per field — the shape both the form and the API response speak. */
export type LeadFieldErrors = Partial<Record<keyof LeadFormState, string>>;

export type LeadValidation =
  | { ok: true; data: Lead }
  | { ok: false; errors: LeadFieldErrors };

/** Runs the schema and flattens zod's output down to a single message per field. */
export function validateLead(input: unknown): LeadValidation {
  const result = leadSchema.safeParse(input);
  if (result.success) return { ok: true, data: result.data };

  const { fieldErrors } = z.flattenError(result.error);
  const errors: LeadFieldErrors = {};

  for (const [field, messages] of Object.entries(fieldErrors)) {
    if (messages && messages.length > 0) {
      errors[field as keyof LeadFormState] = messages[0];
    }
  }

  return { ok: false, errors };
}
