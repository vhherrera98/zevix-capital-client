import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./app/(public)/auth/_schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {

        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_PATHNAME}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();
        // console.log(data)
        if (!data) return null;
        // console.log("AUTHORIZE => ", data)
        return data.data;
      }
    })
  ]
} satisfies NextAuthConfig;