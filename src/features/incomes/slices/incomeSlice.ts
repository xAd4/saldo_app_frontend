import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Income } from "../../../types";

interface IncomeState {
  incomes: Income[];
  totalIncome: number;
  isLoadingIncomes: boolean;
  errorMessage: string | null;
}

const initialState: IncomeState = {
  incomes: [],
  totalIncome: 0,
  isLoadingIncomes: false,
  errorMessage: null,
};

const incomeSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {
    onStartLoading(state) {
      state.isLoadingIncomes = true;
      state.errorMessage = null;
    },
    onLoadIncomes(state, action: PayloadAction<Income[]>) {
      state.isLoadingIncomes = false;
      state.incomes = action.payload;
      state.totalIncome = action.payload.reduce(
        (sum, i) => sum + Number(i.amount),
        0,
      );
    },
    onAddIncome(state, action: PayloadAction<Income>) {
      state.incomes.push(action.payload);
      state.totalIncome += Number(action.payload.amount);
    },
    onUpdateIncome(state, action: PayloadAction<Income>) {
      const index = state.incomes.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.totalIncome -= Number(state.incomes[index].amount);
        state.incomes[index] = action.payload;
        state.totalIncome += Number(action.payload.amount);
      }
    },
    onRemoveIncome(state, action: PayloadAction<number>) {
      const income = state.incomes.find((i) => i.id === action.payload);
      if (income) {
        state.totalIncome -= Number(income.amount);
      }
      state.incomes = state.incomes.filter((i) => i.id !== action.payload);
    },
    onIncomeError(state, action: PayloadAction<string>) {
      state.isLoadingIncomes = false;
      state.errorMessage = action.payload;
    },
    onClearIncomeError(state) {
      state.errorMessage = null;
    },
  },
});

export const {
  onStartLoading,
  onLoadIncomes,
  onAddIncome,
  onUpdateIncome,
  onRemoveIncome,
  onIncomeError,
  onClearIncomeError,
} = incomeSlice.actions;

export default incomeSlice.reducer;
