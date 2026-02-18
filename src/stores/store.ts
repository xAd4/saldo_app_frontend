import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slices/authSlice";
import categoryTemplateReducer from "../features/categoryTemplates/slices/categoryTemplateSlice";
import monthlyBudgetReducer from "../features/monthlyBudgets/slices/monthlyBudgetSlice";
import savingsEntryReducer from "../features/savingsEntries/slices/savingsEntrySlice";
import incomeReducer from "../features/incomes/slices/incomeSlice";
import budgetCategoryReducer from "../features/budgetCategories/slices/budgetCategorySlice";
import expenseReducer from "../features/expenses/slices/expenseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categoryTemplates: categoryTemplateReducer,
    monthlyBudgets: monthlyBudgetReducer,
    savingsEntries: savingsEntryReducer,
    incomes: incomeReducer,
    budgetCategories: budgetCategoryReducer,
    expenses: expenseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
