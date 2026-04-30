import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../productTypes";

export const productApi = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
  }),

  tagTypes: ["Products"],

  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
