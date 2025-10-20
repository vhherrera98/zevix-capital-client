"use server";
import * as z from 'zod';
import { LoginSchema } from '@/app/(public)/auth/_schemas';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function login(credentials: z.infer<typeof LoginSchema>) {
  try {

    const validatedFields = LoginSchema.safeParse(credentials);
    if (!validatedFields.success) throw new Error("Invalid data@")
    const { email, password } = validatedFields.data;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return { status: result.error };
    }

    return { status: "success" };

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: {
              en: "Invalid credentials!",
              es: "Credenciales Invalidas!"
            }
          };
        default:
          return {
            status: {
              en: "Something wen wrong!",
              es: "Ha sucedido un error!"
            }
          };
      }
    }
  }
}