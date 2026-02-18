import { useAppSelector } from "../../hooks/useAppDispatch";

interface NavbarProps {
  onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
      <div className="flex items-center justify-between px-6 sm:px-8 py-5">
        {/* Botón hamburguesa (móvil) */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Título / Bienvenida */}
        <div className="hidden lg:block">
          <h2 className="text-xl font-semibold text-white">
            Bienvenido{user?.email ? `, ${user.email}` : ""}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Controla tus finanzas personales
          </p>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-4">
          {/* Notificaciones */}
          <button className="relative p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse ring-2 ring-slate-900" />
          </button>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-slate-900 font-bold text-sm cursor-pointer hover:shadow-lg hover:shadow-emerald-500/25 transition-shadow">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
