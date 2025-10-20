import { Beneficiario } from "./beneficiario.type";
import { Persona } from "./usuario.type";

export type TipoDocumento = {
  id: number;
  abrevi: string;
  nombre: string;
};

export type Documento = {
  id: number;
  public_id: string;
  url: string;
  fecha_creacion: string; // o Date, si lo vas a convertir con new Date()
  estado: Estado;
  tipo_documento: TipoDocumento;
  persona: Persona;
  beneficiario: Beneficiario;
  verificacion: {
    persona_id: number | null;
    estado_id: number | null;
  }[];
};

export type Estado = {
  id: number;
  nombre: string;
  descripcion: string;
};
