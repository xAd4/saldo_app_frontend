import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { onLogout as logout } from "../../features/auth/slices/authSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

// SVG icon components for crisp rendering
const icons = {
  dashboard: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  budgets: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  incomes: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  ),
  expenses: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  ),
  categories: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  ),
  savings: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  ),
  templates: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  logout: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
  ),
  collapse: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
    </svg>
  ),
  expand: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
    </svg>
  ),
};

type IconKey = keyof typeof icons;

const navSections = [
  {
    label: "General",
    items: [
      { to: "/dashboard", label: "Dashboard", iconKey: "dashboard" as IconKey },
      { to: "/budgets", label: "Presupuestos", iconKey: "budgets" as IconKey },
    ],
  },
  {
    label: "Finanzas",
    items: [
      { to: "/incomes", label: "Ingresos", iconKey: "incomes" as IconKey },
      { to: "/expenses", label: "Gastos", iconKey: "expenses" as IconKey },
      { to: "/savings", label: "Ahorros", iconKey: "savings" as IconKey },
    ],
  },
  {
    label: "Configuración",
    items: [
      { to: "/categories", label: "Categorías", iconKey: "categories" as IconKey },
      { to: "/templates", label: "Plantillas", iconKey: "templates" as IconKey },
    ],
  },
];

export default function Sidebar({ isOpen, onClose, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const sidebarWidth = isCollapsed ? 72 : 272;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm lg:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 40 }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className="flex flex-col transition-all duration-300 ease-in-out"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
          height: '100%',
          width: isOpen ? 272 : sidebarWidth,
          transform: isOpen ? 'translateX(0)' : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'translateX(0)' : `translateX(-100%)`),
          backgroundColor: 'rgba(8, 12, 28, 0.95)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Use CSS class for lg:static behavior */}
        <style>{`
          @media (min-width: 1024px) {
            aside { position: static !important; transform: none !important; z-index: auto !important; width: ${sidebarWidth}px !important; }
          }
        `}</style>

        {/* Logo / Brand */}
        <div
          className="flex items-center shrink-0"
          style={{
            padding: isCollapsed ? '20px 16px' : '20px 20px',
            gap: 12,
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
          }}
        >
          {/* Logo */}
          <div
            className="rounded-xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 flex items-center justify-center text-slate-900 shrink-0"
            style={{
              width: 40,
              height: 40,
              boxShadow: '0 4px 16px rgba(16,185,129,0.25)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <path d="M8 12C8 9.79 9.79 8 12 8H20C22.21 8 24 9.79 24 12V14H8V12Z" fill="currentColor" opacity="0.7" />
              <path d="M6 16H26V20C26 22.21 24.21 24 22 24H10C7.79 24 6 22.21 6 20V16Z" fill="currentColor" />
              <rect x="11" y="18" width="10" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
            </svg>
          </div>

          {/* Brand text (hidden when collapsed) */}
          {!isCollapsed && (
            <div style={{ overflow: 'hidden' }}>
              <h1 className="text-white font-bold tracking-tight" style={{ fontSize: 17, whiteSpace: 'nowrap' }}>
                Saldo App
              </h1>
              <p className="text-slate-500" style={{ fontSize: 11, marginTop: 1 }}>
                Gestión financiera
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto"
          style={{ padding: isCollapsed ? '16px 10px' : '16px 12px' }}
        >
          {navSections.map((section, sectionIndex) => (
            <div key={section.label} style={{ marginBottom: sectionIndex < navSections.length - 1 ? 24 : 0 }}>
              {/* Section label */}
              {!isCollapsed && (
                <p
                  className="uppercase tracking-wider font-semibold text-slate-600"
                  style={{
                    fontSize: 10,
                    padding: '0 12px',
                    marginBottom: 8,
                    letterSpacing: '0.1em',
                  }}
                >
                  {section.label}
                </p>
              )}

              {/* Section items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {section.items.map((item) => {
                  const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + "/");

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={onClose}
                      className="group relative flex items-center rounded-xl transition-all duration-200"
                      style={{
                        gap: isCollapsed ? 0 : 12,
                        padding: isCollapsed ? '12px 0' : '10px 12px',
                        fontSize: 14,
                        fontWeight: isActive ? 500 : 400,
                        color: isActive ? '#34d399' : '#94a3b8',
                        backgroundColor: isActive ? 'rgba(16,185,129,0.08)' : 'transparent',
                        border: isActive ? '1px solid rgba(16,185,129,0.15)' : '1px solid transparent',
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                      }}
                      title={isCollapsed ? item.label : undefined}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <div
                          className="absolute rounded-full"
                          style={{
                            left: isCollapsed ? '50%' : 0,
                            top: isCollapsed ? 'auto' : '50%',
                            bottom: isCollapsed ? 0 : 'auto',
                            transform: isCollapsed ? 'translateX(-50%)' : 'translateY(-50%)',
                            width: isCollapsed ? 16 : 3,
                            height: isCollapsed ? 3 : 16,
                            backgroundColor: '#34d399',
                            boxShadow: '0 0 8px rgba(52,211,153,0.5)',
                          }}
                        />
                      )}

                      <span
                        className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                        style={{ color: isActive ? '#34d399' : '#64748b' }}
                      >
                        {icons[item.iconKey]}
                      </span>

                      {!isCollapsed && (
                        <span className="transition-colors group-hover:text-white">
                          {item.label}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom section */}
        <div
          className="shrink-0"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            padding: isCollapsed ? '12px 10px' : '12px',
          }}
        >
          {/* Collapse toggle (desktop only) */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex w-full items-center rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all duration-200"
              style={{
                gap: 12,
                padding: isCollapsed ? '10px 0' : '10px 12px',
                fontSize: 13,
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                marginBottom: 4,
              }}
              title={isCollapsed ? "Expandir" : "Colapsar"}
            >
              {isCollapsed ? icons.expand : icons.collapse}
              {!isCollapsed && <span>Colapsar menú</span>}
            </button>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center rounded-xl text-red-400/80 hover:text-red-300 hover:bg-red-500/8 transition-all duration-200"
            style={{
              gap: 12,
              padding: isCollapsed ? '10px 0' : '10px 12px',
              fontSize: 14,
              justifyContent: isCollapsed ? 'center' : 'flex-start',
            }}
            title={isCollapsed ? "Cerrar Sesión" : undefined}
          >
            {icons.logout}
            {!isCollapsed && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
