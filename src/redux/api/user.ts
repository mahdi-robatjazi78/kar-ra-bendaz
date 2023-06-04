import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleResponseError } from "@utils/funcs";
import { IUser } from "../features/userSlice";
const base_url = `http://localhost:8888`;

// Define a service using a base URL and expected endpoints

export const UserRtkService = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url + "/users",
    prepareHeaders(headers, { getState }) {
      const { auth } = getState() as { auth: IUser };
      if (!headers.has("x-auth-token") && auth?.token) {
        headers.set("x-auth-token", auth?.token);
      }
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    userSignin: builder.mutation({
      query: (payload) => ({
        url: "/login",
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),
    userSignout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "PUT",
        body: {},
      }),
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),

    userSignup: builder.mutation({
      query: (payload) => ({
        url: "/new",
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),
  }),
});

export const {
  useUserSigninMutation,
  useUserSignoutMutation,
  useUserSignupMutation,
} = UserRtkService;
