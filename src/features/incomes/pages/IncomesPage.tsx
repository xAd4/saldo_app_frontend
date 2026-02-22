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
    console.log("Create income:", formData);
    setShowForm(false);
    setFormData({ amount: "", source: "", received_at: "", monthly_budget_id: "" });
  };

  const handleDelete = (id: number) => {
    dispatch(removeIncome(id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div className="animate-fade-in-up" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 className="text-white tracking-tight" style={{ fontSize: 28, fontWeight: 700 }}>Ingresos</h1>
          <p className="text-slate-400" style={{ fontSize: 15, marginTop: 6 }}>Registra y controla tus fuentes de ingreso</p>
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
            {showForm ? "Cancelar" : "Nuevo Ingreso"}
          </span>
        </button>
      </div>

      {/* Total summary card */}
      <div
        className="rounded-2xl animate-fade-in-up-delay-1"
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.03) 100%)',
          border: '1px solid rgba(16,185,129,0.18)',
          padding: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <div
          className="rounded-xl flex items-center justify-center shrink-0"
          style={{ width: 52, height: 52, backgroundColor: 'rgba(16,185,129,0.15)', color: '#34d399' }}
        >
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
          </svg>
        </div>
        <div>
          <p className="text-slate-400" style={{ fontSize: 13, marginBottom: 4 }}>Total de Ingresos</p>
          <p className="font-bold" style={{ fontSize: 30, color: '#34d399' }}>${totalIncome.toFixed(2)}</p>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: 32,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div className="rounded-lg flex items-center justify-center" style={{ width: 36, height: 36, backgroundColor: 'rgba(16,185,129,0.12)', color: '#34d399' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            </div>
            <h3 className="text-white font-semibold" style={{ fontSize: 17 }}>Registrar Ingreso</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-slate-300" style={{ marginBottom: 8 }}>Fuente</label>
              <input id="source" name="source" type="text" value={formData.source} onChange={handleChange} placeholder="Ej: Salario, Freelance"
                className="w-full rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                style={{ padding: '12px 16px', fontSize: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
            <div>
              <label htmlFor="income-amount" className="block text-sm font-medium text-slate-300" style={{ marginBottom: 8 }}>Monto ($)</label>
              <input id="income-amount" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} placeholder="300.00"
                className="w-full rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                style={{ padding: '12px 16px', fontSize: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
            <div>
              <label htmlFor="received_at" className="block text-sm font-medium text-slate-300" style={{ marginBottom: 8 }}>Fecha</label>
              <input id="received_at" name="received_at" type="date" value={formData.received_at} onChange={handleChange}
                className="w-full rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                style={{ padding: '12px 16px', fontSize: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <button type="submit" className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-emerald-500/20"
              style={{ padding: '12px 28px', fontSize: 14 }}>
              Guardar Ingreso
            </button>
          </div>
        </form>
      )}

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center" style={{ padding: '80px 0' }}>
          <div className="w-10 h-10 rounded-full animate-spin" style={{ border: '2px solid rgba(16,185,129,0.2)', borderTopColor: '#34d399' }} />
        </div>
      ) : incomes.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center animate-fade-in-up-delay-2" style={{ padding: '80px 0' }}>
          <div className="rounded-2xl flex items-center justify-center" style={{ width: 72, height: 72, backgroundColor: 'rgba(100,116,139,0.08)', marginBottom: 20 }}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium" style={{ fontSize: 15 }}>No tienes ingresos registrados</p>
          <p className="text-slate-600" style={{ fontSize: 13, marginTop: 6 }}>Registra tu primer ingreso para comenzar</p>
        </div>
      ) : (
        <div className="animate-fade-in-up-delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {incomes.map((income) => (
            <div
              key={income.id}
              className="rounded-2xl backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 group"
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <div className="flex items-center" style={{ gap: 16 }}>
                <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 44, height: 44, backgroundColor: 'rgba(16,185,129,0.12)', color: '#34d399' }}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium" style={{ fontSize: 15 }}>{income.source}</p>
                  <p className="text-slate-500" style={{ fontSize: 12, marginTop: 3 }}>
                    {new Date(income.received_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center" style={{ gap: 12 }}>
                <span className="font-bold" style={{ fontSize: 18, color: '#34d399' }}>+${income.amount.toFixed(2)}</span>
                <button
                  onClick={() => handleDelete(income.id)}
                  className="rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                  style={{ padding: 8 }}
                >
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
