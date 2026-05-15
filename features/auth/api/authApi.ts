import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginCredentials, SignUpCredentials } from "../model/auth.types";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/auth`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    signIn: builder.mutation<unknown, LoginCredentials>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    signup: builder.mutation<unknown, SignUpCredentials>({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),

    signOut: builder.mutation<unknown, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useSignInMutation, useSignupMutation, useSignOutMutation } =
  authApi;
