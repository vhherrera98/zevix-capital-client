export type Notification = {
  id: number;
  titulo: string;
  descripcion: string;
  createdat: string; // ISO string
  creador: string;
  view?: boolean;
}

export type Notificacion = {
  id: number;
  titulo: string;
  descripcion: string;
  createdat: string;
  estado_id: number;
  persona_id: number;
}