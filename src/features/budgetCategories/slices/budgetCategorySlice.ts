import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BudgetCategory } from "../../../types";

interface BudgetCategoryState {
  categories: BudgetCategory[];
  activeCategory: BudgetCategory | null;
  isLoadingCategories: boolean;
  errorMessage: string | null;
}

const initialState: BudgetCategoryState = {
  categories: [],
  activeCategory: null,
  isLoadingCategories: false,
  errorMessage: null,
};

const budgetCategorySlice = createSlice({
  name: "budgetCategories",
  initialState,
  reducers: {
    onStartLoading(state) {
      state.isLoadingCategories = true;
      state.errorMessage = null;
    },
    onLoadCategories(state, action: PayloadAction<BudgetCategory[]>) {
      state.isLoadingCategories = false;
      state.categories = action.payload;
    },
    onSetActiveCategory(
      state,
      action: PayloadAction<BudgetCategory | null>,
    ) {
      state.activeCategory = action.payload;
    },
    onAddCategory(state, action: PayloadAction<BudgetCategory>) {
      state.categories.push(action.payload);
    },
    onUpdateCategory(state, action: PayloadAction<BudgetCategory>) {
      const index = state.categories.findIndex(
        (c) => c.id === action.payload.id,
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    onRemoveCategory(state, action: PayloadAction<number>) {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload,
      );
    },
    onCategoryError(state, action: PayloadAction<string>) {
      state.isLoadingCategories = false;
      state.errorMessage = action.payload;
    },
    onClearCategoryError(state) {
      state.errorMessage = null;
    },
  },
});

export const {
  onStartLoading,
  onLoadCategories,
  onSetActiveCategory,
  onAddCategory,
  onUpdateCategory,
  onRemoveCategory,
  onCategoryError,
  onClearCategoryError,
} = budgetCategorySlice.actions;

export default budgetCategorySlice.reducer;
