import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";
import { CreateDocument } from "@/components/forms/documents/dni-schema";

export const documentsUploadEndpoints = mainApiSlice.injectEndpoints({
  endpoints: (build) => ({
    uploadPersonalDocument: build.mutation<ApiResponse<string>, CreateDocument>({
      query: (data) => {

        const formData = new FormData();
        formData.append("numero_identificacion", data.numero_identificacion.toString());
        formData.append("fecha_emision", data.fecha_emision);
        formData.append("fecha_expiracion", data.fecha_expiracion);
        formData.append("tipo_documento", data.tipo_documento);
        formData.append("documento", data.documento[0]); // Asegúrate que es un solo archivo

        return {
          url: "/documentos/upload/individual",
          method: "POST",
          body: formData
        }
      },
      invalidatesTags: ["documents_personal", "documents_requests", "beneficiaries"]
    }),
    uploadBeneficiaryDocument: build.mutation<ApiResponse<string>, { beneficiaryId: number, data: CreateDocument }>({
      query: ({ data, beneficiaryId }) => {

        const formData = new FormData();
        formData.append("numero_identificacion", data.numero_identificacion.toString());
        formData.append("fecha_emision", data.fecha_emision);
        formData.append("fecha_expiracion", data.fecha_expiracion);
        formData.append("tipo_documento", data.tipo_documento);
        formData.append("documento", data.documento[0]); // Asegúrate que es un solo archivo

        return {
          url: "/documentos/upload/beneficiario/" + beneficiaryId,
          method: "POST",
          body: formData
        }
      },
      invalidatesTags: ["beneficiaries", "documents_requests", "documents_personal"]
    }),
  })
})

export const {
  useUploadPersonalDocumentMutation,
  useUploadBeneficiaryDocumentMutation
} = documentsUploadEndpoints;