/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import type { RootState, AppDispatch } from "../../../stores/store";
import type { CategoryTemplate } from "../../../types";
import {
    onStartLoading,
    onLoadTemplates,
    onSetSelectedTemplate,
    onAddTemplate,
    onUpdateTemplate,
    onRemoveTemplate,
    onTemplateError,
    onClearTemplateError,
} from "../slices/categoryTemplateSlice";
import saldoAppApi from "../../../lib/api/saldoAppApi";
import { SwalCustom } from "../../../lib/utils/swal-custom";

export const useCategoryTemplateStore = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { templates, selectedTemplate, isLoadingTemplates, errorMessage } =
        useSelector((state: RootState) => state.categoryTemplates);

    //* Set selected template
    const setSelectedTemplate = (template: CategoryTemplate | null) => {
        dispatch(onSetSelectedTemplate(template));
    };

    //* Load all category templates
    const startLoadingCategoryTemplates = useCallback(async (): Promise<void> => {
        try {
            dispatch(onStartLoading());
            const { data } = await saldoAppApi.get("/category-templates");
            dispatch(onLoadTemplates(data));
        } catch (error: any) {
            if (error?.response?.status === 401) {
                dispatch(onLoadTemplates([]));
                return;
            }

            const message =
                error?.response?.data?.message ||
                "Error al cargar las plantillas de categoría.";
            SwalCustom.error("Error", message);
            dispatch(onTemplateError(message));
        }
    }, [dispatch]);

    //* Save (create or update) a category template
    const startSavingCategoryTemplate = async (
        template: Partial<CategoryTemplate>,
    ): Promise<void> => {
        try {
            if (template.id) {
                // Update
                const { data } = await saldoAppApi.put(
                    `/category-templates/${template.id}`,
                    {
                        name: template.name,
                        default_percentage: template.default_percentage,
                    },
                );

                dispatch(onUpdateTemplate(data));
                SwalCustom.success(
                    "Plantilla actualizada",
                    "La plantilla se actualizó correctamente.",
                );
            } else {
                // Create
                const { data } = await saldoAppApi.post("/category-templates", {
                    name: template.name,
                    default_percentage: template.default_percentage,
                });

                dispatch(onAddTemplate(data));
                SwalCustom.success(
                    "Plantilla creada",
                    "La nueva plantilla se creó correctamente.",
                );
            }
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "Error al guardar la plantilla de categoría.";
            SwalCustom.error("Error", message);
            dispatch(onTemplateError(message));
            throw new Error(message);
        }
    };

    //* Delete a category template
    const startDeletingCategoryTemplate = async (
        template: CategoryTemplate,
    ): Promise<void> => {
        try {
            await saldoAppApi.delete(`/category-templates/${template.id}`);
            dispatch(onRemoveTemplate(template.id));
            SwalCustom.success(
                "Plantilla eliminada",
                "La plantilla se eliminó correctamente.",
            );
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "Error al eliminar la plantilla de categoría.";
            SwalCustom.error("Error", message);
            dispatch(onTemplateError(message));
            throw new Error(message);
        }
    };

    //* Clear error
    const clearTemplateError = () => {
        dispatch(onClearTemplateError());
    };

    return {
        //* Properties
        templates,
        selectedTemplate,
        isLoadingTemplates,
        errorMessage,

        //* Methods
        setSelectedTemplate,
        startLoadingCategoryTemplates,
        startSavingCategoryTemplate,
        startDeletingCategoryTemplate,
        clearTemplateError,
    };
};
