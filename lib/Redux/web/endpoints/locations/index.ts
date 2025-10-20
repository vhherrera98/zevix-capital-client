import { ApiResponse, Option } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";
import { Ciudad, Departamento, Pais } from "@/types/location.type";

export const locationsEndpoints = mainApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllCountries: build.query<Option[], void>({
      query: () => ({
        url: "/locations/pais",
        method: "GET"
      }),
      transformResponse: (response: ApiResponse<Pais[]>) => {
        return response.data.map((pais) => ({
          label: pais.nombre,
          value: pais.id,
        }));
      },
      providesTags: ["countries"]
    }),
    getDepartmentsByCountry: build.query<Option[], string>({
      query: (countryId) => ({
        url: "/locations/departamento/" + countryId,
        method: "GET"
      }),
      transformResponse: (response: ApiResponse<Departamento[]>) => {
        return response.data.map((departamento) => ({
          label: departamento.nombre,
          value: departamento.id,
        }));
      },
      providesTags: ["departments"]
    }),
    getCitiesByDepartment: build.query<Option[], string>({
      query: (departmentId) => ({
        url: "/locations/ciudad/" + departmentId,
        method: "GET"
      }),
      transformResponse: (response: ApiResponse<Ciudad[]>) => {
        return response.data.map((ciudad) => ({
          label: ciudad.nombre,
          value: ciudad.id,
        }));
      },
      providesTags: ["cities"]
    }),
  })
});

export const {
  useGetAllCountriesQuery,
  useLazyGetDepartmentsByCountryQuery,
  useLazyGetCitiesByDepartmentQuery
} = locationsEndpoints;