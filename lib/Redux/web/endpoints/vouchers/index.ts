import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";
import { Voucher } from "@/types/voucher.type";

export const vouchersEndpoints = mainApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getVoucherAuthenticated: build.query<ApiResponse<Voucher[]>, void>({
      query: () => ({
        url: "/vouchers/authenticated",
        method: "GET"
      }),
      providesTags: ["vouchers"]
    }),
    getVouchersByPersons: build.query<ApiResponse<Voucher[]>, void>({
      query: () => ({
        url: "/vouchers/personas",
        method: "GET"
      }),
      providesTags: ["vouchers", "AUTO_REFRESH"]
    }),
  })
});

export const {
  useGetVoucherAuthenticatedQuery,
  useGetVouchersByPersonsQuery
} = vouchersEndpoints;