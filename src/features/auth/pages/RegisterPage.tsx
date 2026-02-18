import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppDispatch";
import {
  registerStart,
  registerFailure,
  clearError,
} from "../slices/authSlice";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      dispatch(registerFailure("Todos los campos son requeridos"));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      dispatch(registerFailure("Las contraseñas no coinciden"));
      return;
    }

    if (formData.password.length < 6) {
      dispatch(
        registerFailure("La contraseña debe tener al menos 6 caracteres"),
      );
      return;
    }

    dispatch(registerStart());
    // TODO: Conectar con API
    console.log("Register:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-slate-900 font-bold text-2xl shadow-xl shadow-emerald-500/25 mb-4">
            S
          </div>
          <h1 className="text-3xl font-bold text-white">Crear Cuenta</h1>
          <p className="text-slate-400 mt-2">
            Comienza a gestionar tus finanzas
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl"
        >
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-emerald-500/25"
          >
            {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-400">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
