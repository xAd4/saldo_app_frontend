import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/useAppDispatch";
import { useExpenseStore } from "../hooks/useExpenseStore";
import { SwalCustom } from "../../../lib/utils/swal-custom";
import type { Expense } from "../../../types";

export default function ExpensesPage() {
  const {
    expenses,
    totalExpenses,
    isLoadingExpenses,
    startLoadingExpenses,
    startSavingExpense,
    startDeletingExpense,
  } = useExpenseStore();

  const { categories } = useAppSelector((state) => state.budgetCategories);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    occurred_at: "",
    budget_category_id: "",
  });

  useEffect(() => {
    startLoadingExpenses();
  }, [startLoadingExpenses]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.description.trim() || !formData.amount || !formData.budget_category_id) {
      SwalCustom.error("Error", "Completa todos los campos requeridos.");
      return;
    }

    try {
      await startSavingExpense({
        budget_category_id: Number(formData.budget_category_id),
        amount: Number(formData.amount),
        description: formData.description.trim(),
      });

      setShowForm(false);
      setFormData({ amount: "", description: "", occurred_at: "", budget_category_id: "" });
      await startLoadingExpenses();
    } catch {
      // Error handled in hook
    }
  };

  const handleDelete = async (expense: Expense) => {
    const result = await SwalCustom.confirm(
      "¿Eliminar gasto?",
      `Se eliminará el gasto "${expense.description}" de $${Number(expense.amount).toFixed(2)}.`,
    );

    if (result.isConfirmed) {
      try {
        await startDeletingExpense(expense);
        await startLoadingExpenses();
      } catch {
        // Error handled in hook
      }
    }
  };

  const getCategoryName = (categoryId: number) => {
    return categories.find((c) => c.id === categoryId)?.name || "Sin categoría";
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div className="animate-fade-in-up" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 className="text-white tracking-tight" style={{ fontSize: 28, fontWeight: 700 }}>Gastos</h1>
          <p className="text-slate-400" style={{ fontSize: 15, marginTop: 6 }}>Registra y rastrea cada gasto realizado</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 group/btn relative overflow-hidden"
          style={{ gap: 8, padding: '12px 22px', fontSize: 14 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-shimmer bg-[length:200%_100%] transition-opacity duration-300" />
          <span className="relative flex items-center" style={{ gap: 8 }}>
            {showForm ? (
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            )}
            {showForm ? "Cancelar" : "Nuevo Gasto"}
          </span>
        </button>
      </div>

      {/* Total */}
      <div
        className="rounded-2xl animate-fade-in-up-delay-1"
        style={{
          background: 'linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(239,68,68,0.03) 100%)',
          border: '1px solid rgba(239,68,68,0.18)',
          padding: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 52, height: 52, backgroundColor: 'rgba(239,68,68,0.15)', color: '#f87171' }}>
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>
        <div>
          <p className="text-slate-400" style={{ fontSize: 13, marginBottom: 4 }}>Total de Gastos</p>
          <p className="font-bold" style={{ fontSize: 30, color: '#f87171' }}>${totalExpenses.toFixed(2)}</p>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: 32 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div className="rounded-lg flex items-center justify-center" style={{ width: 36, height: 36, backgroundColor: 'rgba(239,68,68,0.12)', color: '#f87171' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            </div>
            <h3 className="text-white font-semibold" style={{ fontSize: 17 }}>Registrar Gasto</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            <div>
              <label htmlFor="expense-desc" className="block text-sm font-medium text-slate-300" style={{ marginBottom: 8 }}>Descripción</label>
              <input id="expense-desc" name="description" type="text" value={formData.description} onChange={handleChange} placeholder="Ej: Almuerzo"
                className="w-full rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                style={{ padding: '12px 16px', fontSize: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
            <div>
              <label htmlFor="expense-amount" className="block text-sm font-medium text-slate-300" style={{ marginBottom: 8 }}>Monto ($)</label>
              <input id="expense-amount" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} placeholder="12.50"
                className="w-full rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                style={{ padding: '12px 16px', fontSize: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
            <div>
              <label htmlFor="budget_category_id" className="block text-sm font-medium text-slate-300" style={{ marginBottom: 8 }}>Categoría</label>
              <select id="budget_category_id" name="budget_category_id" value={formData.budget_category_id} onChange={handleChange}
                className="w-full rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                style={{ padding: '12px 16px', fontSize: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <option value="">Seleccionar categoría</option>
                {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <button type="submit" className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-emerald-500/20"
              style={{ padding: '12px 28px', fontSize: 14 }}>
              Guardar Gasto
            </button>
          </div>
        </form>
      )}

      {/* List */}
      {isLoadingExpenses ? (
        <div className="flex items-center justify-center" style={{ padding: '80px 0' }}>
          <div className="w-10 h-10 rounded-full animate-spin" style={{ border: '2px solid rgba(239,68,68,0.2)', borderTopColor: '#f87171' }} />
        </div>
      ) : expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center animate-fade-in-up-delay-2" style={{ padding: '80px 0' }}>
          <div className="rounded-2xl flex items-center justify-center" style={{ width: 72, height: 72, backgroundColor: 'rgba(100,116,139,0.08)', marginBottom: 20 }}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium" style={{ fontSize: 15 }}>No tienes gastos registrados</p>
          <p className="text-slate-600" style={{ fontSize: 13, marginTop: 6 }}>Registra tus gastos para un mejor control financiero</p>
        </div>
      ) : (
        <div className="animate-fade-in-up-delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {expenses.map((expense) => (
            <div key={expense.id} className="rounded-2xl backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 group"
              style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div className="flex items-center" style={{ gap: 16 }}>
                <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 44, height: 44, backgroundColor: 'rgba(239,68,68,0.12)', color: '#f87171' }}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium" style={{ fontSize: 15 }}>{expense.description}</p>
                  <div className="flex items-center" style={{ gap: 8, marginTop: 4 }}>
                    <span className="rounded-full text-xs" style={{ padding: '3px 10px', backgroundColor: 'rgba(100,116,139,0.15)', color: '#94a3b8', border: '1px solid rgba(100,116,139,0.15)' }}>
                      {getCategoryName(expense.budget_category_id)}
                    </span>
                    <span className="text-slate-600" style={{ fontSize: 12 }}>{new Date(expense.occurred_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center" style={{ gap: 12 }}>
                <span className="font-bold" style={{ fontSize: 18, color: '#f87171' }}>-${Number(expense.amount).toFixed(2)}</span>
                <button onClick={() => handleDelete(expense)} className="rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100" style={{ padding: 8 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
