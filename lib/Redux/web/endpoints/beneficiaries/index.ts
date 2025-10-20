import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";
import { Beneficiario } from "@/types/beneficiario.type";
import { BeneficiarioType } from "@/components/forms/documents/beneficiaries/beneficiario-schema";

export const beneficiariesEndpoints = mainApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllBenefciariesByPerson: build.query<ApiResponse<Beneficiario[]>, void>({
      query: () => ({
        url: "/users/beneficiarios",
        method: "GET"
      }),
      providesTags: ["beneficiaries"]
    }),
    findOneBeneficiary: build.query<ApiResponse<Beneficiario>, number>({
      query: (id) => ({
        url: "/users/beneficiarios/" + id,
        method: "GET"
      }),
      providesTags: ["beneficiaries"]
    }),
    createBeneficiary: build.mutation<ApiResponse<string>, BeneficiarioType>({
      query: (data) => ({
        url: "/users/beneficiarios",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["beneficiaries"]
    }),
    markPrincipalToBeneficiary: build.mutation<ApiResponse<string>, number>({
      query: (id) => ({
        url: "/users/beneficiarios/" + id,
        method: "PUT"
      }),
      invalidatesTags: ["beneficiaries"]
    })
  })
});

export const {
  useGetAllBenefciariesByPersonQuery,
  useCreateBeneficiaryMutation,
  useMarkPrincipalToBeneficiaryMutation,
  useFindOneBeneficiaryQuery
} = beneficiariesEndpoints;