import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CategoryTemplate } from "../../../types";

interface CategoryTemplateState {
  templates: CategoryTemplate[];
  selectedTemplate: CategoryTemplate | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryTemplateState = {
  templates: [],
  selectedTemplate: null,
  isLoading: false,
  error: null,
};

const categoryTemplateSlice = createSlice({
  name: "categoryTemplates",
  initialState,
  reducers: {
    fetchTemplatesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchTemplatesSuccess(state, action: PayloadAction<CategoryTemplate[]>) {
      state.isLoading = false;
      state.templates = action.payload;
    },
    fetchTemplatesFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedTemplate(state, action: PayloadAction<CategoryTemplate | null>) {
      state.selectedTemplate = action.payload;
    },
    addTemplate(state, action: PayloadAction<CategoryTemplate>) {
      state.templates.push(action.payload);
    },
    updateTemplate(state, action: PayloadAction<CategoryTemplate>) {
      const index = state.templates.findIndex(
        (t) => t.id === action.payload.id,
      );
      if (index !== -1) {
        state.templates[index] = action.payload;
      }
    },
    removeTemplate(state, action: PayloadAction<number>) {
      state.templates = state.templates.filter((t) => t.id !== action.payload);
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  fetchTemplatesStart,
  fetchTemplatesSuccess,
  fetchTemplatesFailure,
  setSelectedTemplate,
  addTemplate,
  updateTemplate,
  removeTemplate,
  clearError,
} = categoryTemplateSlice.actions;

export default categoryTemplateSlice.reducer;
