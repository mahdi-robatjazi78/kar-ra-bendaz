import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "@services/api";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "setMeData",
  baseQuery: fetchBaseQuery({ baseUrl: base_url , prepareHeaders(){
    this.headers.set("x-auth-token" , )
    return headers
  } }),
  endpoints: (builder) => ({
    setMeData: builder.query({
      query: () => `/api/users`,
    }),
  }), 
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSetMeDataQuery } = userApi;
