import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CategoryTemplate } from "../../../types";

interface CategoryTemplateState {
  templates: CategoryTemplate[];
  selectedTemplate: CategoryTemplate | null;
  isLoadingTemplates: boolean;
  errorMessage: string | null;
}

const initialState: CategoryTemplateState = {
  templates: [],
  selectedTemplate: null,
  isLoadingTemplates: false,
  errorMessage: null,
};

const categoryTemplateSlice = createSlice({
  name: "categoryTemplates",
  initialState,
  reducers: {
    onStartLoading(state) {
      state.isLoadingTemplates = true;
      state.errorMessage = null;
    },
    onLoadTemplates(state, action: PayloadAction<CategoryTemplate[]>) {
      state.isLoadingTemplates = false;
      state.templates = action.payload;
    },
    onSetSelectedTemplate(
      state,
      action: PayloadAction<CategoryTemplate | null>,
    ) {
      state.selectedTemplate = action.payload;
    },
    onAddTemplate(state, action: PayloadAction<CategoryTemplate>) {
      state.templates.push(action.payload);
    },
    onUpdateTemplate(state, action: PayloadAction<CategoryTemplate>) {
      const index = state.templates.findIndex(
        (t) => t.id === action.payload.id,
      );
      if (index !== -1) {
        state.templates[index] = action.payload;
      }
    },
    onRemoveTemplate(state, action: PayloadAction<number>) {
      state.templates = state.templates.filter((t) => t.id !== action.payload);
    },
    onTemplateError(state, action: PayloadAction<string>) {
      state.isLoadingTemplates = false;
      state.errorMessage = action.payload;
    },
    onClearTemplateError(state) {
      state.errorMessage = null;
    },
  },
});

export const {
  onStartLoading,
  onLoadTemplates,
  onSetSelectedTemplate,
  onAddTemplate,
  onUpdateTemplate,
  onRemoveTemplate,
  onTemplateError,
  onClearTemplateError,
} = categoryTemplateSlice.actions;

export default categoryTemplateSlice.reducer;
