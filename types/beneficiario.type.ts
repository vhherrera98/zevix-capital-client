import { Documento } from "./documents.type";
import { Genero } from "./genero.type";

export type Beneficiario = {
  id: number;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string; // o Date si ya está parseado
  persona_id: number;
  pasaporte_id: number | null;
  dni_id: number | null;
  principal: boolean;
  genero: Genero;
  documento: Documento[];
};