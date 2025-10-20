import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";
import { TipoCuenta } from "@/types/bank.type";

export const accountTypesEndpoints = mainApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccountTypes: builder.query<ApiResponse<TipoCuenta[]>, void>({
      query: () => ({
        url: '/banks/types_accounts',
        method: "GET"
      }),
      providesTags: ["accounts_types"]
    })
  })
});

export const {
  useGetAllAccountTypesQuery
} = accountTypesEndpoints;