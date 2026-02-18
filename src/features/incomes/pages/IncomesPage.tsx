import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/useAppDispatch";
import { removeIncome } from "../slices/incomeSlice";

export default function IncomesPage() {
  const dispatch = useAppDispatch();
  const { incomes, totalIncome, isLoading } = useAppSelector(
    (state) => state.incomes,
  );
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    source: "",
    received_at: "",
    monthly_budget_id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Conectar con API
    console.log("Create income:", formData);
    setShowForm(false);
    setFormData({
      amount: "",
      source: "",
      received_at: "",
      monthly_budget_id: "",
    });
  };

  const handleDelete = (id: number) => {
    // TODO: Conectar con API
    dispatch(removeIncome(id));
  };

  return (
    <div className="space-y-8 lg:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Ingresos
          </h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Registra y controla tus fuentes de ingreso
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-emerald-500/25 text-sm shrink-0"
        >
          <span className="text-lg">{showForm ? "✕" : "+"}</span>
          {showForm ? "Cancelar" : "Nuevo Ingreso"}
        </button>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-2xl border border-emerald-500/20 p-6 lg:p-8">
        <p className="text-sm text-slate-400 mb-1">Total de Ingresos</p>
        <p className="text-3xl sm:text-4xl font-bold text-emerald-400">
          ${totalIncome.toFixed(2)}
        </p>
      </div>

      {/* Formulario */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 lg:p-8 space-y-6"
        >
          <h3 className="text-white font-semibold text-lg">
            Registrar Ingreso
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label
                htmlFor="source"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Fuente
              </label>
              <input
                id="source"
                name="source"
                type="text"
                value={formData.source}
                onChange={handleChange}
                placeholder="Ej: Salario, Freelance"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Monto ($)
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                placeholder="300.00"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="received_at"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Fecha
              </label>
              <input
                id="received_at"
                name="received_at"
                type="date"
                value={formData.received_at}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors text-sm"
            >
              Guardar Ingreso
            </button>
          </div>
        </form>
      )}

      {/* Lista */}
      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : incomes.length === 0 ? (
        <div className="text-center py-24">
          <span className="text-6xl block mb-4">💰</span>
          <p className="text-slate-400 text-lg">
            No tienes ingresos registrados
          </p>
          <p className="text-slate-600 text-sm mt-2">
            Registra tu primer ingreso para comenzar
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {incomes.map((income) => (
            <div
              key={income.id}
              className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500/30 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-xl shrink-0">
                  💰
                </div>
                <div>
                  <p className="text-white font-medium text-base">
                    {income.source}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    {new Date(income.received_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-emerald-400 font-bold text-xl">
                  +${income.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => handleDelete(income.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
