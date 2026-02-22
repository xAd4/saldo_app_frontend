import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SavingsEntry } from "../../../types";

interface SavingsEntryState {
  entries: SavingsEntry[];
  totalSavings: number;
  isLoadingEntries: boolean;
  errorMessage: string | null;
}

const initialState: SavingsEntryState = {
  entries: [],
  totalSavings: 0,
  isLoadingEntries: false,
  errorMessage: null,
};

const savingsEntrySlice = createSlice({
  name: "savingsEntries",
  initialState,
  reducers: {
    onStartLoading(state) {
      state.isLoadingEntries = true;
      state.errorMessage = null;
    },
    onLoadEntries(state, action: PayloadAction<SavingsEntry[]>) {
      state.isLoadingEntries = false;
      state.entries = action.payload;
      state.totalSavings = action.payload.reduce(
        (sum, e) => sum + Number(e.amount),
        0,
      );
    },
    onAddEntry(state, action: PayloadAction<SavingsEntry>) {
      state.entries.push(action.payload);
      state.totalSavings += Number(action.payload.amount);
    },
    onUpdateEntry(state, action: PayloadAction<SavingsEntry>) {
      const index = state.entries.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.totalSavings -= Number(state.entries[index].amount);
        state.entries[index] = action.payload;
        state.totalSavings += Number(action.payload.amount);
      }
    },
    onRemoveEntry(state, action: PayloadAction<number>) {
      const entry = state.entries.find((e) => e.id === action.payload);
      if (entry) {
        state.totalSavings -= Number(entry.amount);
      }
      state.entries = state.entries.filter((e) => e.id !== action.payload);
    },
    onEntryError(state, action: PayloadAction<string>) {
      state.isLoadingEntries = false;
      state.errorMessage = action.payload;
    },
    onClearEntryError(state) {
      state.errorMessage = null;
    },
  },
});

export const {
  onStartLoading,
  onLoadEntries,
  onAddEntry,
  onUpdateEntry,
  onRemoveEntry,
  onEntryError,
  onClearEntryError,
} = savingsEntrySlice.actions;

export default savingsEntrySlice.reducer;
