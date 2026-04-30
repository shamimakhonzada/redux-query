import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductsState {
  category: string;
}

const initialState: ProductsState = {
  category: "All",
};

//  Slice
const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
  },
});

export const selectCategory = (state: RootState) => state.products.category;

//  Actions
export const { setCategory } = productsSlice.actions;

//  Reducer
export default productsSlice.reducer;
