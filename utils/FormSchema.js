import { z } from "zod";

// ON/OFF Checkbox
const booleanCheckbox = () =>
  z
    .string()
    // Unchecked checkbox is just missing so it must be optional
    .optional()
    // Transform the value to boolean
    .transform(Boolean);

// Array/Multi checkboxes
const arrayCheckbox = () =>
  z
    .array(z.string().nullish())
    .nullish()
    // Remove all nulls to ensure string[]
    .transform((a) => (a ?? []).flatMap((item) => (item ? item : [])));

const FormSchema = z.object({
  name: z.string().trim().min(1),
  age: z
    .string()
    .regex(/^[0-9]+$/)
    .transform(Number),
  newsletter: z.string().optional().transform(Boolean),
  sport: arrayCheckbox().refine(
    (sports) => {
      return !sports.includes("cricket");
    },
    { message: "Cricket is cool??" }
  ),
  plan: z.enum(["free", "premium"]),
  payment: z.string(),
  terms: booleanCheckbox().refine(
    (val) => {
      return val === true;
    },
    { message: "You must accept the terms" }
  ),
});

export default FormSchema;
