import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleResponseError } from "@utils/funcs";
import { IUser } from "../../types/types";
const base_url = process.env.BACKEND_APP_BASE_URL;

// Define a service using a base URL and expected endpoints

export const UserRtkService = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url + "/users",
    prepareHeaders(headers, { getState, endpoint }) {
      const { auth } = getState() as { auth: IUser };
      if (!headers.has("x-auth-token") && auth?.token) {
        headers.set("x-auth-token", auth?.token);
      }

      if (
        endpoint === "uploadAvatarImage" ||
        endpoint === "deleteUserProfileAvatar" ||
        endpoint === "deleteUserProfileBanner"||
        endpoint === "signupUploadAvatarImage"  
      ) {
        headers.delete("Content-Type");
      } else {
        if (!headers.has("Content-Type")) {
          headers.set("Content-Type", "application/json");
        }
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
      query: (payload) => {


        console.log("payload"  , payload)

        return {
          url: "/signup",
          method: "POST",
          body: payload,
          
        }
      } ,
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),


    signupUploadAvatarImage: builder.mutation({
      query: ({ file, avatarUploaded , temp_token }) => {
        const formData = new FormData();
        formData.append("file", file, file.name);
        formData.append("avatarUploaded", avatarUploaded);
        formData.append("temp_token", temp_token);

        return {
          url: "/signup-upload",
          method: "PUT",
          body: formData,
          formData: true,
        };
      },
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),





 

    getProfileMeData: builder.query({
      query: () => "get-profile-me-data",
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),

    uploadAvatarImage: builder.mutation({
      query: ({ file, avatarUploaded }) => {
        const formData = new FormData();
        formData.append("file", file, file.name);
        formData.append("avatarUploaded", avatarUploaded);

        return {
          url: "/upload-avatar",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),

    deleteUserProfileAvatar: builder.mutation({
      query: ({ file, onlyRemove }) => {
        const formData = new FormData();
        formData.append("onlyRemove", onlyRemove);
        if (file?.name) {
          formData.append("file", file, file.name);
        }
        return {
          url: "/edit-avatar",
          method: "PUT",
          body: formData,
          formData: true,
        };
      },

      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),

    deleteUserProfileBanner: builder.mutation({
      query: ({ file, onlyRemove }) => {
        const formData = new FormData();

        formData.append("onlyRemove", onlyRemove);
        if (file?.name) {
          formData.append("file", file);
        }
        return {
          url: "/edit-banner",
          method: "PUT",
          body: formData,
          formData: true,
        };
      },

      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),

    editProfileData: builder.mutation({
      query: ({ username, fname, lname,gender }) => {
        const body = {
          username,
          fname,
          lname,
          gender
        };

        return {
          url: "/edit-profile-data",
          method: "PUT",
          body: body,
        };
      },

      transformErrorResponse: (error) => {
        handleResponseError(error);
      },
    }),


    editProfilePassword: builder.mutation({
      query: ({ password , passwordConfirmation }) => {
        const body = {
          password , passwordConfirmation
        };

        return {
          url: "/edit-password",
          method: "PUT",
          body: body,
        };
      },

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
  useSignupUploadAvatarImageMutation,
  useUploadAvatarImageMutation,
  useLazyGetProfileMeDataQuery,
  useDeleteUserProfileAvatarMutation,
  useDeleteUserProfileBannerMutation,
  useEditProfileDataMutation,
  useEditProfilePasswordMutation
} = UserRtkService;
