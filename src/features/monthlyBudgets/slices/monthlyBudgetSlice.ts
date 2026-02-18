import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MonthlyBudget } from "../../../types";

interface MonthlyBudgetState {
  budgets: MonthlyBudget[];
  activeBudget: MonthlyBudget | null;
  selectedBudget: MonthlyBudget | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MonthlyBudgetState = {
  budgets: [],
  activeBudget: null,
  selectedBudget: null,
  isLoading: false,
  error: null,
};

const monthlyBudgetSlice = createSlice({
  name: "monthlyBudgets",
  initialState,
  reducers: {
    fetchBudgetsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchBudgetsSuccess(state, action: PayloadAction<MonthlyBudget[]>) {
      state.isLoading = false;
      state.budgets = action.payload;
      state.activeBudget = action.payload.find((b) => b.is_active) || null;
    },
    fetchBudgetsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedBudget(state, action: PayloadAction<MonthlyBudget | null>) {
      state.selectedBudget = action.payload;
    },
    addBudget(state, action: PayloadAction<MonthlyBudget>) {
      state.budgets.push(action.payload);
      if (action.payload.is_active) {
        state.activeBudget = action.payload;
      }
    },
    updateBudget(state, action: PayloadAction<MonthlyBudget>) {
      const index = state.budgets.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.budgets[index] = action.payload;
      }
      if (action.payload.is_active) {
        state.activeBudget = action.payload;
      }
    },
    closeBudget(state, action: PayloadAction<MonthlyBudget>) {
      const index = state.budgets.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.budgets[index] = action.payload;
      }
      if (state.activeBudget?.id === action.payload.id) {
        state.activeBudget = null;
      }
    },
    removeBudget(state, action: PayloadAction<number>) {
      state.budgets = state.budgets.filter((b) => b.id !== action.payload);
      if (state.activeBudget?.id === action.payload) {
        state.activeBudget = null;
      }
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  fetchBudgetsStart,
  fetchBudgetsSuccess,
  fetchBudgetsFailure,
  setSelectedBudget,
  addBudget,
  updateBudget,
  closeBudget,
  removeBudget,
  clearError,
} = monthlyBudgetSlice.actions;

export default monthlyBudgetSlice.reducer;
