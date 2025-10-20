import { z } from "zod";

export const notificationSchema = z.object({
  titulo_en: z.string({message: "required"}).nonempty({message: "empty"}).min(5, {message: "min"}),
  titulo_es: z.string({message: "required"}).nonempty({message: "empty"}),
  descripcion_en: z.string({message: "required"}).nonempty({message: "empty"}),
  descripcion_es: z.string({message: "required"}).nonempty({message: "empty"}),
  personas: z.array(z.number()).nonempty({message: "array_min"})
});

export type notificationSchemaType = z.infer<typeof notificationSchema>;

