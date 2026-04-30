import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "./recipeTypes";

interface RecipeState {
  selectedRecipe: Recipe | null;
}

const initialState: RecipeState = {
  selectedRecipe: null,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,

  reducers: {
    setSelectedRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.selectedRecipe = action.payload;
    },
    clearSelectedRecipe: (state) => {
      state.selectedRecipe = null;
    },
  },
});

export const { setSelectedRecipe, clearSelectedRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
