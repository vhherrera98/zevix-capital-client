import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";

export type Continente = {
  id: number;
  nombre: string;       // Ej: "Europa"
  codigo_2: string;      // Ej: "EU"
  codigo_3: string;      // Ej: "EUR"
};

export const continentesEndpoints = mainApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllContinents: build.query<Continente[], void>({
      query: () => ({
        url: "/locations/continentes",
        method: "GET"
      }),
      transformResponse: (response: ApiResponse<Continente[]>) => response.data,
      providesTags: ["continentes"]
    }),
    findOneContinentByCode: build.query<Continente, string>({
      query: (code) => ({
        url: "/locations/continentes/" + code,
        method: "GET"
      }),
      transformResponse: (response: ApiResponse<Continente>) => response.data,
      providesTags: ["continentes"]
    }),
  })
});

export const {
  useGetAllContinentsQuery,
  useFindOneContinentByCodeQuery
} = continentesEndpoints;