/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import type { RootState, AppDispatch } from "../../../stores/store";
import type { Income } from "../../../types";
import {
    onStartLoading,
    onLoadIncomes,
    onAddIncome,
    onUpdateIncome,
    onRemoveIncome,
    onIncomeError,
    onClearIncomeError,
} from "../slices/incomeSlice";
import saldoAppApi from "../../../lib/api/saldoAppApi";
import { SwalCustom } from "../../../lib/utils/swal-custom";

export const useIncomeStore = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { incomes, totalIncome, isLoadingIncomes, errorMessage } = useSelector(
        (state: RootState) => state.incomes,
    );

    //* Load all incomes (optionally filtered by monthlyBudgetId)
    const startLoadingIncomes = useCallback(
        async (monthlyBudgetId?: number): Promise<void> => {
            try {
                dispatch(onStartLoading());

                let url = "/incomes";
                if (monthlyBudgetId) {
                    url += `?monthlyBudgetId=${monthlyBudgetId}`;
                }

                const { data } = await saldoAppApi.get(url);
                dispatch(onLoadIncomes(data));
            } catch (error: any) {
                if (error?.response?.status === 401) {
                    dispatch(onLoadIncomes([]));
                    return;
                }

                const message =
                    error?.response?.data?.message || "Error al cargar los ingresos.";
                SwalCustom.error("Error", message);
                dispatch(onIncomeError(message));
            }
        },
        [dispatch],
    );

    //* Save (create or update) an income
    const startSavingIncome = async (income: Partial<Income>): Promise<void> => {
        try {
            if (income.id) {
                // Update
                const { data } = await saldoAppApi.put(`/incomes/${income.id}`, {
                    amount: income.amount,
                    source: income.source,
                    received_at: income.received_at,
                });

                dispatch(onUpdateIncome(data));
                SwalCustom.success(
                    "Ingreso actualizado",
                    "El ingreso se actualizó correctamente.",
                );
            } else {
                // Create
                const { data } = await saldoAppApi.post("/incomes", {
                    monthly_budget_id: income.monthly_budget_id,
                    amount: income.amount,
                    source: income.source,
                    received_at: income.received_at,
                });

                dispatch(onAddIncome(data));
                SwalCustom.success(
                    "Ingreso registrado",
                    "El nuevo ingreso se registró correctamente.",
                );
            }
        } catch (error: any) {
            const message =
                error?.response?.data?.message || "Error al guardar el ingreso.";
            SwalCustom.error("Error", message);
            dispatch(onIncomeError(message));
            throw new Error(message);
        }
    };

    //* Delete an income
    const startDeletingIncome = async (income: Income): Promise<void> => {
        try {
            await saldoAppApi.delete(`/incomes/${income.id}`);
            dispatch(onRemoveIncome(income.id));
            SwalCustom.success(
                "Ingreso eliminado",
                "El ingreso se eliminó correctamente.",
            );
        } catch (error: any) {
            const message =
                error?.response?.data?.message || "Error al eliminar el ingreso.";
            SwalCustom.error("Error", message);
            dispatch(onIncomeError(message));
            throw new Error(message);
        }
    };

    //* Clear error
    const clearIncomeError = () => {
        dispatch(onClearIncomeError());
    };

    return {
        //* Properties
        incomes,
        totalIncome,
        isLoadingIncomes,
        errorMessage,

        //* Methods
        startLoadingIncomes,
        startSavingIncome,
        startDeletingIncome,
        clearIncomeError,
    };
};
