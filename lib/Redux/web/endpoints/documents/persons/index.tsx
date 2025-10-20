import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../../api-slice";
import { Documento } from "@/types/documents.type";

export const documentsPersonEndpoints = mainApiSlice.injectEndpoints({
 endpoints: (build) => ({
  getAllDocumentsRequests: build.query<ApiResponse<Documento[]>, void>({
   query: () => ({
    url: "/documentos/persona/nuevo",
    method: "GET"
   }),
   providesTags: ["documents_requests"]
  }),
  getAllDocumentsBeneficiariesRequests: build.query<ApiResponse<Documento[]>, void>({
   query: () => ({
    url: "/documentos/persona/beneficiary/nuevo",
    method: "GET"
   }),
   providesTags: ["documents_requests"]
  }),
 })
});

export const {
 useGetAllDocumentsRequestsQuery,
 useGetAllDocumentsBeneficiariesRequestsQuery
} = documentsPersonEndpoints;