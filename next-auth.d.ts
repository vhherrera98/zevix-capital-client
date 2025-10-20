/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
/// <reference types="next-auth" />

declare module "next-auth" {
  interface Session {
    accessToken?: any; // puedes tipar mejor si deseas
    user: {
      id: number
      name: string
      email: string
      firstSession: boolean
      role: string
      verified: boolean
      principal: boolean
      personaId: number;
      kyc: boolean;
    }
  }

  interface User {
    id: number
    nombre: string
    email: string
    firstSession: boolean
    rol: { nombre: string }
    persona: {
      id: number
      verificado: boolean
      principal: boolean
    };
    kyc: boolean;
  }
}


// export enum ERoles {
//   socio = 'Socio',
//   cliente = "Cliente"
// };

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       name?: string;
//       accessToken?: string
//       image: string;
//       first_session?: boolean; // Nueva propiedad
//       role: ERoles;
//       verificado: boolean;
//       principal: boolean;
//       personaId: string;
//     };
//   }

//   interface User {
//     id: string;
//     email: string;
//     name?: string;
//     nombre?: string;
//     image?: string;
//     firstSession?: boolean; // Nueva propiedad
//     rol: {
//       id: number;
//       nombre: ERoles
//     };
//     persona: {
//       verificado: boolean;
//       principal: boolean;
//       id: number;
//     };
//     verificado: boolean;
//     principal: boolean;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     email: string;
//     role: string;
//     first_session?: boolean; // Nueva propiedad
//     accessToken?: string
//     role: 'Socio' | 'Cliente';
//     verificado: boolean;
//     principal: boolean;
//     personaId: "";
//     // permissions: string[];
//     // isPremium: boolean;
//   }
// }