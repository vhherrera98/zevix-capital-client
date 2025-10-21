/* eslint-disable @typescript-eslint/no-explicit-any */
import { Notificacion, Notification } from "@/types/notification.type";
import { mainApiSlice } from "../../api-slice";
import { ApiResponse } from "@/types/api-response.type";
import { notificationSchemaType } from "@/app/(partnert)/[continente]/dashboard/notifications/notification.schema";

type ChangeStateType = {
  id: number;
  estado_id: number;
}

export const notificationsEndpoints = mainApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<ApiResponse<Notification[]>, void>({
      query: () => ({
        url: `/notifications/by`,
        method: "GET"
      }),
      providesTags: ["notifications"]
    }),
    getNotificationsPendings: builder.query<ApiResponse<Notificacion[]>, void>({
      query: () => ({
        url: `/notifications/verificaciones`,
        method: "GET"
      }),
      providesTags: ["notifications"]
    }),
    createNotification: builder.mutation<ApiResponse<any>, notificationSchemaType>({
      query: (data) => ({
        url: "/notifications",
        method: "POST",
        body: data,

      }),
      invalidatesTags: ["notifications"]
    }),
    changeStateNotification: builder.mutation<ApiResponse<any>, ChangeStateType>({
      query: ({ id, estado_id }) => ({
        url: `/notifications/${id}`,
        method: "PUT",
        body: { estado_id },
      }),
      invalidatesTags: ["notifications"]
    })
  })
});

export const {
  useGetNotificationsQuery,
  useCreateNotificationMutation,
  useGetNotificationsPendingsQuery,
  useChangeStateNotificationMutation
} = notificationsEndpoints;