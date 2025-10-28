import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';
import { getSession } from "next-auth/react";

export const mainApiSlice = createApi({
  reducerPath: "mainApiSlice",
  tagTypes: [
    "me",
    "AUTO_REFRESH",
    "notifications",
    "bank_accounts",
    "accounts_types",
    "currencies_types",
    "partners",
    "clients",
    "documents_types",
    "documents_personal",
    "documents_beneficiary",
    "beneficiaries",
    "genders",
    "documents_requests",
    "vouchers",
    "states",
    "countries",
    "departments",
    "cities",
    "marital_status",
    "person",
    "user",
    "continentes",
    "kyc",
    "kyc-persona"
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_PATHNAME,
    prepareHeaders: async (headers) => {

      const session = await getSession();

      if (session?.accessToken) {
        const { accessToken } = session;
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      const lang = Cookies.get('lang');
      if (lang) {
        headers.set("x-user-lang", lang);
      } else {
        headers.set("x-user-lang", "en");
      }
      const personaId = Cookies.get('x-user-id');

      if (personaId) {
        headers.set("x-user-id", personaId)
      };
      return headers;
    },
    credentials: "include"
  }),
  // ⚙️ Comportamiento global por defecto
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({})
});