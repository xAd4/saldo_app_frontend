import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks/useAppDispatch";
import { removeBudget } from "../slices/monthlyBudgetSlice";

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

export default function MonthlyBudgetsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { budgets, isLoading } = useAppSelector(
    (state) => state.monthlyBudgets,
  );
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    month: "",
    year: "",
    total_planned_income: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Conectar con API
    console.log("Create budget:", formData);
    setShowForm(false);
    setFormData({ month: "", year: "", total_planned_income: "" });
  };

  const handleDelete = (id: number) => {
    // TODO: Conectar con API
    dispatch(removeBudget(id));
  };

  return (
    <div className="space-y-8 lg:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Presupuestos Mensuales
          </h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Administra tus presupuestos mes a mes
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-emerald-500/25 text-sm shrink-0"
        >
          <span className="text-lg">{showForm ? "✕" : "+"}</span>
          {showForm ? "Cancelar" : "Nuevo Presupuesto"}
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 lg:p-8 space-y-6"
        >
          <h3 className="text-white font-semibold text-lg">
            Crear Presupuesto
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label
                htmlFor="month"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Mes
              </label>
              <select
                id="month"
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              >
                <option value="">Seleccionar</option>
                {monthNames.slice(1).map((name, i) => (
                  <option key={i + 1} value={i + 1}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Año
              </label>
              <input
                id="year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                placeholder="2026"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="total_planned_income"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Ingreso planificado ($)
              </label>
              <input
                id="total_planned_income"
                name="total_planned_income"
                type="number"
                step="0.01"
                value={formData.total_planned_income}
                onChange={handleChange}
                placeholder="500.00"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors text-sm"
            >
              Crear Presupuesto
            </button>
          </div>
        </form>
      )}

      {/* Lista de presupuestos */}
      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : budgets.length === 0 ? (
        <div className="text-center py-24">
          <span className="text-6xl block mb-4">📅</span>
          <p className="text-slate-400 text-lg">
            No tienes presupuestos creados
          </p>
          <p className="text-slate-600 text-sm mt-2">
            Crea uno para comenzar a organizar tus finanzas
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {budgets.map((budget) => (
            <div
              key={budget.id}
              onClick={() => navigate(`/budgets/${budget.id}`)}
              className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 hover:border-emerald-500/30 cursor-pointer transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${budget.is_active ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-400"}`}
                >
                  {budget.is_active ? "🟢 Activo" : "⚪ Cerrado"}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(budget.id);
                  }}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                >
                  🗑️
                </button>
              </div>
              <h3 className="text-white font-bold text-xl">
                {monthNames[budget.month]} {budget.year}
              </h3>
              <p className="text-emerald-400 font-semibold text-lg mt-2">
                ${budget.total_planned_income.toFixed(2)}
              </p>
              <p className="text-slate-600 text-xs mt-3">
                Creado: {new Date(budget.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
