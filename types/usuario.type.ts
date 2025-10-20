export type Persona = {
  id: number;
  nombres: string;
  apellidos: string;
  fch_nacimi: string;
  verificado: boolean;
  rol: number;
  ciud_nacimi_id: number;
  dpto_nacimi_id: number;
  pais_nacionali_id: number;
  genero_id: number;
  estado_civil_id: number;
  principal: boolean;
};

export type Rol = {
  id: number;
  nombre: string;
  descripcion: string | null;
};

export type Usuario = {
  id: number;
  nombre: string;
  email: string;
  fecha_creacion: string;
  usuarioRol: UsuarioRol;
  persona: Persona;
};

export type UsuarioRol = {
  id: number;
  usuarioId: number;
  rolId: number;
  rol: Rol;
  usuario: Omit<Usuario, 'usuarioRol'> & { persona: Persona };
};

export type Beneficiario = {
  id: number;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string; // o Date si lo parseas
  persona_id: number;
  pasaporte_id: number | null;
  dni_id: number | null;
  principal: boolean;
};

export type EstadoCivil = {
  id: number;
  nombre: string;
};
