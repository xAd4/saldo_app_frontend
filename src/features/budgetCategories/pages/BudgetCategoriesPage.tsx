import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/useAppDispatch";
import { removeCategory } from "../slices/budgetCategorySlice";

export default function BudgetCategoriesPage() {
  const dispatch = useAppDispatch();
  const { categories, isLoading } = useAppSelector(
    (state) => state.budgetCategories,
  );
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    target_percentage: "",
    monthly_budget_id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Conectar con API
    console.log("Create category:", formData);
    setShowForm(false);
    setFormData({ name: "", target_percentage: "", monthly_budget_id: "" });
  };

  const handleDelete = (id: number) => {
    // TODO: Conectar con API
    dispatch(removeCategory(id));
  };

  return (
    <div className="space-y-8 lg:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Categorías de Presupuesto
          </h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Organiza tus gastos por categorías
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-emerald-500/25 text-sm shrink-0"
        >
          <span className="text-lg">{showForm ? "✕" : "+"}</span>
          {showForm ? "Cancelar" : "Nueva Categoría"}
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 lg:p-8 space-y-6"
        >
          <h3 className="text-white font-semibold text-lg">Nueva Categoría</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Nombre de la categoría
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Comida, Transporte..."
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="target_percentage"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Porcentaje objetivo (decimal)
              </label>
              <input
                id="target_percentage"
                name="target_percentage"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={formData.target_percentage}
                onChange={handleChange}
                placeholder="0.30"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors text-sm"
            >
              Guardar Categoría
            </button>
          </div>
        </form>
      )}

      {/* Lista */}
      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-24">
          <span className="text-6xl block mb-4">📂</span>
          <p className="text-slate-400 text-lg">
            No tienes categorías de presupuesto
          </p>
          <p className="text-slate-600 text-sm mt-2">
            Las categorías te ayudan a organizar tus gastos
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 hover:border-emerald-500/30 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">📂</span>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                >
                  🗑️
                </button>
              </div>
              <h3 className="text-white font-semibold text-lg">
                {category.name}
              </h3>
              <div className="flex items-center justify-between mt-3">
                <p className="text-cyan-400 text-sm">
                  {(category.target_percentage * 100).toFixed(0)}% del ingreso
                </p>
                <p className="text-emerald-400 font-semibold">
                  ${category.target_amount.toFixed(2)}
                </p>
              </div>
              {/* Barra visual del porcentaje */}
              <div className="w-full bg-slate-800 rounded-full h-2 mt-4">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${category.target_percentage * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
