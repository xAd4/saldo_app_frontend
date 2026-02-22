import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/useAppDispatch";
import { removeCategory } from "../slices/budgetCategorySlice";

export default function BudgetCategoriesPage() {
  const dispatch = useAppDispatch();
  const { categories, isLoading } = useAppSelector((state) => state.budgetCategories);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", target_percentage: "", monthly_budget_id: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create category:", formData);
    setShowForm(false);
    setFormData({ name: "", target_percentage: "", monthly_budget_id: "" });
  };

  const handleDelete = (id: number) => { dispatch(removeCategory(id)); };

  const TagIcon = ({ size = 22 }: { size?: number }) => (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  );

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
          <h1 className="text-white tracking-tight" style={{ fontSize: 28, fontWeight: 700 }}>Categorías de Presupuesto</h1>
          <p className="text-slate-400" style={{ fontSize: 15, marginTop: 6 }}>Organiza tus gastos por categorías</p>
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
            {showForm ? "Cancelar" : "Nueva Categoría"}
          </span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div className="rounded-lg flex items-center justify-center" style={{ width: 36, height: 36, backgroundColor: 'rgba(6,182,212,0.12)', color: '#22d3ee' }}>
              <TagIcon size={18} />
            </div>
            <h3 className="text-white font-semibold" style={{ fontSize: 17 }}>Nueva Categoría</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            <div>
              <label htmlFor="cat-name" className="block text-sm font-medium text-slate-300" style={{ marginBottom: 8 }}>Nombre</label>
              <input id="cat-name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Ej: Comida, Transporte..."
                className="w-full rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                style={{ padding: '12px 16px', fontSize: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
            <div>
              <label htmlFor="target_percentage" className="block text-sm font-medium text-slate-300" style={{ marginBottom: 8 }}>Porcentaje objetivo</label>
              <input id="target_percentage" name="target_percentage" type="number" step="0.01" min="0" max="1" value={formData.target_percentage} onChange={handleChange} placeholder="0.30"
                className="w-full rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                style={{ padding: '12px 16px', fontSize: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <button type="submit" className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg shadow-emerald-500/20"
              style={{ padding: '12px 28px', fontSize: 14 }}>Guardar Categoría</button>
          </div>
        </form>
      )}

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center" style={{ padding: '80px 0' }}>
          <div className="w-10 h-10 rounded-full animate-spin" style={{ border: '2px solid rgba(6,182,212,0.2)', borderTopColor: '#22d3ee' }} />
        </div>
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center animate-fade-in-up-delay-1" style={{ padding: '80px 0' }}>
          <div className="rounded-2xl flex items-center justify-center" style={{ width: 72, height: 72, backgroundColor: 'rgba(100,116,139,0.08)', marginBottom: 20 }}>
            <span className="text-slate-500"><TagIcon size={32} /></span>
          </div>
          <p className="text-slate-400 font-medium" style={{ fontSize: 15 }}>No tienes categorías de presupuesto</p>
          <p className="text-slate-600" style={{ fontSize: 13, marginTop: 6 }}>Las categorías te ayudan a organizar tus gastos</p>
        </div>
      ) : (
        <div className="animate-fade-in-up-delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {categories.map((cat) => (
            <div key={cat.id} className="rounded-2xl backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 group"
              style={{ backgroundColor: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div className="rounded-xl flex items-center justify-center" style={{ width: 44, height: 44, backgroundColor: 'rgba(6,182,212,0.12)', color: '#22d3ee' }}>
                  <TagIcon />
                </div>
                <button onClick={() => handleDelete(cat.id)} className="rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100" style={{ padding: 8 }}>
                  <TrashIcon />
                </button>
              </div>
              <h3 className="text-white font-semibold" style={{ fontSize: 17 }}>{cat.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                <span className="rounded-full text-xs font-medium" style={{ padding: '3px 10px', backgroundColor: 'rgba(6,182,212,0.12)', color: '#22d3ee' }}>
                  {(cat.target_percentage * 100).toFixed(0)}% del ingreso
                </span>
                <span className="font-bold" style={{ color: '#34d399', fontSize: 16 }}>${cat.target_amount.toFixed(2)}</span>
              </div>
              <div className="rounded-full overflow-hidden" style={{ height: 6, marginTop: 16, backgroundColor: 'rgba(30,41,59,0.8)' }}>
                <div className="rounded-full" style={{ height: '100%', width: `${cat.target_percentage * 100}%`, background: 'linear-gradient(90deg, #34d399, #22d3ee)', boxShadow: '0 0 8px rgba(16,185,129,0.4)', transition: 'width 0.5s' }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
