import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../../api-slice";
import { Usuario } from "@/types/usuario.type";
import { usuarioSchemaType } from "@/components/forms/users/user-schema";

export const clientsEndpoints = mainApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllClients: build.query<ApiResponse<Usuario[]>, void>({
      query: () => ({
        url: "/users/usuarios/Cliente",
        method: "GET"
      }),
      providesTags: ["clients"]
    }),
    createClient: build.mutation<ApiResponse<string>, usuarioSchemaType>({
      query: (data) => ({
        url: "/users/usuarios/Cliente",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["clients"]
    })
  })
});

export const {
  useGetAllClientsQuery,
  useCreateClientMutation
} = clientsEndpoints;