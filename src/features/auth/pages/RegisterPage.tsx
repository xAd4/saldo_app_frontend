import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";

export default function RegisterPage() {
  const { isLoadingAuth, errorMessage, startRegister, clearError } =
    useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    if (formData.password.length < 6) {
      return;
    }

    await startRegister({
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return { level: 0, label: "", color: "" };
    if (pwd.length < 6) return { level: 1, label: "Débil", color: "#ef4444" };
    if (pwd.length < 8) return { level: 2, label: "Regular", color: "#f59e0b" };
    if (/(?=.*[A-Z])(?=.*[0-9])/.test(pwd)) return { level: 3, label: "Fuerte", color: "#22c55e" };
    return { level: 2, label: "Regular", color: "#f59e0b" };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden" style={{ padding: '24px 16px' }}>
      {/* ===== Multi-layer animated background ===== */}

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 animate-grid-fade"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating gradient orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-[120px] animate-float-orb-1" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/8 blur-[140px] animate-float-orb-2" />
      <div className="absolute top-[30%] right-[50%] w-[300px] h-[300px] rounded-full bg-violet-500/6 blur-[100px] animate-float-orb-3" />

      {/* Radial overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.5)_70%,rgba(2,6,23,0.9)_100%)]" />

      {/* ===== Content ===== */}
      <div className="relative z-10" style={{ width: '100%', maxWidth: 460 }}>
        {/* Logo & Header */}
        <div className="text-center animate-fade-in-up" style={{ marginBottom: 40 }}>
          {/* Animated Logo */}
          <div className="relative inline-flex items-center justify-center" style={{ marginBottom: 24 }}>
            {/* Rotating gradient ring */}
            <div className="absolute w-20 h-20 rounded-2xl animate-gradient-rotate">
              <div className="w-full h-full rounded-2xl bg-[conic-gradient(from_0deg,#34d399,#06b6d4,#a78bfa,#34d399)] opacity-60 blur-sm" />
            </div>
            {/* Logo body */}
            <div className="relative w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="text-slate-900"
              >
                <path
                  d="M8 12C8 9.79 9.79 8 12 8H20C22.21 8 24 9.79 24 12V14H8V12Z"
                  fill="currentColor"
                  opacity="0.7"
                />
                <path
                  d="M6 16H26V20C26 22.21 24.21 24 22 24H10C7.79 24 6 22.21 6 20V16Z"
                  fill="currentColor"
                />
                <rect x="11" y="18" width="10" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
              </svg>
            </div>
          </div>

          <h1 className="text-[28px] font-bold text-white tracking-tight">
            Crear Cuenta
          </h1>
          <p className="text-slate-400 text-[15px]" style={{ marginTop: 12 }}>
            Comienza a gestionar tus finanzas
          </p>
        </div>

        {/* ===== Card with animated border glow ===== */}
        <div className="relative animate-fade-in-up-delay-1">
          {/* Animated border glow */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-cyan-500/20 via-transparent to-emerald-500/20 animate-pulse-glow" />

          <form
            onSubmit={handleSubmit}
            className="relative backdrop-blur-2xl rounded-3xl shadow-[0_8px_64px_rgba(0,0,0,0.4)]"
            style={{ padding: '40px 36px', backgroundColor: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Error message */}
            {errorMessage && (
              <div className="rounded-2xl flex items-start gap-3" style={{ marginBottom: 28, padding: 16, backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
                <svg
                  className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-red-400 text-sm leading-relaxed">
                  {errorMessage}
                </span>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Email field */}
              <div className="group">
                <label
                  htmlFor="register-email"
                  className="block text-sm font-medium text-slate-300 transition-colors group-focus-within:text-emerald-400"
                  style={{ marginBottom: 10 }}
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-emerald-400">
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="w-full rounded-xl text-white placeholder-slate-500 text-[15px] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40 transition-all duration-300"
                    style={{ paddingLeft: 48, paddingRight: 16, paddingTop: 14, paddingBottom: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="group">
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-slate-300 transition-colors group-focus-within:text-emerald-400"
                  style={{ marginBottom: 10 }}
                >
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-emerald-400">
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                  <input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full rounded-xl text-white placeholder-slate-500 text-[15px] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40 transition-all duration-300"
                    style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 14, paddingBottom: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Password strength indicator */}
                {formData.password && (
                  <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 4, flex: 1 }}>
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="rounded-full"
                          style={{
                            height: 3,
                            flex: 1,
                            backgroundColor: i <= strength.level ? strength.color : 'rgba(100,116,139,0.3)',
                            transition: 'background-color 0.3s',
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs" style={{ color: strength.color }}>{strength.label}</span>
                  </div>
                )}
              </div>

              {/* Confirm Password field */}
              <div className="group">
                <label
                  htmlFor="register-confirmPassword"
                  className="block text-sm font-medium text-slate-300 transition-colors group-focus-within:text-emerald-400"
                  style={{ marginBottom: 10 }}
                >
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-emerald-400">
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <input
                    id="register-confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    className="w-full rounded-xl text-white placeholder-slate-500 text-[15px] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40 transition-all duration-300"
                    style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 14, paddingBottom: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showConfirmPassword ? (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Match indicator */}
                {formData.confirmPassword && (
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="text-xs" style={{ color: '#22c55e' }}>Las contraseñas coinciden</span>
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-xs" style={{ color: '#ef4444' }}>Las contraseñas no coinciden</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Accept terms */}
            <div style={{ marginTop: 24 }}>
              <label className="flex items-start gap-2.5 cursor-pointer group/check">
                <div className="relative" style={{ marginTop: 2 }}>
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-[18px] h-[18px] rounded-md border border-white/10 bg-slate-800/40 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all duration-200 flex items-center justify-center">
                    {acceptTerms && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-slate-400 group-hover/check:text-slate-300 transition-colors select-none leading-relaxed">
                  Acepto los{" "}
                  <span className="text-emerald-400 hover:text-emerald-300 cursor-pointer transition-colors">
                    Términos de Servicio
                  </span>{" "}
                  y la{" "}
                  <span className="text-emerald-400 hover:text-emerald-300 cursor-pointer transition-colors">
                    Política de Privacidad
                  </span>
                </span>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoadingAuth}
              className="relative w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold text-[15px] hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden group/btn"
              style={{ marginTop: 28, padding: '16px 16px' }}
            >
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-shimmer bg-[length:200%_100%] transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                {isLoadingAuth ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin-slow"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-25" />
                      <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    Crear Cuenta
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center" style={{ gap: 16, marginTop: 24, marginBottom: 24 }}>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
              <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">
                o
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </div>

            {/* Social register */}
            <button
              type="button"
              className="w-full rounded-xl text-slate-300 text-sm font-medium hover:bg-white/[0.06] transition-all duration-300 flex items-center justify-center"
              style={{ padding: '14px 16px', gap: 12, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Registrarse con Google
            </button>

            {/* Login link */}
            <p className="text-center text-sm text-slate-400" style={{ marginTop: 28 }}>
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-300"
              >
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-slate-600 animate-fade-in-up-delay-3" style={{ marginTop: 32 }}>
          Protegido con encriptación de extremo a extremo
          <span className="inline-flex items-center ml-1.5 align-middle">
            <svg
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="text-emerald-500/50"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </span>
        </p>
      </div>
    </div>
  );
}
