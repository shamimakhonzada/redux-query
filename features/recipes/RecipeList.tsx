"use client";

import { useAppDispatch } from "@/app/hook";
import { useGetRecipesQuery } from "./api/recipeApi";
import { setSelectedRecipe } from "./recipeSlice";
import Image from "next/image";

export default function RecipeList() {
  const { data, isLoading, isError } = useGetRecipesQuery();
  const dispatch = useAppDispatch();

  if (isLoading) return <p className="text-center mt-10">Loading recipes...</p>;

  if (isError || !data)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load recipes.</p>
    );

  const recipes = data.recipes;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Recipes ({recipes.length})</h1>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => dispatch(setSelectedRecipe(recipe))}
            className="cursor-pointer bg-white rounded-xl shadow-sm border hover:shadow-md transition overflow-hidden"
          >
            {/* Image */}
            <Image
              src={recipe.image}
              alt={recipe.name}
              width={400}
              height={250}
              className="w-full h-40 object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">
                {recipe.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {recipe.cuisine} • {recipe.difficulty}
              </p>

              <div className="mt-2 text-sm">
                ⭐ {recipe.rating}{" "}
                <span className="text-gray-400">({recipe.reviewCount})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
