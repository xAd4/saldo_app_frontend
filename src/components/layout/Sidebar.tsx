import { NavLink } from "react-router-dom";
import { logout } from "../../features/auth/slices/authSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/budgets", label: "Presupuestos", icon: "📅" },
  { to: "/incomes", label: "Ingresos", icon: "💰" },
  { to: "/expenses", label: "Gastos", icon: "🧾" },
  { to: "/categories", label: "Categorías", icon: "📂" },
  { to: "/savings", label: "Ahorros", icon: "🏦" },
  { to: "/templates", label: "Plantillas", icon: "📋" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72
          bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
          border-r border-slate-700/50
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo / Brand */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-700/50">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-slate-900 font-bold text-xl shadow-lg shadow-emerald-500/25">
            S
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Saldo App
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Gestión financiera</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group
                ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-400 shadow-lg shadow-emerald-500/5 border border-emerald-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`
              }
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-5 border-t border-slate-700/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
          >
            <span className="text-xl">🚪</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}
