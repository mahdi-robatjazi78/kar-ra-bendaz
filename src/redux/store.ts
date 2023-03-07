import { appSettings } from './features/settingSlice';
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlice } from './features/userSlice';
import {todoPageConfigSlice} from './features/todoPageConfigSlice';
import { WorkspacesRtkService } from "./api/workspaces";
import {TodoCategoriesRtkService} from './api/categories';
import { TodoRtkService } from "./api/todos";

export const store = configureStore({
  reducer: {
    [WorkspacesRtkService.reducerPath]: WorkspacesRtkService.reducer,
    [TodoCategoriesRtkService.reducerPath]: TodoCategoriesRtkService.reducer,
    [TodoRtkService.reducerPath]: TodoRtkService.reducer,
    auth: userSlice.reducer,
    todoPageConfig:todoPageConfigSlice.reducer,
    settings:appSettings.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(WorkspacesRtkService.middleware ,TodoCategoriesRtkService.middleware , TodoRtkService.middleware )
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
