/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import type { RootState, AppDispatch } from "../../../stores/store";
import type { SavingsEntry } from "../../../types";
import {
    onStartLoading,
    onLoadEntries,
    onAddEntry,
    onUpdateEntry,
    onRemoveEntry,
    onEntryError,
    onClearEntryError,
} from "../slices/savingsEntrySlice";
import saldoAppApi from "../../../lib/api/saldoAppApi";
import { SwalCustom } from "../../../lib/utils/swal-custom";

export const useSavingsEntryStore = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { entries, totalSavings, isLoadingEntries, errorMessage } = useSelector(
        (state: RootState) => state.savingsEntries,
    );

    //* Load all savings entries (optionally filtered by monthlyBudgetId)
    const startLoadingSavingsEntries = useCallback(
        async (monthlyBudgetId?: number): Promise<void> => {
            try {
                dispatch(onStartLoading());

                let url = "/savings-entries";
                if (monthlyBudgetId) {
                    url += `?monthlyBudgetId=${monthlyBudgetId}`;
                }

                const { data } = await saldoAppApi.get(url);
                dispatch(onLoadEntries(data));
            } catch (error: any) {
                if (error?.response?.status === 401) {
                    dispatch(onLoadEntries([]));
                    return;
                }

                const message =
                    error?.response?.data?.message ||
                    "Error al cargar las entradas de ahorro.";
                SwalCustom.error("Error", message);
                dispatch(onEntryError(message));
            }
        },
        [dispatch],
    );

    //* Save (create or update) a savings entry
    const startSavingSavingsEntry = async (
        entry: Partial<SavingsEntry>,
    ): Promise<void> => {
        try {
            if (entry.id) {
                // Update
                const { data } = await saldoAppApi.put(`/savings-entries/${entry.id}`, {
                    amount: entry.amount,
                    description: entry.description,
                    monthly_budget_id: entry.monthly_budget_id,
                });

                dispatch(onUpdateEntry(data));
                SwalCustom.success(
                    "Ahorro actualizado",
                    "La entrada de ahorro se actualizó correctamente.",
                );
            } else {
                // Create
                const { data } = await saldoAppApi.post("/savings-entries", {
                    monthly_budget_id: entry.monthly_budget_id,
                    amount: entry.amount,
                    description: entry.description,
                });

                dispatch(onAddEntry(data));
                SwalCustom.success(
                    "Ahorro registrado",
                    "La nueva entrada de ahorro se registró correctamente.",
                );
            }
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "Error al guardar la entrada de ahorro.";
            SwalCustom.error("Error", message);
            dispatch(onEntryError(message));
            throw new Error(message);
        }
    };

    //* Delete a savings entry
    const startDeletingSavingsEntry = async (
        entry: SavingsEntry,
    ): Promise<void> => {
        try {
            await saldoAppApi.delete(`/savings-entries/${entry.id}`);
            dispatch(onRemoveEntry(entry.id));
            SwalCustom.success(
                "Ahorro eliminado",
                "La entrada de ahorro se eliminó correctamente.",
            );
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "Error al eliminar la entrada de ahorro.";
            SwalCustom.error("Error", message);
            dispatch(onEntryError(message));
            throw new Error(message);
        }
    };

    //* Clear error
    const clearEntryError = () => {
        dispatch(onClearEntryError());
    };

    return {
        //* Properties
        entries,
        totalSavings,
        isLoadingEntries,
        errorMessage,

        //* Methods
        startLoadingSavingsEntries,
        startSavingSavingsEntry,
        startDeletingSavingsEntry,
        clearEntryError,
    };
};
