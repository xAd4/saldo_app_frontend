import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Expense } from "../../../types";

interface ExpenseState {
  expenses: Expense[];
  totalExpenses: number;
  isLoadingExpenses: boolean;
  errorMessage: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  totalExpenses: 0,
  isLoadingExpenses: false,
  errorMessage: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    onStartLoading(state) {
      state.isLoadingExpenses = true;
      state.errorMessage = null;
    },
    onLoadExpenses(state, action: PayloadAction<Expense[]>) {
      state.isLoadingExpenses = false;
      state.expenses = action.payload;
      state.totalExpenses = action.payload.reduce(
        (sum, e) => sum + Number(e.amount),
        0,
      );
    },
    onAddExpense(state, action: PayloadAction<Expense>) {
      state.expenses.push(action.payload);
      state.totalExpenses += Number(action.payload.amount);
    },
    onUpdateExpense(state, action: PayloadAction<Expense>) {
      const index = state.expenses.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.totalExpenses -= Number(state.expenses[index].amount);
        state.expenses[index] = action.payload;
        state.totalExpenses += Number(action.payload.amount);
      }
    },
    onRemoveExpense(state, action: PayloadAction<number>) {
      const expense = state.expenses.find((e) => e.id === action.payload);
      if (expense) {
        state.totalExpenses -= Number(expense.amount);
      }
      state.expenses = state.expenses.filter((e) => e.id !== action.payload);
    },
    onExpenseError(state, action: PayloadAction<string>) {
      state.isLoadingExpenses = false;
      state.errorMessage = action.payload;
    },
    onClearExpenseError(state) {
      state.errorMessage = null;
    },
  },
});

export const {
  onStartLoading,
  onLoadExpenses,
  onAddExpense,
  onUpdateExpense,
  onRemoveExpense,
  onExpenseError,
  onClearExpenseError,
} = expenseSlice.actions;

export default expenseSlice.reducer;
