import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useAppDispatch";

const monthNames = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function MonthlyBudgetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { budgets } = useAppSelector((state) => state.monthlyBudgets);
  const { categories } = useAppSelector((state) => state.budgetCategories);
  const { incomes, totalIncome } = useAppSelector((state) => state.incomes);
  const { totalExpenses } = useAppSelector((state) => state.expenses);

  const budget = budgets.find((b) => b.id === Number(id));

  if (!budget) {
    return (
      <div className="text-center py-24">
        <span className="text-6xl block mb-4">🔍</span>
        <p className="text-slate-400 text-lg">Presupuesto no encontrado</p>
        <Link
          to="/budgets"
          className="text-emerald-400 hover:text-emerald-300 text-sm mt-4 inline-block"
        >
          ← Volver a presupuestos
        </Link>
      </div>
    );
  }

  const budgetCategories = categories.filter(
    (c) => c.monthly_budget_id === budget.id,
  );
  const budgetIncomes = incomes.filter(
    (i) => i.monthly_budget_id === budget.id,
  );
  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-8 lg:space-y-10">
      {/* Breadcrumb & Header */}
      <div>
        <Link
          to="/budgets"
          className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors inline-flex items-center gap-1.5 mb-4"
        >
          <span>←</span> Volver a presupuestos
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {monthNames[budget.month]} {budget.year}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${budget.is_active ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-400"}`}
              >
                {budget.is_active ? "🟢 Activo" : "⚪ Cerrado"}
              </span>
              {budget.closed_at && (
                <span className="text-xs text-slate-500">
                  Cerrado: {new Date(budget.closed_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Resumen financiero */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-2xl border border-emerald-500/20 p-6 lg:p-7">
          <p className="text-sm text-slate-400 mb-1">Ingreso Planificado</p>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-400">
            ${budget.total_planned_income.toFixed(2)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-2xl border border-red-500/20 p-6 lg:p-7">
          <p className="text-sm text-slate-400 mb-1">Total Gastado</p>
          <p className="text-2xl sm:text-3xl font-bold text-red-400">
            ${totalExpenses.toFixed(2)}
          </p>
        </div>
        <div
          className={`bg-gradient-to-br ${balance >= 0 ? "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20" : "from-orange-500/20 to-orange-500/5 border-orange-500/20"} rounded-2xl border p-6 lg:p-7`}
        >
          <p className="text-sm text-slate-400 mb-1">Balance</p>
          <p
            className={`text-2xl sm:text-3xl font-bold ${balance >= 0 ? "text-cyan-400" : "text-orange-400"}`}
          >
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="bg-slate-900/60 rounded-2xl border border-slate-700/50 p-6 lg:p-7">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-slate-400">Uso del presupuesto</span>
          <span className="text-sm font-medium text-white">
            {((totalExpenses / budget.total_planned_income) * 100).toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all duration-500 ${
              totalExpenses / budget.total_planned_income > 0.9
                ? "bg-gradient-to-r from-red-500 to-orange-500"
                : "bg-gradient-to-r from-emerald-500 to-cyan-500"
            }`}
            style={{
              width: `${Math.min((totalExpenses / budget.total_planned_income) * 100, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Categorías e Ingresos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
        {/* Categorías del presupuesto */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-xl">📂</span> Categorías
            </h3>
            <Link
              to="/categories"
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Ver todas →
            </Link>
          </div>
          {budgetCategories.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-3xl block mb-2">📭</span>
              <p className="text-slate-500 text-sm">Sin categorías asignadas</p>
            </div>
          ) : (
            <div className="space-y-3">
              {budgetCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-slate-700/30"
                >
                  <div>
                    <p className="text-white text-sm font-medium">{cat.name}</p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {(cat.target_percentage * 100).toFixed(0)}%
                    </p>
                  </div>
                  <p className="text-emerald-400 font-semibold">
                    ${cat.target_amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ingresos del presupuesto */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-xl">💰</span> Ingresos
            </h3>
            <Link
              to="/incomes"
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Ver todos →
            </Link>
          </div>
          {budgetIncomes.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-3xl block mb-2">📭</span>
              <p className="text-slate-500 text-sm">Sin ingresos registrados</p>
            </div>
          ) : (
            <div className="space-y-3">
              {budgetIncomes.map((income) => (
                <div
                  key={income.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-slate-700/30"
                >
                  <div>
                    <p className="text-white text-sm font-medium">
                      {income.source}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {new Date(income.received_at).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-emerald-400 font-semibold">
                    ${income.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
