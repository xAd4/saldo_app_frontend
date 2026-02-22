import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks/useAppDispatch";
import { removeBudget } from "../slices/monthlyBudgetSlice";

const monthNames = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export default function MonthlyBudgetsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { budgets, isLoading } = useAppSelector((state) => state.monthlyBudgets);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ month: "", year: "", total_planned_income: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create budget:", formData);
    setShowForm(false);
    setFormData({ month: "", year: "", total_planned_income: "" });
  };

  const handleDelete = (id: number) => { dispatch(removeBudget(id)); };

  const TrashIcon = () => (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div className="animate-fade-in-up" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 className="text-white tracking-tight" style={{ fontSize: 28, fontWeight: 700 }}>Presupuestos Mensuales</h1>
          <p className="text-slate-400" style={{ fontSize: 15, marginTop: 6 }}>Administra tus presupuestos mes a mes</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0 group/btn relative overflow-hidden"
          style={{ gap: 8, padding: '12px 22px', fontSize: 14 }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-shimmer bg-[length:200%_100%] transition-opacity duration-300" />
          <span className="relative flex items-center" style={{ gap: 8 }}>
            {showForm ? (
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            )}
            {showForm ? "Cancelar" : "Nuevo Presupuesto"}
          </span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div className="rounded-lg flex items-center justify-center" style={{ width: 36, height: 36, backgroundColor: 'rgba(16,185,129,0.12)', color: '#34d399' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
            </div>
            <h3 className="text-white font-semibold" style={{ fontSize: 17 }}>Crear Presupuesto</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            <div>
              <label htmlFor="month" className="block text-sm font-medium text-slate-300" style={{ marginBottom: 8 }}>Mes</label>
              <select id="month" name="month" value={formData.month} onChange={handleChange}
                className="w-full rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                style={{ padding: '12px 16px', fontSize: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <option value="">Seleccionar</option>
                {monthNames.slice(1).map((name, i) => (<option key={i + 1} value={i + 1}>{name}</option>))}
              </select>
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-slate-300" style={{ marginBottom: 8 }}>Año</label>
              <input id="year" name="year" type="number" value={formData.year} onChange={handleChange} placeholder="2026"
                className="w-full rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                style={{ padding: '12px 16px', fontSize: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
            <div>
              <label htmlFor="total_planned_income" className="block text-sm font-medium text-slate-300" style={{ marginBottom: 8 }}>Ingreso planificado ($)</label>
              <input id="total_planned_income" name="total_planned_income" type="number" step="0.01" value={formData.total_planned_income} onChange={handleChange} placeholder="500.00"
                className="w-full rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                style={{ padding: '12px 16px', fontSize: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <button type="submit" className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg shadow-emerald-500/20"
              style={{ padding: '12px 28px', fontSize: 14 }}>Crear Presupuesto</button>
          </div>
        </form>
      )}

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center" style={{ padding: '80px 0' }}>
          <div className="w-10 h-10 rounded-full animate-spin" style={{ border: '2px solid rgba(16,185,129,0.2)', borderTopColor: '#34d399' }} />
        </div>
      ) : budgets.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center animate-fade-in-up-delay-1" style={{ padding: '80px 0' }}>
          <div className="rounded-2xl flex items-center justify-center" style={{ width: 72, height: 72, backgroundColor: 'rgba(100,116,139,0.08)', marginBottom: 20 }}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium" style={{ fontSize: 15 }}>No tienes presupuestos creados</p>
          <p className="text-slate-600" style={{ fontSize: 13, marginTop: 6 }}>Crea uno para comenzar a organizar tus finanzas</p>
        </div>
      ) : (
        <div className="animate-fade-in-up-delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {budgets.map((budget) => (
            <div key={budget.id} onClick={() => navigate(`/budgets/${budget.id}`)}
              className="rounded-2xl backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 cursor-pointer group"
              style={{ backgroundColor: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span className="rounded-full text-xs font-medium" style={{
                  padding: '5px 14px',
                  backgroundColor: budget.is_active ? 'rgba(16,185,129,0.12)' : 'rgba(100,116,139,0.15)',
                  color: budget.is_active ? '#34d399' : '#94a3b8',
                  border: `1px solid ${budget.is_active ? 'rgba(16,185,129,0.2)' : 'rgba(100,116,139,0.2)'}`,
                }}>
                  {budget.is_active ? "✓ Activo" : "Cerrado"}
                </span>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(budget.id); }}
                  className="rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100" style={{ padding: 8 }}>
                  <TrashIcon />
                </button>
              </div>
              <h3 className="text-white font-bold" style={{ fontSize: 20 }}>{monthNames[budget.month]} {budget.year}</h3>
              <p className="font-semibold" style={{ fontSize: 18, color: '#34d399', marginTop: 8 }}>${budget.total_planned_income.toFixed(2)}</p>
              <p className="text-slate-600" style={{ fontSize: 12, marginTop: 12 }}>Creado: {new Date(budget.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
