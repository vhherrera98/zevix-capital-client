import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";
import { CreateVoucherDto } from "@/components/forms/vouchers/voucher-schema";

export const voucherUploadEndpoints = mainApiSlice.injectEndpoints({
  endpoints: (build) => ({
    uploadVoucher: build.mutation<ApiResponse<string>, CreateVoucherDto>({
      query: (data) => {

        const formData = new FormData();
        formData.append("numero_transaccion", data.numero_transaccion);
        formData.append("moneda_id", String(data.moneda_id));
        formData.append("monto", String(data.monto));
        formData.append("documento", data.documento[0]);

        return {
          url: "/vouchers/upload",
          method: "POST",
          body: formData
        }
      },
      invalidatesTags: ["vouchers"]
    })
  })
});

export const {
  useUploadVoucherMutation
} = voucherUploadEndpoints;