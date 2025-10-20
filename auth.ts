import NextAuth from "next-auth";
import authConfig from "./auth.config";
import jwt from 'jsonwebtoken';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7, // 7 días (en segundos)
    // secret: process.env.NEXTAUTH_SECRET,
    // encryption: false, // importante para no cifrar el token
  },
  secret: process.env.NEXTAUTH_SECRET,
  ...authConfig,
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {

      // ✅ Al iniciar sesión: guardar datos de tu usuario en el token
      if (user) {
        token.id = user.persona.id;
        token.name = user.nombre;
        token.email = user.email;
        token.firstSession = user.firstSession;
        token.role = user.rol?.nombre;
        token.verified = user.persona?.verificado;
        token.principal = user.persona?.principal;
        token.personaId = user.persona?.id;
        token.kyc = user.kyc;

        const jwtString = jwt.sign(
          {
            id: user.id,
            name: user.nombre,
            email: user.email,
            firstSession: user.firstSession,
            role: user.rol.nombre,
            verified: user.persona.verificado,
            principal: user.persona.principal,
            personaId: user.persona.id,
            kyc: user.kyc,
          },
          process.env.NEXTAUTH_SECRET!,
          { algorithm: 'HS256', expiresIn: '7d' }
        );

        token.jwt = jwtString; // Guarda el string en el token para reusar
      }

      // ✅ Cuando llamas a `update()` en el cliente
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.kyc !== undefined) token.kyc = session.kyc;
        if (session.verified !== undefined) token.verified = session.verified;

        // Si quieres actualizar campos más complejos:
        if (session.user) {
          token.name = session.user.nombre ?? token.name;
          token.verified = session.user.persona?.verificado ?? token.verified;
          token.principal = session.user.persona?.principal ?? token.principal;
          token.kyc = session.user.kyc ?? token.kyc;
        }
      }

      if (trigger === 'update') {
        if (session.name) {
          token.name = session.name;
        }

        if (session.kyc) {
          token.kyc = true;
        }

        if (session.user) {
          console.log("VERIFICADO? => ", session?.user?.persona?.verificado)
          token.verified = session?.user?.persona?.verificado;
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      // console.log(token)
      if (token && session.user) {
        session.user.id = token.id as never;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.firstSession = token.firstSession as boolean;
        session.user.role = token.role as string;
        session.user.verified = token.verified as boolean;
        session.user.principal = token.principal as boolean;
        session.user.personaId = token.personaId as number;
        session.user.kyc = token.kyc as boolean;

        session.accessToken = token.jwt || null;
      }

      return session;
    }
  },
});