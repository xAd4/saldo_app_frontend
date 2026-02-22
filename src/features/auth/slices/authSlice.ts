import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../../types";

type AuthStatus = "checking" | "authenticated" | "not-authenticated";

interface AuthState {
  status: AuthStatus;
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  errorMessage: string | null;
  actualUser: User | null;
}

const initialState: AuthState = {
  status: "not-authenticated",
  user: null,
  token: null,
  isAuthenticated: false,
  isLoadingAuth: false,
  errorMessage: null,
  actualUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking(state) {
      state.status = "checking";
      state.errorMessage = null;
    },
    onStartLoading(state) {
      state.isLoadingAuth = true;
    },
    onLogin(
      state,
      action: PayloadAction<{ user: User; access_token: string }>,
    ) {
      state.status = "authenticated";
      state.isAuthenticated = true;
      state.isLoadingAuth = false;
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      state.errorMessage = null;
    },
    onRegister(
      state,
      action: PayloadAction<{ user: User; access_token: string }>,
    ) {
      state.status = "authenticated";
      state.isAuthenticated = true;
      state.isLoadingAuth = false;
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      state.errorMessage = null;
    },
    onLogout(state) {
      state.status = "not-authenticated";
      state.isAuthenticated = false;
      state.isLoadingAuth = false;
      state.user = null;
      state.token = null;
      state.errorMessage = null;
      state.actualUser = null;
    },
    onAuthError(state, action: PayloadAction<string>) {
      state.status = "not-authenticated";
      state.isAuthenticated = false;
      state.isLoadingAuth = false;
      state.user = null;
      state.token = null;
      state.errorMessage = action.payload;
    },
    onPersistentUser(state, action: PayloadAction<User>) {
      state.actualUser = action.payload;
    },
    onClearError(state) {
      state.errorMessage = null;
    },
  },
});

export const {
  onChecking,
  onStartLoading,
  onLogin,
  onRegister,
  onLogout,
  onAuthError,
  onPersistentUser,
  onClearError,
} = authSlice.actions;

export default authSlice.reducer;
