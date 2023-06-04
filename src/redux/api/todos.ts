import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleResponseError } from "@utils/funcs";
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
      query: (query) =>
        `index?ws=${query.wsID}&page=${query.page}&perPage=${query.perPage}&searchText=${query.searchText}`,
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),
    storeNewTodo: builder.mutation({
      query: (payload) => ({
        url: `store`,
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),
    todoSetDone: builder.mutation({
      query: ({ id }) => ({
        url: "done",
        method: "PUT",
        body: {
          id,
        },
      }),

      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),
    todoSetDoneBulk: builder.mutation({
      query: ({ ids, ws }) => ({
        url: `done-many?ws=${ws}`,
        method: "PUT",
        body: {
          todoListIds: ids,
        },
      }),

      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),

    todoDelete: builder.mutation({
      query: ({ id, ws }) => ({
        url: `delete/${id}?ws=${ws}`,
        method: "DELETE",
      }),

      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),
    todoDeleteBulk: builder.mutation({
      query: ({ ws, list }) => ({
        url: `delete-many?ws=${ws}`,
        method: "DELETE",
        body: {
          todoListIds: list,
        },
      }),

      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),

    changeBody: builder.mutation({
      query: ({ todoId, todoBody }) => ({
        url: `update-body`,
        method: "PUT",
        body: {
          id: todoId,
          body: todoBody,
        },
      }),

      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),

    todoAssignToCategory: builder.mutation({
      query: ({ todoId, categoId }) => ({
        url: `add-to-category`,
        method: "PUT",
        body: {
          todoId,
          categoId,
        },
      }),

      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),

    dragDropAssignToCategory: builder.mutation({
      query: ({ todoId, prevCategoId, newCategoId }) => ({
        url: `assign-to-another-category`,
        method: "PUT",
        body: {
          todoId,
          prevCategoId,
          newCategoId,
        },
      }),

      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),

    todosAssignBulk: builder.mutation({
      query: ({ todoIdList, categoId }) => ({
        url: `assign-many`,
        method: "PUT",
        body: {
          todoList: todoIdList,
          categoId,
        },
      }),

      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),
  }),
});

export const {
  useLazyGetTodoIndexQuery,
  useStoreNewTodoMutation,
  useTodoSetDoneMutation,
  useTodoAssignToCategoryMutation,
  useChangeBodyMutation,
  useDragDropAssignToCategoryMutation,
  useTodoDeleteMutation,
  useTodoDeleteBulkMutation,
  useTodoSetDoneBulkMutation,
  useTodosAssignBulkMutation,
} = TodoRtkService;
