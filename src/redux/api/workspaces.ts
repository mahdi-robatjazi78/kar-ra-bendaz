import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleResponseError } from "@utils/funcs";
const base_url = process.env.BACKEND_APP_BASE_URL;

// Define a service using a base URL and expected endpoints

export const WorkspacesRtkService = createApi({
  reducerPath: "workspaces",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url + "/ws",
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
  tagTypes: ["Workspace"],
  endpoints: (builder) => ({
    wsList: builder.query({
      query: (searchText = "") => `index?searchText=${searchText}`,
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),
    getActiveWs: builder.query({
      query: () => `get-active`,
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),
    storeNewWs: builder.mutation({
      query: (payload) => ({
        url: "new",
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),
    activeWs: builder.mutation({
      query: (payload) => ({
        url: "set-active",
        method: "PUT",
        body: payload,
      }),
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),
    renameWs: builder.mutation({
      query: (payload) => ({
        url: "rename",
        method: "PUT",
        body: payload,
      }),
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),

    deleteWs: builder.mutation({
      query: ({ id }) => ({
        url: `delete?id=${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),
  }),
});

export const {
  useWsListQuery,
  useGetActiveWsQuery,
  useStoreNewWsMutation,
  useActiveWsMutation,
  useRenameWsMutation,
  useDeleteWsMutation,
} = WorkspacesRtkService;
