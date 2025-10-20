import { ApiResponse } from "@/types/api-response.type";
import { mainApiSlice } from "../../api-slice";
import { Estado } from "@/types/documents.type";

export const statesEndpoints = mainApiSlice.injectEndpoints({
 endpoints: (build) => ({
  getAllStates: build.query<ApiResponse<Estado[]>, void>({
   query: () => ({
    url: "/states",
    method: "GET"
   }),
   providesTags: ["states"]
  }),
 })
});

export const {
 useGetAllStatesQuery
} = statesEndpoints;