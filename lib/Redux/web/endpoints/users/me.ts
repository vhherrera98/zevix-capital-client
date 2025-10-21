/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";

export const getMeProfileEndpoint = mainApiSlice.injectEndpoints({
 endpoints: (build) => ({
  getMe: build.query<any, void>({
   query: () => ({
    url: "/auth/me",
    method: "GET"
   }),
   transformResponse: (response: ApiResponse<any>) => response.data,
   providesTags: ['me']
  })
 })
});

export const {
 useGetMeQuery,
 useLazyGetMeQuery
} = getMeProfileEndpoint;