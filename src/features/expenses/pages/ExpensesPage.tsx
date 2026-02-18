import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/useAppDispatch";
import { removeExpense } from "../slices/expenseSlice";

export default function ExpensesPage() {
  const dispatch = useAppDispatch();
  const { expenses, totalExpenses, isLoading } = useAppSelector(
    (state) => state.expenses,
  );
  const { categories } = useAppSelector((state) => state.budgetCategories);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    occurred_at: "",
    budget_category_id: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Conectar con API
    console.log("Create expense:", formData);
    setShowForm(false);
    setFormData({
      amount: "",
      description: "",
      occurred_at: "",
      budget_category_id: "",
    });
  };

  const handleDelete = (id: number) => {
    // TODO: Conectar con API
    dispatch(removeExpense(id));
  };

  const getCategoryName = (categoryId: number) => {
    return categories.find((c) => c.id === categoryId)?.name || "Sin categoría";
  };

  return (
    <div className="space-y-8 lg:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Gastos
          </h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Registra y rastrea cada gasto realizado
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-emerald-500/25 text-sm shrink-0"
        >
          <span className="text-lg">{showForm ? "✕" : "+"}</span>
          {showForm ? "Cancelar" : "Nuevo Gasto"}
        </button>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-2xl border border-red-500/20 p-6 lg:p-8">
        <p className="text-sm text-slate-400 mb-1">Total de Gastos</p>
        <p className="text-3xl sm:text-4xl font-bold text-red-400">
          ${totalExpenses.toFixed(2)}
        </p>
      </div>

      {/* Formulario */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 lg:p-8 space-y-6"
        >
          <h3 className="text-white font-semibold text-lg">Registrar Gasto</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Descripción
              </label>
              <input
                id="description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                placeholder="Ej: Almuerzo"
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
                placeholder="12.50"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="budget_category_id"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Categoría
              </label>
              <select
                id="budget_category_id"
                name="budget_category_id"
                value={formData.budget_category_id}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="occurred_at"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Fecha
              </label>
              <input
                id="occurred_at"
                name="occurred_at"
                type="date"
                value={formData.occurred_at}
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
              Guardar Gasto
            </button>
          </div>
        </form>
      )}

      {/* Lista */}
      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : expenses.length === 0 ? (
        <div className="text-center py-24">
          <span className="text-6xl block mb-4">🧾</span>
          <p className="text-slate-400 text-lg">No tienes gastos registrados</p>
          <p className="text-slate-600 text-sm mt-2">
            Registra tus gastos para un mejor control financiero
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-red-500/30 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-xl shrink-0">
                  🧾
                </div>
                <div>
                  <p className="text-white font-medium text-base">
                    {expense.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-400">
                      {getCategoryName(expense.budget_category_id)}
                    </span>
                    <span className="text-slate-600 text-xs">
                      {new Date(expense.occurred_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-red-400 font-bold text-xl">
                  -${expense.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => handleDelete(expense.id)}
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
