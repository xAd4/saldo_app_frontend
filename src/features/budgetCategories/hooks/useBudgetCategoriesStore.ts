/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import type { RootState, AppDispatch } from "../../../stores/store";
import type { BudgetCategory } from "../../../types";
import {
    onStartLoading,
    onLoadCategories,
    onSetActiveCategory,
    onAddCategory,
    onUpdateCategory,
    onRemoveCategory,
    onCategoryError,
    onClearCategoryError,
} from "../slices/budgetCategorySlice";
import saldoAppApi from "../../../lib/api/saldoAppApi";
import { SwalCustom } from "../../../lib/utils/swal-custom";

export const useBudgetCategoriesStore = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, activeCategory, isLoadingCategories, errorMessage } =
        useSelector((state: RootState) => state.budgetCategories);

    //* Set active category
    const setActiveCategory = (category: BudgetCategory | null) => {
        dispatch(onSetActiveCategory(category));
    };

    //* Load all budget categories (optionally filtered by monthlyBudgetId)
    const startLoadingBudgetCategories = useCallback(
        async (monthlyBudgetId?: number): Promise<void> => {
            try {
                dispatch(onStartLoading());

                let url = "/budget-categories";
                if (monthlyBudgetId) {
                    url += `?monthlyBudgetId=${monthlyBudgetId}`;
                }

                const { data } = await saldoAppApi.get(url);
                dispatch(onLoadCategories(data));
            } catch (error: any) {
                if (error?.response?.status === 401) {
                    dispatch(onLoadCategories([]));
                    return;
                }

                const message =
                    error?.response?.data?.message ||
                    "Error al cargar las categorías de presupuesto.";
                SwalCustom.error("Error", message);
                dispatch(onCategoryError(message));
            }
        },
        [dispatch],
    );

    //* Save (create or update) a budget category
    const startSavingBudgetCategory = async (
        category: Partial<BudgetCategory>,
    ): Promise<void> => {
        try {
            if (category.id) {
                // Update
                const { data } = await saldoAppApi.put(
                    `/budget-categories/${category.id}`,
                    {
                        name: category.name,
                        target_percentage: category.target_percentage,
                        target_amount: category.target_amount,
                    },
                );

                dispatch(onUpdateCategory(data));
                SwalCustom.success(
                    "Categoría actualizada",
                    "La categoría se actualizó correctamente.",
                );
            } else {
                // Create
                const { data } = await saldoAppApi.post("/budget-categories", {
                    monthly_budget_id: category.monthly_budget_id,
                    name: category.name,
                    target_percentage: category.target_percentage,
                    target_amount: category.target_amount,
                });

                dispatch(onAddCategory(data));
                SwalCustom.success(
                    "Categoría creada",
                    "La nueva categoría se creó correctamente.",
                );
            }
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "Error al guardar la categoría de presupuesto.";
            SwalCustom.error("Error", message);
            dispatch(onCategoryError(message));
            throw new Error(message);
        }
    };

    //* Delete a budget category
    const startDeletingBudgetCategory = async (
        category: BudgetCategory,
    ): Promise<void> => {
        try {
            await saldoAppApi.delete(`/budget-categories/${category.id}`);
            dispatch(onRemoveCategory(category.id));
            SwalCustom.success(
                "Categoría eliminada",
                "La categoría se eliminó correctamente.",
            );
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "Error al eliminar la categoría de presupuesto.";
            SwalCustom.error("Error", message);
            dispatch(onCategoryError(message));
            throw new Error(message);
        }
    };

    //* Clear error
    const clearCategoryError = () => {
        dispatch(onClearCategoryError());
    };

    return {
        //* Properties
        categories,
        activeCategory,
        isLoadingCategories,
        errorMessage,

        //* Methods
        setActiveCategory,
        startLoadingBudgetCategories,
        startSavingBudgetCategory,
        startDeletingBudgetCategory,
        clearCategoryError,
    };
};
