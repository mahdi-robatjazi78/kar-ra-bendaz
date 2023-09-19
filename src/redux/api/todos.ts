import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleResponseError } from "@utils/funcs";
const base_url = process.env.BACKEND_APP_BASE_URL;

// Define a service using a base URL and expected endpoints

export const TodoRtkService = createApi({
  reducerPath: "todos",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url + "/todos",
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
      query: (query) =>{
        
        const filter_by = query?.filter_by;
   
        

        if(!filter_by){
          return `index?filter_by=&ws=${query.wsID}`
        }
        if(filter_by === "done"){
          return `index?filter_by=done&ws=${query.wsID}`
        }
        if(filter_by === "category"){
          return `index?filter_by=category&category=${query.category}&ws=${query.wsID}`
        }
        if(filter_by === "search"){
          return `index?filter_by=search&searchText=${query.searchText}&ws=${query.wsID}`
        }

        if(filter_by === "priority"){
          const level = query.priority_level ==="low" ? 0 : query.priority_level === "medium"  ? 1 : query.priority_level === "high" ? 2 : null
          return `index?filter_by=priority&level=${level}&ws=${query.wsID}`
        }

        if(filter_by === "pagination"){
          return `index?filter_by=pagination&page=${query.page}&perPage=${query.perPage}&ws=${query.wsID}`
        }
        
        // else{
        //   return `index?ws=${query.wsID}&page=${query.page}&perPage=${query.perPage}&searchText=${query.searchText}`
        // }
      },
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
    updatePriority: builder.mutation({
      query: ({ todoId, priority }) => ({
        url: `update-priority`,
        method: "PUT",
        body: {
          id: todoId,
          priority,
        },
      }),

      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),
    updatePriorityBulk: builder.mutation({
      query: ({ list, priority }) => ({
        url: `update-priority-many`,
        method: "PUT",
        body: {
          todoListIds: list,
          priority,
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
      query: ({ todoIdList, categoId, ws}) => ({
        url: `assign-many?ws=${ws}`,
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
  useUpdatePriorityMutation,
  useUpdatePriorityBulkMutation,
} = TodoRtkService;
