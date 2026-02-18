import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BudgetCategory } from "../../../types";

interface BudgetCategoryState {
  categories: BudgetCategory[];
  selectedCategory: BudgetCategory | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BudgetCategoryState = {
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,
};

const budgetCategorySlice = createSlice({
  name: "budgetCategories",
  initialState,
  reducers: {
    fetchCategoriesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<BudgetCategory[]>) {
      state.isLoading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<BudgetCategory | null>) {
      state.selectedCategory = action.payload;
    },
    addCategory(state, action: PayloadAction<BudgetCategory>) {
      state.categories.push(action.payload);
    },
    updateCategory(state, action: PayloadAction<BudgetCategory>) {
      const index = state.categories.findIndex(
        (c) => c.id === action.payload.id,
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    removeCategory(state, action: PayloadAction<number>) {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload,
      );
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  setSelectedCategory,
  addCategory,
  updateCategory,
  removeCategory,
  clearError,
} = budgetCategorySlice.actions;

export default budgetCategorySlice.reducer;
