import { z } from 'zod/v3';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'validation_email'
  }),
  password: z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{6,}$/, "validation_password_regex")
    .min(8, "validation_password_min")
})

export const RegisterSchema = z.object({
  name: z.string()
    .min(5, "El campo requiere al menos 5 carácteres")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/, "Solo se permiten carácteres de tipo letra")
    .nonempty({
      message: 'El nombre es requerido'
    }),
  email: z.string().email({
    message: 'Ingrese un correo electrónico válido'
  }),
  password: z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{6,}$/, "La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número")
    .min(8, "La contraseña debe tener mínimo 8 carácteres"),
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, "La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número"),
  newPassword: z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{6,}$/, "La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número")
    .min(8, "La nueva contraseña debe tener mínimo 8 carácteres"),
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, "La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número"),
  confirmNewPassword: z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{6,}$/, "La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número")
    .min(8, "La nueva contraseña debe tener mínimo 8 carácteres")

  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, "La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número"),
})
  .refine(data => data.password !== data.newPassword, {
    message: "Las contraseña actual es igual a la nueva contraseña",
    path: ['newPassword']
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Las contraseñas no coinciden",
    path: ['confirmNewPassword']
  })