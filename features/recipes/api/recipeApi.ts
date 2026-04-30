import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Recipe, RecipesResponse } from "../recipeTypes";

export const recipeApi = createApi({
  reducerPath: "recipeApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),

  tagTypes: ["Recipes", "Recipe"],
  // "Recipes" → the LIST (used with id: "LIST" sentinel)
  // "Recipe"  → individual items (used with id: recipeId)

  endpoints: (builder) => ({
    // Get all recipes
    getRecipes: builder.query<RecipesResponse, void>({
      query: () => "/recipes",
      providesTags: (result) =>
        result
          ? [
              ...result.recipes.map(({ id }) => ({
                type: "Recipe" as const,
                id,
              })),
              { type: "Recipes", id: "LIST" },
            ]
          : [{ type: "Recipes", id: "LIST" }],
    }),

    // Get single recipe by ID → Fixed
    getRecipeById: builder.query<Recipe, number>({
      query: (id) => `recipes/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Recipe", id }],
    }),
  }),
});

export const { useGetRecipesQuery, useGetRecipeByIdQuery } = recipeApi;
