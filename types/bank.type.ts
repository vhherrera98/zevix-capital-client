export type CuentaBanco = {
  id: number;
  titular: string;
  banco_nombre: string;
  number_cuenta: string;
  created_at: string; // o Date si lo manejas como objeto Date
  updated_at: string; // o Date
  saldo_actual: string; // o number si lo parseas
  tipo_cuenta: TipoCuenta;
  moneda: Moneda;
};

export type TipoCuenta = {
  id: number;
  nombre: string;
  codigo: string;
}

export type Moneda = {
  id: number;
  nombre: string;
  abrev: string;
  tp_cambio: string; // o number si lo parseas
  operati: boolean;
  crypto: boolean;
}