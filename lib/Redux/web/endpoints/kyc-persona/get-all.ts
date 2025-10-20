import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";
import { KycPersonaType } from "@/types/kyc.type";

export const kycPersonaEndpoints = mainApiSlice.injectEndpoints({
 endpoints: (build) => ({
  getAllKycPersonas: build.query<KycPersonaType[], void>({
   query: () => ({
    url: "/kyc/personas",
    method: "GET"
   }),
   transformResponse: (response: ApiResponse<KycPersonaType[]>) => response.data,
   providesTags: ["kyc-persona"]
  }),
 })
})

export const {
 useGetAllKycPersonasQuery: useGetAllKycPersonas
} = kycPersonaEndpoints;