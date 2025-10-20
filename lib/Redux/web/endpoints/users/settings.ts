import { Usuario } from "@/types/usuario.type";
import { mainApiSlice } from "../../api-slice";
import { ApiResponse } from "@/types/api-response.type";
import { Passwords } from "@/app/@modal/auth/settings/page";

export const userSettingEndpoint = mainApiSlice.injectEndpoints({
  endpoints: (build) => ({
    findPersonByCookie: build.query<Usuario, void>({
      query: () => ({
        url: "/auth/settings",
        method: "GET"
      }),
      transformResponse: (response: ApiResponse<Usuario>) => response.data,
      providesTags: ["user"]
    }),
    requestChangePassword: build.mutation<ApiResponse<string>, Passwords>({
      query: (data) => ({
        url: "/auth/settings",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["user"]
    }),
    signup: build.mutation<ApiResponse<string>, { currentPassword: Passwords['currentPassword'], newPassword: Passwords['newPassword'], confirmNewPassword: Passwords['confirmNewPassword'], code: number }>({
      query: (data) => ({
        url: "/auth/settings",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["user"]
    }),
  })
});

export const {
  useFindPersonByCookieQuery,
  useRequestChangePasswordMutation,
  useSignupMutation
} = userSettingEndpoint;