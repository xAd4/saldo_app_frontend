import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Income } from "../../../types";

interface IncomeState {
  incomes: Income[];
  totalIncome: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: IncomeState = {
  incomes: [],
  totalIncome: 0,
  isLoading: false,
  error: null,
};

const incomeSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {
    fetchIncomesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchIncomesSuccess(state, action: PayloadAction<Income[]>) {
      state.isLoading = false;
      state.incomes = action.payload;
      state.totalIncome = action.payload.reduce((sum, i) => sum + i.amount, 0);
    },
    fetchIncomesFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addIncome(state, action: PayloadAction<Income>) {
      state.incomes.push(action.payload);
      state.totalIncome += action.payload.amount;
    },
    updateIncome(state, action: PayloadAction<Income>) {
      const index = state.incomes.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.totalIncome -= state.incomes[index].amount;
        state.incomes[index] = action.payload;
        state.totalIncome += action.payload.amount;
      }
    },
    removeIncome(state, action: PayloadAction<number>) {
      const income = state.incomes.find((i) => i.id === action.payload);
      if (income) {
        state.totalIncome -= income.amount;
      }
      state.incomes = state.incomes.filter((i) => i.id !== action.payload);
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  fetchIncomesStart,
  fetchIncomesSuccess,
  fetchIncomesFailure,
  addIncome,
  updateIncome,
  removeIncome,
  clearError,
} = incomeSlice.actions;

export default incomeSlice.reducer;
