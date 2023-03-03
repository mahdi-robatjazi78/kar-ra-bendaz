import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { WorkspacesRtkService } from "./api/workspaces";
import { userSlice } from './features/userSlice';
import {todoPageConfigSlice} from './features/todoPageConfigSlice'


export const store = configureStore({
  reducer: {
    [WorkspacesRtkService.reducerPath]: WorkspacesRtkService.reducer,
    auth: userSlice.reducer,
    todoPageConfig:todoPageConfigSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(WorkspacesRtkService.middleware),
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
