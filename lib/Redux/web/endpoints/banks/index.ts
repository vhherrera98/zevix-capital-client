import { CuentaBanco } from "@/types/bank.type";
import { mainApiSlice } from "../../api-slice";
import { ApiResponse } from "@/types/api-response.type";
import { CuentaBancoType } from "@/components/forms/banks/cuenta-banco.schema";

export const bankAccountsEndpoints = mainApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBankAccounts: builder.query<ApiResponse<CuentaBanco[]>, void>({
      query: () => ({
        url: `/banks/accounts`,
        method: "GET"
      }),
      providesTags: ["bank_accounts"]
    }),
    createCuentaBanco: builder.mutation<ApiResponse<string>, CuentaBancoType>({
      query: (data) => ({
        url: `/banks/accounts`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["bank_accounts"]
    }),
    deleteCuentaBanco: builder.mutation<ApiResponse<string>, number>({
      query: (id) => ({
        url: `/banks/accounts/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["bank_accounts"]
    }),
  }),
});

export const {
  useGetAllBankAccountsQuery,
  useCreateCuentaBancoMutation,
  useDeleteCuentaBancoMutation
} = bankAccountsEndpoints;