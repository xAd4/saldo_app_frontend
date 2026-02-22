/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import type { RootState, AppDispatch } from "../../../stores/store";
import type { MonthlyBudget } from "../../../types";
import {
    onStartLoading,
    onLoadBudgets,
    onSetSelectedBudget,
    onAddBudget,
    onUpdateBudget,
    onCloseBudget,
    onRemoveBudget,
    onBudgetError,
    onClearBudgetError,
} from "../slices/monthlyBudgetSlice";
import saldoAppApi from "../../../lib/api/saldoAppApi";
import { SwalCustom } from "../../../lib/utils/swal-custom";

export const useMonthlyBudgetStore = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        budgets,
        activeBudget,
        selectedBudget,
        isLoadingBudgets,
        errorMessage,
    } = useSelector((state: RootState) => state.monthlyBudgets);

    //* Set selected budget
    const setSelectedBudget = (budget: MonthlyBudget | null) => {
        dispatch(onSetSelectedBudget(budget));
    };

    //* Load all monthly budgets
    const startLoadingMonthlyBudgets = useCallback(async (): Promise<void> => {
        try {
            dispatch(onStartLoading());
            const { data } = await saldoAppApi.get("/monthly-budgets");
            dispatch(onLoadBudgets(data));
        } catch (error: any) {
            if (error?.response?.status === 401) {
                dispatch(onLoadBudgets([]));
                return;
            }

            const message =
                error?.response?.data?.message ||
                "Error al cargar los presupuestos mensuales.";
            SwalCustom.error("Error", message);
            dispatch(onBudgetError(message));
        }
    }, [dispatch]);

    //* Load a single monthly budget by ID
    const startLoadingMonthlyBudget = useCallback(
        async (id: number): Promise<MonthlyBudget | null> => {
            try {
                const { data } = await saldoAppApi.get(`/monthly-budgets/${id}`);
                dispatch(onSetSelectedBudget(data));
                return data;
            } catch (error: any) {
                if (error?.response?.status === 401) return null;

                const message =
                    error?.response?.data?.message ||
                    "Error al cargar el presupuesto mensual.";
                SwalCustom.error("Error", message);
                dispatch(onBudgetError(message));
                return null;
            }
        },
        [dispatch],
    );

    //* Save (create or update) a monthly budget
    const startSavingMonthlyBudget = async (
        budget: Partial<MonthlyBudget>,
    ): Promise<void> => {
        try {
            if (budget.id) {
                // Update
                const { data } = await saldoAppApi.put(
                    `/monthly-budgets/${budget.id}`,
                    {
                        month: budget.month,
                        year: budget.year,
                        total_planned_income: budget.total_planned_income,
                        is_active: budget.is_active,
                    },
                );

                dispatch(onUpdateBudget(data));
                SwalCustom.success(
                    "Presupuesto actualizado",
                    "El presupuesto se actualizó correctamente.",
                );
            } else {
                // Create
                const { data } = await saldoAppApi.post("/monthly-budgets", {
                    month: budget.month,
                    year: budget.year,
                    total_planned_income: budget.total_planned_income,
                    is_active: budget.is_active ?? true,
                });

                dispatch(onAddBudget(data));
                SwalCustom.success(
                    "Presupuesto creado",
                    "El nuevo presupuesto se creó correctamente.",
                );
            }
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "Error al guardar el presupuesto mensual.";
            SwalCustom.error("Error", message);
            dispatch(onBudgetError(message));
            throw new Error(message);
        }
    };

    //* Close a monthly budget (set is_active = false)
    const startClosingMonthlyBudget = async (
        budget: MonthlyBudget,
    ): Promise<void> => {
        try {
            const { data } = await saldoAppApi.put(
                `/monthly-budgets/${budget.id}`,
                { is_active: false },
            );

            dispatch(onCloseBudget(data));
            SwalCustom.success(
                "Presupuesto cerrado",
                "El presupuesto se cerró correctamente.",
            );
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "Error al cerrar el presupuesto.";
            SwalCustom.error("Error", message);
            dispatch(onBudgetError(message));
            throw new Error(message);
        }
    };

    //* Delete a monthly budget
    const startDeletingMonthlyBudget = async (
        budget: MonthlyBudget,
    ): Promise<void> => {
        try {
            await saldoAppApi.delete(`/monthly-budgets/${budget.id}`);
            dispatch(onRemoveBudget(budget.id));
            SwalCustom.success(
                "Presupuesto eliminado",
                "El presupuesto se eliminó correctamente.",
            );
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "Error al eliminar el presupuesto.";
            SwalCustom.error("Error", message);
            dispatch(onBudgetError(message));
            throw new Error(message);
        }
    };

    //* Clear error
    const clearBudgetError = () => {
        dispatch(onClearBudgetError());
    };

    return {
        //* Properties
        budgets,
        activeBudget,
        selectedBudget,
        isLoadingBudgets,
        errorMessage,

        //* Methods
        setSelectedBudget,
        startLoadingMonthlyBudgets,
        startLoadingMonthlyBudget,
        startSavingMonthlyBudget,
        startClosingMonthlyBudget,
        startDeletingMonthlyBudget,
        clearBudgetError,
    };
};
