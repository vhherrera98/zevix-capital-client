import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../../api-slice";
import { Usuario } from "@/types/usuario.type";
import { usuarioSchemaType } from "@/components/forms/users/user-schema";

export const partnersEndpoints = mainApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllPartners: build.query<ApiResponse<Usuario[]>, void>({
      query: () => ({
        url: "/users/usuarios/Socio",
        method: "GET"
      }),
      providesTags: ["partners"]
    }),
    createPartner: build.mutation<ApiResponse<string>, usuarioSchemaType>({
      query: (data) => ({
        url: "/users/usuarios/Socio",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["partners"]
    })
  })
});

export const {
  useGetAllPartnersQuery,
  useCreatePartnerMutation
} = partnersEndpoints;