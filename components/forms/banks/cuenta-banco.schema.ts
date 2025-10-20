import { z } from "zod";

export const CuentaBancoSchema = z.object({
  numero_cuenta: z.number({ message: "number" }).positive({ message: "number" }),
  titular: z.string({ message: "required" }).nonempty({ message: "empty" }),
  banco_nombre: z.string({ message: "required" }).nonempty({ message: "empty" }),
  tipo_cuenta_id: z.number({ message: "required" }).positive({ message: "required" }),
  moneda_id: z.number({ message: "required" }).positive({ message: "required" }),
});

export type CuentaBancoType = z.infer<typeof CuentaBancoSchema>;