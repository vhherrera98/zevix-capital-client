import { configureStore } from "@reduxjs/toolkit"
import { mainApiSlice } from "../web/api-slice";
import { notificationSlice } from "./notifications.store";

export const makeStore = () => {
  return configureStore({
    reducer: {
      notifications: notificationSlice.reducer,
      [mainApiSlice.reducerPath]: mainApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(mainApiSlice.middleware)
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];