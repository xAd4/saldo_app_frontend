import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MonthlyBudget } from "../../../types";

interface MonthlyBudgetState {
  budgets: MonthlyBudget[];
  activeBudget: MonthlyBudget | null;
  selectedBudget: MonthlyBudget | null;
  isLoadingBudgets: boolean;
  errorMessage: string | null;
}

const initialState: MonthlyBudgetState = {
  budgets: [],
  activeBudget: null,
  selectedBudget: null,
  isLoadingBudgets: false,
  errorMessage: null,
};

const monthlyBudgetSlice = createSlice({
  name: "monthlyBudgets",
  initialState,
  reducers: {
    onStartLoading(state) {
      state.isLoadingBudgets = true;
      state.errorMessage = null;
    },
    onLoadBudgets(state, action: PayloadAction<MonthlyBudget[]>) {
      state.isLoadingBudgets = false;
      state.budgets = action.payload;
      state.activeBudget = action.payload.find((b) => b.is_active) || null;
    },
    onSetSelectedBudget(state, action: PayloadAction<MonthlyBudget | null>) {
      state.selectedBudget = action.payload;
    },
    onAddBudget(state, action: PayloadAction<MonthlyBudget>) {
      state.budgets.push(action.payload);
      if (action.payload.is_active) {
        state.activeBudget = action.payload;
      }
    },
    onUpdateBudget(state, action: PayloadAction<MonthlyBudget>) {
      const index = state.budgets.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.budgets[index] = action.payload;
      }
      if (action.payload.is_active) {
        state.activeBudget = action.payload;
      }
    },
    onCloseBudget(state, action: PayloadAction<MonthlyBudget>) {
      const index = state.budgets.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.budgets[index] = action.payload;
      }
      if (state.activeBudget?.id === action.payload.id) {
        state.activeBudget = null;
      }
    },
    onRemoveBudget(state, action: PayloadAction<number>) {
      state.budgets = state.budgets.filter((b) => b.id !== action.payload);
      if (state.activeBudget?.id === action.payload) {
        state.activeBudget = null;
      }
    },
    onBudgetError(state, action: PayloadAction<string>) {
      state.isLoadingBudgets = false;
      state.errorMessage = action.payload;
    },
    onClearBudgetError(state) {
      state.errorMessage = null;
    },
  },
});

export const {
  onStartLoading,
  onLoadBudgets,
  onSetSelectedBudget,
  onAddBudget,
  onUpdateBudget,
  onCloseBudget,
  onRemoveBudget,
  onBudgetError,
  onClearBudgetError,
} = monthlyBudgetSlice.actions;

export default monthlyBudgetSlice.reducer;
