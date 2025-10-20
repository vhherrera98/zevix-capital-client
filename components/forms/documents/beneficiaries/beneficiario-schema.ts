import { z } from "zod";

const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

export const BeneficiarioSchema = z.object({
  nombres: z.string().nonempty({ message: "empty" }),
  apellidos: z.string().nonempty({ message: "empty" }),
  genero: z.number().int().positive({ message: "empty" }),
  fecha_nacimiento: z.string().regex(dateRegex, { message: "date_es" }),
});

export type BeneficiarioType = z.infer<typeof BeneficiarioSchema>;