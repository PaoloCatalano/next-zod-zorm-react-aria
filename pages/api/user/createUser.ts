import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
// import FormSchema from "../../../utils/FormSchema";

const FormSchema = z
  .object({
    name: z.string().trim().min(1),
    age: z.number().positive(),
    newsletter: z.boolean(),
    sport: z.array(z.enum(["soccer", "football"])),
    plan: z.enum(["free", "premium"]),
    payment: z.enum(["MasterCard", "Visa", "American Express"]),
    terms: z.literal(true),
  })
  .strict();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await saveData(req.body);
  res.status(200).json(result);
}

async function saveData(
  rawData: any
): Promise<{ success: boolean; errors: any }> {
  try {
    const data = FormSchema.parse(rawData);
    console.log("Saving Data", data);
  } catch (e) {
    if (e instanceof ZodError) {
      console.log("ZodError", e.flatten());
      return { success: false, errors: e.flatten() };
    } else {
      console.log("General Error", e);
      throw e;
    }
  }

  return { success: true, errors: null };
}
