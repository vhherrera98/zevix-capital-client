import { Notification } from "@/types/notification.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NotificationItem = {
  view?: boolean;
} & Notification;

type NotificationState = {
  notifications: NotificationItem[];
}

const getInitialNotificationState = (): NotificationState => {
  return { notifications: [] };
}

const initialState: NotificationState = getInitialNotificationState();

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationItem>) => {
      // state.notifications.unshift(action.payload);
      state.notifications.unshift({
        ...action.payload,
        view: false
      });
    },
    setNotifications: (state, action: PayloadAction<NotificationItem[]>) => {
      const addingVIew = action.payload.map((notification) => ({
        ...notification,
        view: true
      }));
      // state.notifications = action.payload;
      state.notifications = addingVIew;
    },
  }
});

export const {
  addNotification,
  setNotifications
} = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;