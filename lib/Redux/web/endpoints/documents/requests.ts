import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";

export const documentsRequestEndpoints = mainApiSlice.injectEndpoints({
  endpoints: (build) => ({
    changeStateDocument: build.mutation<ApiResponse<string>, { documentoId: number, estadoId: number }>({
      query: (data) => ({
        url: "/documentos/solicitud",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["documents_personal", "beneficiaries", "documents_requests"]
    })
  })
});

export const {
  useChangeStateDocumentMutation
} = documentsRequestEndpoints;