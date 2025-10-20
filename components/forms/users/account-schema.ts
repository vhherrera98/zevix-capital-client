import { z } from "zod";

export const updatePersonaSchema = z.object({
  nombres: z.string({ message: "required" })
    .nonempty("empty"),
  apellidos: z.string({ message: "required" })
    .nonempty("empty"),
  fecha_nacimiento: z.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "date_es"),
  genero: z.number().positive("required"),
  estado_civil: z.number().positive("required"),
  pais: z.number().positive("required"),
  departamento: z.number().positive("required"),
  ciudad: z.number().positive("required")
});

export type UpdatePersona = z.infer<typeof updatePersonaSchema>;