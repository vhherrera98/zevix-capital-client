import { z } from "zod";

export const VoucherSchema = z.object({
  numero_transaccion: z.string({ message: "number" }).nonempty({ message: "number" }),

  moneda_id: z.number({ message: "required" }).positive({ message: "required" }),

  monto: z.string({ message: "number" })
    .nonempty({ message: "number" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Monto inválido",
    }),

  documento: z
    .any()
    .refine((files) => {
      return (files instanceof FileList && files.length > 0) ||
        (Array.isArray(files) && files.length > 0);
    }, {
      message: "required",
    })
});

export type CreateVoucherDto = z.infer<typeof VoucherSchema>;