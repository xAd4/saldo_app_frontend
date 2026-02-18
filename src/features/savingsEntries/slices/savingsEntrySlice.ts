import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SavingsEntry } from "../../../types";

interface SavingsEntryState {
  entries: SavingsEntry[];
  totalSavings: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: SavingsEntryState = {
  entries: [],
  totalSavings: 0,
  isLoading: false,
  error: null,
};

const savingsEntrySlice = createSlice({
  name: "savingsEntries",
  initialState,
  reducers: {
    fetchEntriesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchEntriesSuccess(state, action: PayloadAction<SavingsEntry[]>) {
      state.isLoading = false;
      state.entries = action.payload;
      state.totalSavings = action.payload.reduce((sum, e) => sum + e.amount, 0);
    },
    fetchEntriesFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addEntry(state, action: PayloadAction<SavingsEntry>) {
      state.entries.push(action.payload);
      state.totalSavings += action.payload.amount;
    },
    updateEntry(state, action: PayloadAction<SavingsEntry>) {
      const index = state.entries.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.totalSavings -= state.entries[index].amount;
        state.entries[index] = action.payload;
        state.totalSavings += action.payload.amount;
      }
    },
    removeEntry(state, action: PayloadAction<number>) {
      const entry = state.entries.find((e) => e.id === action.payload);
      if (entry) {
        state.totalSavings -= entry.amount;
      }
      state.entries = state.entries.filter((e) => e.id !== action.payload);
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  fetchEntriesStart,
  fetchEntriesSuccess,
  fetchEntriesFailure,
  addEntry,
  updateEntry,
  removeEntry,
  clearError,
} = savingsEntrySlice.actions;

export default savingsEntrySlice.reducer;
