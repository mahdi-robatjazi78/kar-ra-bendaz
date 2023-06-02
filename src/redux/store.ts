import { appSettings } from "./features/settingSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlice } from "./features/userSlice";
import { todoPageConfigSlice } from "./features/todoPageConfigSlice";
import { WorkspacesRtkService } from "./api/workspaces";
import { TodoCategoriesRtkService } from "./api/categories";
import { TodoRtkService } from "./api/todos";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage: storage,
  version: 1,
};

export const rootReducers = combineReducers({
  [WorkspacesRtkService.reducerPath]: WorkspacesRtkService.reducer,
  [TodoCategoriesRtkService.reducerPath]: TodoCategoriesRtkService.reducer,
  [TodoRtkService.reducerPath]: TodoRtkService.reducer,
  auth: userSlice.reducer,
  todoPageConfig: todoPageConfigSlice.reducer,
  settings: appSettings.reducer,
});

// export const store = configureStore({
//   reducer: {
//     [WorkspacesRtkService.reducerPath]: WorkspacesRtkService.reducer,
//     [TodoCategoriesRtkService.reducerPath]: TodoCategoriesRtkService.reducer,
//     [TodoRtkService.reducerPath]: TodoRtkService.reducer,
//     auth: userSlice.reducer,
//     todoPageConfig:todoPageConfigSlice.reducer,
//     settings:appSettings.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//     .concat(WorkspacesRtkService.middleware ,TodoCategoriesRtkService.middleware , TodoRtkService.middleware )
// });

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      TodoRtkService.middleware,
      WorkspacesRtkService.middleware,
      TodoCategoriesRtkService.middleware
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
export default () => {
  let persistor = persistStore(store);
  return { persistor };
};
