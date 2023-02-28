import { userSlice } from './features/userSlice';
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ServiceRTK } from "./api/service";
export const store = configureStore({
  reducer: {
    [ServiceRTK.reducerPath]: ServiceRTK.reducer,
    auth: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ServiceRTK.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
