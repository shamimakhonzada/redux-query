import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, User } from "../model/user.types";

export const userApi = createApi({
  reducerPath: "userApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    me: builder.query<User, void>({
      query: () => "/me/profile",

      transformResponse: (response: ApiResponse<User>) => {
        return response.data;
      },
    }),

    getAllUsers: builder.query<User[], void>({
      query: () => "/",

      transformResponse: (response: ApiResponse<User[]>) => {
        return response.data;
      },
    }),

    getUserByID: builder.query<User, number>({
      query: (id) => `/${id}`,

      transformResponse: (response: ApiResponse<User>) => {
        return response.data;
      },
    }),

    updateUserByID: builder.mutation<
      ApiResponse<User>,
      { id: number; data: Partial<User> }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteUserByID: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useMeQuery,
  useGetAllUsersQuery,
  useGetUserByIDQuery,
  useUpdateUserByIDMutation,
  useDeleteUserByIDMutation,
} = userApi;
