import { z } from "zod";

export const usuarioSchema = z.object({
  nombres: z.string()
    .min(3, { message: "min_3" })
    .nonempty({ message: "required" }),

  apellido_paterno: z.string()
    .min(3, { message: "min_3" })
    .nonempty({ message: "required" }),

  apellido_materno: z.string()
    .min(3, { message: "min_3" })
    .nonempty({ message: "required" }),

  email: z.string()
    .email({ message: "mail" })
    .nonempty({ message: "required" }),

  fecha_creacion: z.date().optional(),
});

export type usuarioSchemaType = z.infer<typeof usuarioSchema>;