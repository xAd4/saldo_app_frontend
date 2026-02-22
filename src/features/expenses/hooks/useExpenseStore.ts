/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import type { RootState, AppDispatch } from "../../../stores/store";
import type { Expense } from "../../../types";
import {
    onStartLoading,
    onLoadExpenses,
    onAddExpense,
    onUpdateExpense,
    onRemoveExpense,
    onExpenseError,
    onClearExpenseError,
} from "../slices/expenseSlice";
import saldoAppApi from "../../../lib/api/saldoAppApi";
import { SwalCustom } from "../../../lib/utils/swal-custom";

export const useExpenseStore = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { expenses, totalExpenses, isLoadingExpenses, errorMessage } =
        useSelector((state: RootState) => state.expenses);

    //* Load all expenses (optionally filtered by budgetCategoryId)
    const startLoadingExpenses = useCallback(
        async (budgetCategoryId?: number): Promise<void> => {
            try {
                dispatch(onStartLoading());

                let url = "/expenses";
                if (budgetCategoryId) {
                    url += `?budgetCategoryId=${budgetCategoryId}`;
                }

                const { data } = await saldoAppApi.get(url);
                dispatch(onLoadExpenses(data));
            } catch (error: any) {
                if (error?.response?.status === 401) {
                    dispatch(onLoadExpenses([]));
                    return;
                }

                const message =
                    error?.response?.data?.message || "Error al cargar los gastos.";
                SwalCustom.error("Error", message);
                dispatch(onExpenseError(message));
            }
        },
        [dispatch],
    );

    //* Save (create or update) an expense
    const startSavingExpense = async (
        expense: Partial<Expense>,
    ): Promise<void> => {
        try {
            if (expense.id) {
                // Update
                const { data } = await saldoAppApi.put(`/expenses/${expense.id}`, {
                    amount: expense.amount,
                    description: expense.description,
                });

                dispatch(onUpdateExpense(data));
                SwalCustom.success(
                    "Gasto actualizado",
                    "El gasto se actualizó correctamente.",
                );
            } else {
                // Create
                const { data } = await saldoAppApi.post("/expenses", {
                    budget_category_id: expense.budget_category_id,
                    amount: expense.amount,
                    description: expense.description,
                });

                dispatch(onAddExpense(data));
                SwalCustom.success(
                    "Gasto registrado",
                    "El nuevo gasto se registró correctamente.",
                );
            }
        } catch (error: any) {
            const message =
                error?.response?.data?.message || "Error al guardar el gasto.";
            SwalCustom.error("Error", message);
            dispatch(onExpenseError(message));
            throw new Error(message);
        }
    };

    //* Delete an expense
    const startDeletingExpense = async (expense: Expense): Promise<void> => {
        try {
            await saldoAppApi.delete(`/expenses/${expense.id}`);
            dispatch(onRemoveExpense(expense.id));
            SwalCustom.success(
                "Gasto eliminado",
                "El gasto se eliminó correctamente.",
            );
        } catch (error: any) {
            const message =
                error?.response?.data?.message || "Error al eliminar el gasto.";
            SwalCustom.error("Error", message);
            dispatch(onExpenseError(message));
            throw new Error(message);
        }
    };

    //* Clear error
    const clearExpenseError = () => {
        dispatch(onClearExpenseError());
    };

    return {
        //* Properties
        expenses,
        totalExpenses,
        isLoadingExpenses,
        errorMessage,

        //* Methods
        startLoadingExpenses,
        startSavingExpense,
        startDeletingExpense,
        clearExpenseError,
    };
};
