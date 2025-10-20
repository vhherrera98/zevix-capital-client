import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";
import { Moneda } from "@/types/bank.type";

export const currenciesTypesEndpoints = mainApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCurrenciesTypes: builder.query<ApiResponse<Moneda[]>, void>({
      query: () => ({
        url: '/banks/currencies',
        method: "GET"
      }),
      providesTags: ["currencies_types"]
    })
  })
});

export const {
  useGetAllCurrenciesTypesQuery
} = currenciesTypesEndpoints;