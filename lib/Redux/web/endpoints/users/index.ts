import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";
import { UpdatePersona } from "@/components/forms/users/account-schema";
import { Persona } from "@/types/usuario.type";

export const personEndpoints = mainApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPerson: build.query<Persona, void>({
      query: () => ({
        url: "/users/persona",
        method: "GET"
      }),
      transformResponse: (response: ApiResponse<Persona>) => response.data,
      providesTags: ["person"]
    }),
    updatePerson: build.mutation<ApiResponse<Persona>, UpdatePersona>({
      query: (data) => ({
        url: "/users/persona",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["person"]
    })
  })
});

export const {
  useUpdatePersonMutation,
  useGetPersonQuery
} = personEndpoints;