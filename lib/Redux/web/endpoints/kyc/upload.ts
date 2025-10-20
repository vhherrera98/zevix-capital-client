import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";
import { KYCSchemaType } from "@/components/kyc/kyc-schema";

export const kycUploadEndpoints = mainApiSlice.injectEndpoints({
 endpoints: (build) => ({
  uploadKycInfo: build.mutation<ApiResponse<string>, KYCSchemaType>({
   query: (data) => {

    const formData = new FormData();
    const { documento_identidad, selfie_documento, comprobante_domicilio, residente_documento, fuente_fondos, ...restData } = data;
    // Datos restantes
    Object.entries(restData).forEach(([key, value]) => {
     formData.append(key, String(value));
    });
    formData.append("fuente_fondos", JSON.stringify(fuente_fondos));
    // documents
    formData.append("fileCarnetIdentidad", documento_identidad[0]);
    formData.append("fileSelfieCarnetIdentidad", selfie_documento[0]);
    formData.append("fileComprobanteDomicilio", comprobante_domicilio[0]);
    formData.append("fileFormInfoFiscal", residente_documento[0]);

    return {
     url: "/kyc/upload",
     method: "POST",
     body: formData
    }
   },
   invalidatesTags: ["kyc"]
  }),
 })
})

export const {
 useUploadKycInfoMutation
} = kycUploadEndpoints;