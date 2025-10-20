export type Pais = {
  id: number;
  nombre: string;
  nombre_orig: string;
  prefijo: string;
  codigo_pais: string;
  area?: number;
  poblacion?: number;
  doc_fiscal: string;
};

export type Departamento = {
  id: number;
  nombre: string;
  pais_id: number;
  prefijo?: string;
  abrevi?: string;
};

export type Ciudad = {
  id: number;
  nombre: string;
  pais_id: number;
  dpto_id?: number;
  poblacion?: number | null;
  latitud?: number | null;
  longitud?: number | null;
  prefijo?: string;
  abrevi?: string;
};
