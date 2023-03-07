import { RootState } from '@/redux/store';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleResponseError } from "@services/api";
import { IUser } from '../features/userSlice';
const base_url = `http://localhost:8888`;
// Define a service using a base URL and expected endpoints

export const TodoCategoriesRtkService = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url + "/category/",
    prepareHeaders(headers, { getState }) {
      const {auth} = getState() as {auth : IUser} ;

      if (!headers.has("x-auth-token")) {
        headers.set("x-auth-token", auth?.token);
      }
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategoryIndex: builder.query({
      query: (wsID) => `index?ws=${wsID}`,
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }), 
    storeNewCategory: builder.mutation({
      query: (payload) => ({
        url: "store",
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),
  }),
});

export const { useLazyGetCategoryIndexQuery , useStoreNewCategoryMutation } = TodoCategoriesRtkService;
