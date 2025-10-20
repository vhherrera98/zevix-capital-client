import { ApiResponse, Option } from "@/types/api-response.type";
import { mainApiSlice } from "../../../api-slice";
import { EstadoCivil } from "@/types/usuario.type";

export const maritalStatusEndpoints = mainApiSlice.injectEndpoints({
 endpoints: (build) => ({
  getAllMaritalStatus: build.query<Option[], void>({
   query: () => ({
    url: "/users/estado_civil",
    method: "GET"
   }),
   transformResponse: (response: ApiResponse<EstadoCivil[]>) => {
    return response.data.map((e) => ({
     label: e.nombre,
     value: e.id,
    }));
   },
   providesTags: ["marital_status"],
  }),
 })
});

export const {
 useGetAllMaritalStatusQuery
} = maritalStatusEndpoints;