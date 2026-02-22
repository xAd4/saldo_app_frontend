import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../stores/store";
import type { LoginCredentials, RegisterCredentials } from "../../../types";
import {
    onChecking,
    onStartLoading,
    onLogin,
    onRegister,
    onLogout,
    onAuthError,
    onPersistentUser,
    onClearError,
} from "../slices/authSlice";
import saldoAppApi from "../../../lib/api/saldoAppApi";
import { SwalCustom } from "../../../lib/utils/swal-custom";

export const useAuthStore = () => {
    const { status, user, errorMessage, isLoadingAuth, actualUser, token } =
        useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    //* Login
    const startLogin = async (credentials: LoginCredentials) => {
        sessionStorage.clear();
        dispatch(onChecking());
        dispatch(onStartLoading());
        try {
            const { data } = await saldoAppApi.post("/auth/login", {
                email: credentials.email,
                password: credentials.password,
            });

            sessionStorage.setItem("token", data.access_token);
            sessionStorage.setItem(
                "token-init-date",
                new Date().getTime().toString(),
            );

            dispatch(onLogin({ ...data }));
        } catch (error: any) {
            const errorResponse = error?.response?.data;
            const message =
                errorResponse?.message || error?.message || "Error en el login";
            SwalCustom.error("Error en la autenticación", JSON.stringify(message));
            dispatch(onAuthError(message));
        }
    };

    //* Register
    const startRegister = async (credentials: RegisterCredentials) => {
        sessionStorage.clear();
        dispatch(onChecking());
        dispatch(onStartLoading());
        try {
            const { data } = await saldoAppApi.post("/auth/register", {
                email: credentials.email,
                password: credentials.password,
            });

            sessionStorage.setItem("token", data.access_token);
            sessionStorage.setItem(
                "token-init-date",
                new Date().getTime().toString(),
            );

            dispatch(onRegister({ ...data }));
        } catch (error: any) {
            const errorResponse = error?.response?.data;
            const message =
                errorResponse?.message || error?.message || "Error en el registro";
            SwalCustom.error("Error en el registro", JSON.stringify(message));
            dispatch(onAuthError(message));
        }
    };

    //* Persistent User (obtener perfil del usuario autenticado)
    const startPersistentUser = async () => {
        try {
            const { data } = await saldoAppApi.get("/auth/profile");
            dispatch(onPersistentUser(data));
        } catch (error) {
            console.error(
                "No se pudieron obtener los datos del usuario actual.",
                error,
            );
        }
    };

    //* Check Auth Token (verificar si hay sesión activa)
    const checkAuthToken = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) return dispatch(onLogout());

        try {
            dispatch(onChecking());
            const { data } = await saldoAppApi.get("/auth/profile");
            dispatch(
                onLogin({
                    user: data,
                    access_token: token,
                }),
            );
        } catch {
            sessionStorage.clear();
            dispatch(onLogout());
        }
    };

    //* Logout
    const startLogout = () => {
        sessionStorage.clear();
        dispatch(onLogout());
    };

    //* Clear Error
    const clearError = () => {
        dispatch(onClearError());
    };

    return {
        //* Properties
        status,
        user,
        errorMessage,
        isLoadingAuth,
        actualUser,
        token,

        //* Methods
        startLogin,
        startRegister,
        startPersistentUser,
        checkAuthToken,
        startLogout,
        clearError,
    };
};
