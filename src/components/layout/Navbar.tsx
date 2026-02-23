import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/useAppDispatch";
import { onLogout as logout } from "../../features/auth/slices/authSlice";
import InstallPWAButton from "../pwa/InstallPWAButton";

interface NavbarProps {
  onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setProfileOpen(false);
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const userInitial = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <header
      className="sticky top-0 backdrop-blur-2xl"
      style={{
        zIndex: 30,
        backgroundColor: "rgba(2,6,23,0.75)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ padding: "16px 24px" }}
      >
        {/* Left: Hamburger + Welcome */}
        <div className="flex items-center" style={{ gap: 16 }}>
          {/* Mobile hamburger */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden rounded-xl text-slate-400 hover:text-white transition-all duration-200"
            style={{
              padding: 10,
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          {/* Welcome text (desktop) */}
          <div className="hidden lg:block">
            <div className="flex items-center" style={{ gap: 8 }}>
              <h2 className="text-white font-semibold" style={{ fontSize: 18 }}>
                {greeting()}
              </h2>
              {user?.email && (
                <span
                  className="text-slate-400 font-normal"
                  style={{ fontSize: 18 }}
                >
                  · {user.email.split("@")[0]}
                </span>
              )}
            </div>
            <p
              className="text-slate-500"
              style={{ fontSize: 13, marginTop: 2 }}
            >
              Gestiona y controla tus finanzas personales
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center" style={{ gap: 12 }}>
          {/* Install PWA */}
          <InstallPWAButton />

          {/* Search button */}
          <button
            className="rounded-xl text-slate-400 hover:text-white transition-all duration-200 hidden sm:flex items-center"
            style={{
              padding: "8px 14px",
              gap: 8,
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <span style={{ fontSize: 13, color: "#64748b" }}>Buscar...</span>
            <span
              className="rounded text-xs text-slate-600"
              style={{
                padding: "2px 6px",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.06)",
                fontSize: 11,
              }}
            >
              ⌘K
            </span>
          </button>

          {/* Notifications */}
          <button
            className="relative rounded-xl text-slate-400 hover:text-white transition-all duration-200"
            style={{
              padding: 10,
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            {/* Notification dot */}
            <span
              className="absolute animate-pulse rounded-full"
              style={{
                top: 8,
                right: 8,
                width: 8,
                height: 8,
                backgroundColor: "#34d399",
                boxShadow: "0 0 8px rgba(52,211,153,0.6)",
              }}
            />
          </button>

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center rounded-xl transition-all duration-200"
              style={{
                gap: 10,
                padding: "6px 12px 6px 6px",
                backgroundColor: profileOpen
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${profileOpen ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              <div
                className="rounded-lg bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 flex items-center justify-center text-slate-900 font-bold"
                style={{ width: 32, height: 32, fontSize: 13 }}
              >
                {userInitial}
              </div>
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="text-slate-500 hidden sm:block"
                style={{
                  transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div
                className="absolute right-0 rounded-2xl backdrop-blur-2xl"
                style={{
                  marginTop: 8,
                  width: 240,
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 16px 64px rgba(0,0,0,0.5)",
                  padding: 8,
                  zIndex: 50,
                }}
              >
                {/* User info */}
                <div style={{ padding: "12px 12px 14px" }}>
                  <div className="flex items-center" style={{ gap: 10 }}>
                    <div
                      className="rounded-lg bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 flex items-center justify-center text-slate-900 font-bold"
                      style={{ width: 36, height: 36, fontSize: 14 }}
                    >
                      {userInitial}
                    </div>
                    <div style={{ overflow: "hidden" }}>
                      <p
                        className="text-white font-medium"
                        style={{ fontSize: 14 }}
                      >
                        {user?.email?.split("@")[0] || "Usuario"}
                      </p>
                      <p
                        className="text-slate-500 truncate"
                        style={{ fontSize: 12 }}
                      >
                        {user?.email || "sin email"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: 1,
                    backgroundColor: "rgba(255,255,255,0.06)",
                    margin: "0 4px",
                  }}
                />

                {/* Menu items */}
                <div style={{ padding: "6px 0" }}>
                  <button
                    className="w-full flex items-center text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    style={{ gap: 10, padding: "10px 12px", fontSize: 13 }}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    Mi Perfil
                  </button>
                  <button
                    className="w-full flex items-center text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    style={{ gap: 10, padding: "10px 12px", fontSize: 13 }}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Configuración
                  </button>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: 1,
                    backgroundColor: "rgba(255,255,255,0.06)",
                    margin: "0 4px",
                  }}
                />

                {/* Logout */}
                <div style={{ padding: "6px 0" }}>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                    style={{ gap: 10, padding: "10px 12px", fontSize: 13 }}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
