import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Expense } from "../../../types";

interface ExpenseState {
  expenses: Expense[];
  totalExpenses: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  totalExpenses: 0,
  isLoading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    fetchExpensesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchExpensesSuccess(state, action: PayloadAction<Expense[]>) {
      state.isLoading = false;
      state.expenses = action.payload;
      state.totalExpenses = action.payload.reduce(
        (sum, e) => sum + e.amount,
        0,
      );
    },
    fetchExpensesFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addExpense(state, action: PayloadAction<Expense>) {
      state.expenses.push(action.payload);
      state.totalExpenses += action.payload.amount;
    },
    updateExpense(state, action: PayloadAction<Expense>) {
      const index = state.expenses.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.totalExpenses -= state.expenses[index].amount;
        state.expenses[index] = action.payload;
        state.totalExpenses += action.payload.amount;
      }
    },
    removeExpense(state, action: PayloadAction<number>) {
      const expense = state.expenses.find((e) => e.id === action.payload);
      if (expense) {
        state.totalExpenses -= expense.amount;
      }
      state.expenses = state.expenses.filter((e) => e.id !== action.payload);
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  fetchExpensesStart,
  fetchExpensesSuccess,
  fetchExpensesFailure,
  addExpense,
  updateExpense,
  removeExpense,
  clearError,
} = expenseSlice.actions;

export default expenseSlice.reducer;
