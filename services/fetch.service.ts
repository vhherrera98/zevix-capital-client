"use server";

import { auth } from "@/auth";

export async function swr<T>(url: string): Promise<T> {
  try {

    const session = await auth();

    const response = await fetch(process.env.NEXT_PUBLIC_SERVER_PATHNAME + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": `${session?.user.id}`,
        "x-app-version": "1.0.0"
      }
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error("=> " + result.message || "ERROR AL REALIZAR LA PETICION HTTPS")
    }

    const result = await response.json();
    return result.data;

  } catch (error) {
    throw new Error(`${error}`);
  }
}