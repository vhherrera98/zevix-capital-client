import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";
import { Documento, TipoDocumento } from "@/types/documents.type";

export const documentsEnpoints = mainApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllDocumentsTypes: build.query<ApiResponse<TipoDocumento[]>, void>({
      query: () => ({
        url: "/documentos/tipo_documento",
        method: "GET"
      }),
      providesTags: ["documents_types"]
    }),
    getDocumentByUser: build.query<ApiResponse<Documento>, number>({
      query: (documentId) => ({
        url: `/documentos/documento/${documentId}`,
        method: "GET"
      }),
      providesTags: ["documents_personal"]
    })
  })
});

export const {
  useGetAllDocumentsTypesQuery,
  useGetDocumentByUserQuery
} = documentsEnpoints;