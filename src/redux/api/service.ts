import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url, handleResponseError } from "@services/api";

// Define a service using a base URL and expected endpoints


export const ServiceRTK = createApi({
  reducerPath: "workspaces",
  baseQuery: fetchBaseQuery({ baseUrl: base_url+"/ws/" , prepareHeaders(headers  ,{getState}){
    const state : any = getState();
    
    
    if(!headers.has("x-auth-token")){
      headers.set("x-auth-token", state?.auth?.token)
    }
    if(!headers.has("Content-Type")){
      headers.set("Content-Type" , "application/json")
    }
    return headers
  } }),
  tagTypes: ['Workspace'],
  endpoints: (builder) => ({
    wsList: builder.query({
      query: (searchText="") => `get-all?searchText=${searchText}`,
      transformErrorResponse:(error)=>{
       handleResponseError(error)
      }
    }),
    storeNewWs:builder.mutation({
      query: (payload) => ({
        url:"new",
        method:"POST",
        body:payload,
      }),
      transformErrorResponse:(error)=>{
        handleResponseError(error)
       }

    }),
    activeWs:builder.mutation({
      query: (payload) => ({
        url:"set-active",
        method:"PUT",
        body:payload,
      }),
      transformErrorResponse:(error)=>{
        handleResponseError(error)
       }
    }),
    renameWs:builder.mutation({
      query: (payload) => ({
        url:"rename",
        method:"PUT",
        body:payload,
      }),
      transformErrorResponse:(error)=>{
        handleResponseError(error)
       }
      
    }),



  }), 
  
});


export const { useWsListQuery , useStoreNewWsMutation , useActiveWsMutation , useRenameWsMutation } = ServiceRTK;
