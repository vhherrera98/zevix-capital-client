import { z } from "zod";

// Función para validar el formato de fecha dd/mm/yyyy
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[0-2])[\/](\d{4})$/;

// Función para convertir "dd/mm/yyyy" a objeto Date
const parseDate = (str: string) => {
  const [day, month, year] = str.split("/").map(Number);
  return new Date(year, month - 1, day);
};

export const DocumentSchema = z.object({
  numero_identificacion: z
    .number({ invalid_type_error: "number" })
    .positive({ message: "required" }),

  fecha_emision: z
    .string()
    .regex(dateRegex, { message: "date_es" }),

  fecha_expiracion: z
    .string()
    .regex(dateRegex, { message: "date_es" }),

  tipo_documento: z.enum(["CI", "PASS"], {
    required_error: "required",
    invalid_type_error: "invalid_type",
  }),

  documento: z
    .any()
    .refine((files) => {
      return (files instanceof FileList && files.length > 0) ||
        (Array.isArray(files) && files.length > 0);
    }, {
      message: "required",
    })
}).refine((data) => {
  const emision = parseDate(data.fecha_emision);
  const now = new Date();

  return emision <= now;
}, {
  path: ["fecha_emision"],
  message: "form_fecha_emision_mayor_actual",
}).refine((data) => {
  const emision = parseDate(data.fecha_emision);
  const expiracion = parseDate(data.fecha_expiracion);

  return expiracion >= emision;
}, {
  path: ["fecha_expiracion"],
  message: "form_fecha_expiracion_menor_emision",
});


export type CreateDocument = z.infer<typeof DocumentSchema>;