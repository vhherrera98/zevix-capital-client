import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";

export const vouchersRequestEndpoints = mainApiSlice.injectEndpoints({
  endpoints: (build) => ({
    approveVoucher: build.mutation<ApiResponse<string>, { voucherId: number, estadoId: number }>({
      query: (data) => ({
        url: "/vouchers/solicitud/aprobar",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["vouchers", "AUTO_REFRESH"]
    })
  })
});

export const {
  useApproveVoucherMutation
} = vouchersRequestEndpoints;