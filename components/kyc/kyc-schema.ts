import { z } from "zod";

export const fuenteFondosEnum = z.enum([
 "Salario",
 "Ahorro Personales",
 "Venta de Bienes",
 "Ingresos de Empresa Propia",
 "Inversions Anteriores",
 "Herencia",
 "Otro", // se incluye "Otro" como opción
]);

export const tipoDocumentosEnum = z.enum([
 'Carnet de Identidad',
 'Licencia de Conducir',
 'Pasaporte'
]);

export const IngresoMensualEnum = z.enum([
 "Menos de $1000",
 "$1000 - $5000",
 "$5000 - $10000",
 "Más de $10000"
]);

export const PatrimonioAproximadoEnum = z.enum([
 "Menos de $10000",
 "$10000 - $50000",
 "$50000 - $250000",
 "Más de $250000"
]);

export const YesNoEnum = z.enum(["Sí", "No"]);

export const KYCSchema = z.object({
 // DATOS PERSONALES
 nombre_completo: z.string().nonempty(),
 nacionalidad: z.string().nonempty(),
 fecha_nacimiento: z.date(),
 tipo_documento_identidad: tipoDocumentosEnum,
 numero_documento: z.string().nonempty(),
 documento_identidad: z.any()
  .refine((files) => {
   return (files instanceof FileList && files.length > 0) || (Array.isArray(files) && files.length > 0);
  }, {
   message: "required"
  }),
 selfie_documento: z.any()
  .refine((files) => {
   return (files instanceof FileList && files.length > 0) || (Array.isArray(files) && files.length > 0);
  }, {
   message: "required"
  }),
 // DOMICILIO
 direccion_completa_residencia: z.string().nonempty(),
 comprobante_domicilio: z.any()
  .refine((files) => {
   return (files instanceof FileList && files.length > 0) || (Array.isArray(files) && files.length > 0);
  }, {
   message: "required"
  }),
 // INFORMACION FISCAL
 residente: YesNoEnum,
 residente_documento: z.any()
  .refine((files) => {
   return (files instanceof FileList && files.length > 0) || (Array.isArray(files) && files.length > 0);
  }, {
   message: "required"
  }),
 // INFORMACION ECONOMICA
 fuente_fondos: z.array(fuenteFondosEnum).nonempty(),
 fuente_fondos_otros: z.string().optional(),
 ingreso_mensual: IngresoMensualEnum,
 patrimonio_aprox: PatrimonioAproximadoEnum,
 nombre_pais_banco: z.string().nonempty(),
 // DECLARACIONES LEGALES
 actividades_ilicitas: YesNoEnum,
 actividades_ilicitas_si: z.string().optional(),
 declaracion_jurada_origen_fondos: z.string().nonempty(),
 // ACEPTACION Y FIRMA
 nombre_completo_firmante: z.string().nonempty(),
 fecha_llenado_formulario: z.date(),
 firma_electronica: z.string() // upload
});

export type KYCSchemaType = z.infer<typeof KYCSchema>;