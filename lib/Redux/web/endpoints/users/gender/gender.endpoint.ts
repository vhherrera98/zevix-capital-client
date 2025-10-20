import { ApiResponse, Option } from "@/types/api-response.type";
import { mainApiSlice } from "../../../api-slice";
import { Genero } from "@/types/genero.type";

export const genderEndpoint = mainApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllGendersRaw: build.query<ApiResponse<Genero[]>, void>({
      query: () => ({
        url: "/users/genero",
        method: "GET"
      }),
      providesTags: ["genders"],
    }),
    // Transformado a formato { label, value }
    getAllGenders: build.query<Option[], void>({
      query: () => ({
        url: "/users/genero",
        method: "GET"
      }),
      transformResponse: (response: ApiResponse<Genero[]>) => {
        return response.data.map((gender) => ({
          label: gender.nombre,
          value: gender.id,
        }));
      },
      providesTags: ["genders"],
    }),
  })
});

export const {
  useGetAllGendersRawQuery,
  useGetAllGendersQuery
} = genderEndpoint;