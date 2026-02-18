import { useAppSelector } from "../../../hooks/useAppDispatch";

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  const { activeBudget } = useAppSelector((state) => state.monthlyBudgets);
  const { totalIncome } = useAppSelector((state) => state.incomes);
  const { totalExpenses } = useAppSelector((state) => state.expenses);
  const { totalSavings } = useAppSelector((state) => state.savingsEntries);

  const balance = totalIncome - totalExpenses;

  const summaryCards = [
    {
      title: "Ingresos del Mes",
      value: `$${totalIncome.toFixed(2)}`,
      icon: "💰",
      gradient: "from-emerald-500/20 to-emerald-500/5",
      border: "border-emerald-500/20",
      textColor: "text-emerald-400",
    },
    {
      title: "Gastos del Mes",
      value: `$${totalExpenses.toFixed(2)}`,
      icon: "🧾",
      gradient: "from-red-500/20 to-red-500/5",
      border: "border-red-500/20",
      textColor: "text-red-400",
    },
    {
      title: "Balance",
      value: `$${balance.toFixed(2)}`,
      icon: "📊",
      gradient:
        balance >= 0
          ? "from-cyan-500/20 to-cyan-500/5"
          : "from-orange-500/20 to-orange-500/5",
      border: balance >= 0 ? "border-cyan-500/20" : "border-orange-500/20",
      textColor: balance >= 0 ? "text-cyan-400" : "text-orange-400",
    },
    {
      title: "Ahorros Totales",
      value: `$${totalSavings.toFixed(2)}`,
      icon: "🏦",
      gradient: "from-violet-500/20 to-violet-500/5",
      border: "border-violet-500/20",
      textColor: "text-violet-400",
    },
  ];

  return (
    <div className="space-y-8 lg:space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          Dashboard
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          {activeBudget
            ? `Presupuesto activo: ${activeBudget.month}/${activeBudget.year}`
            : "No hay presupuesto activo"}
        </p>
      </div>

      {/* Cards de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className={`bg-gradient-to-br ${card.gradient} rounded-2xl border ${card.border} p-6 lg:p-7 hover:scale-[1.02] transition-transform duration-200`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{card.icon}</span>
            </div>
            <p className="text-sm text-slate-400 mb-1">{card.title}</p>
            <p className={`text-2xl sm:text-3xl font-bold ${card.textColor}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Sección de presupuesto activo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
        {/* Ingreso planificado */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 lg:p-8">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-xl">📅</span> Presupuesto Mensual
          </h3>
          {activeBudget ? (
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Ingreso planificado</span>
                <span className="text-xl font-bold text-emerald-400">
                  ${activeBudget.total_planned_income.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Estado</span>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${activeBudget.is_active ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-400"}`}
                >
                  {activeBudget.is_active ? "Activo" : "Cerrado"}
                </span>
              </div>
              <div className="pt-2">
                <div className="w-full bg-slate-800 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((totalExpenses / activeBudget.total_planned_income) * 100, 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-slate-500 text-right mt-2">
                  {(
                    (totalExpenses / activeBudget.total_planned_income) *
                    100
                  ).toFixed(1)}
                  % gastado
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <span className="text-4xl mb-3">📭</span>
              <p className="text-slate-500 text-sm">
                No tienes un presupuesto activo.
              </p>
              <p className="text-slate-600 text-xs mt-1">
                Crea uno para comenzar a gestionar tus finanzas.
              </p>
            </div>
          )}
        </div>

        {/* Actividad reciente */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 lg:p-8">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-xl">⚡</span> Actividad Reciente
          </h3>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <span className="text-4xl mb-3">📝</span>
            <p className="text-slate-500 text-sm">
              Las transacciones recientes aparecerán aquí
            </p>
          </div>
        </div>
      </div>

      {/* Info del usuario */}
      {user && (
        <div className="bg-slate-900/40 rounded-xl border border-slate-800/50 p-5 text-xs text-slate-600">
          Conectado como: {user.email} · Cuenta creada: {user.created_at}
        </div>
      )}
    </div>
  );
}
