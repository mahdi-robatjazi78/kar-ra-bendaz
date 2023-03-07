import { ITodoStructure } from './../../types/types';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleResponseError } from "@services/api";
const base_url = `http://localhost:8888`;
// Define a service using a base URL and expected endpoints

export const TodoRtkService = createApi({
  reducerPath: "todos",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url + "/todos/",
    prepareHeaders(headers, { getState }) {
      const state: any = getState();

      if (!headers.has("x-auth-token")) {
        headers.set("x-auth-token", state?.auth?.token);
      }
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodoIndex: builder.query({
      query : (query) =>
      `index?ws=${query.wsID}&category=${query.categoryID}`,
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),
  }),
});

export const { useLazyGetTodoIndexQuery } = TodoRtkService;
