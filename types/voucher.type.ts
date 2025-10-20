import { Moneda } from "./bank.type";
import { Estado } from "./states.type";
import { Persona } from "./usuario.type";

export type Voucher = {
  id: number;
  monto: string; // también podría ser number si lo parseas
  num_transaccion: string;
  fecha_creacion: string; // o Date si haces `new Date(fecha_creacion)`
  fecha_modificacion: string | null; // o Date | null
  public_id: string;
  url: string;
  estado: Estado;
  persona: Persona;
  moneda: Moneda;
  verificacion_previa: boolean;
};
