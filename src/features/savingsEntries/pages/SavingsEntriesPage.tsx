import { useEffect, useState } from "react";
import { useSavingsEntryStore } from "../hooks/useSavingsEntryStore";
import { SwalCustom } from "../../../lib/utils/swal-custom";
import type { SavingsEntry } from "../../../types";

export default function SavingsEntriesPage() {
  const { entries, totalSavings, isLoadingEntries, startLoadingSavingsEntries, startSavingSavingsEntry, startDeletingSavingsEntry } = useSavingsEntryStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ amount: "", description: "", monthly_budget_id: "" });

  useEffect(() => { startLoadingSavingsEntries(); }, [startLoadingSavingsEntries]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description.trim() || !formData.amount) { SwalCustom.error("Error", "Completa todos los campos requeridos."); return; }
    try {
      await startSavingSavingsEntry({ amount: Number(formData.amount), description: formData.description.trim(), monthly_budget_id: formData.monthly_budget_id ? Number(formData.monthly_budget_id) : null });
      setShowForm(false);
      setFormData({ amount: "", description: "", monthly_budget_id: "" });
      await startLoadingSavingsEntries();
    } catch { /* handled in hook */ }
  };

  const handleDelete = async (entry: SavingsEntry) => {
    const result = await SwalCustom.confirm("¿Eliminar ahorro?", `Se eliminará "${entry.description}" de $${Number(entry.amount).toFixed(2)}.`);
    if (result.isConfirmed) { try { await startDeletingSavingsEntry(entry); await startLoadingSavingsEntries(); } catch { /* handled */ } }
  };

  const TrashIcon = () => (<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>);
  const BankIcon = ({ size = 22 }: { size?: number }) => (<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div className="animate-fade-in-up" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 className="text-white tracking-tight" style={{ fontSize: 28, fontWeight: 700 }}>Ahorros</h1>
          <p className="text-slate-400" style={{ fontSize: 15, marginTop: 6 }}>Entradas de ahorro y excedentes mensuales</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0 group/btn relative overflow-hidden" style={{ gap: 8, padding: '12px 22px', fontSize: 14 }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-shimmer bg-[length:200%_100%] transition-opacity duration-300" />
          <span className="relative flex items-center" style={{ gap: 8 }}>
            {showForm ? (<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>) : (<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>)}
            {showForm ? "Cancelar" : "Nuevo Ahorro"}
          </span>
        </button>
      </div>

      {/* Total */}
      <div className="rounded-2xl animate-fade-in-up-delay-1" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.03) 100%)', border: '1px solid rgba(139,92,246,0.18)', padding: 28, display: 'flex', alignItems: 'center', gap: 20 }}>
        <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 52, height: 52, backgroundColor: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}><BankIcon size={26} /></div>
        <div>
          <p className="text-slate-400" style={{ fontSize: 13, marginBottom: 4 }}>Total Ahorrado</p>
          <p className="font-bold" style={{ fontSize: 30, color: '#a78bfa' }}>${totalSavings.toFixed(2)}</p>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div className="rounded-lg flex items-center justify-center" style={{ width: 36, height: 36, backgroundColor: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            </div>
            <h3 className="text-white font-semibold" style={{ fontSize: 17 }}>Registrar Ahorro</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            <div>
              <label htmlFor="saving-amount" className="block text-sm font-medium text-slate-300" style={{ marginBottom: 8 }}>Monto ($)</label>
              <input id="saving-amount" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} placeholder="50.00" className="w-full rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all" style={{ padding: '12px 16px', fontSize: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
            <div>
              <label htmlFor="saving-desc" className="block text-sm font-medium text-slate-300" style={{ marginBottom: 8 }}>Descripción</label>
              <input id="saving-desc" name="description" type="text" value={formData.description} onChange={handleChange} placeholder="Ej: Excedente de Enero" className="w-full rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all" style={{ padding: '12px 16px', fontSize: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <button type="submit" className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg shadow-emerald-500/20" style={{ padding: '12px 28px', fontSize: 14 }}>Guardar Ahorro</button>
          </div>
        </form>
      )}

      {/* List */}
      {isLoadingEntries ? (
        <div className="flex items-center justify-center" style={{ padding: '80px 0' }}><div className="w-10 h-10 rounded-full animate-spin" style={{ border: '2px solid rgba(139,92,246,0.2)', borderTopColor: '#a78bfa' }} /></div>
      ) : entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center animate-fade-in-up-delay-2" style={{ padding: '80px 0' }}>
          <div className="rounded-2xl flex items-center justify-center" style={{ width: 72, height: 72, backgroundColor: 'rgba(100,116,139,0.08)', marginBottom: 20 }}><span className="text-slate-500"><BankIcon size={32} /></span></div>
          <p className="text-slate-400 font-medium" style={{ fontSize: 15 }}>No tienes entradas de ahorro</p>
          <p className="text-slate-600" style={{ fontSize: 13, marginTop: 6 }}>Los excedentes de tus presupuestos se acumularán aquí</p>
        </div>
      ) : (
        <div className="animate-fade-in-up-delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {entries.map((entry) => (
            <div key={entry.id} className="rounded-2xl backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 group" style={{ backgroundColor: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div className="flex items-center" style={{ gap: 16 }}>
                <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 44, height: 44, backgroundColor: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}><BankIcon /></div>
                <div>
                  <p className="text-white font-medium" style={{ fontSize: 15 }}>{entry.description}</p>
                  <p className="text-slate-500" style={{ fontSize: 12, marginTop: 3 }}>{new Date(entry.created_at).toLocaleDateString()}{entry.monthly_budget_id && ` · Presupuesto #${entry.monthly_budget_id}`}</p>
                </div>
              </div>
              <div className="flex items-center" style={{ gap: 12 }}>
                <span className="font-bold" style={{ fontSize: 18, color: '#a78bfa' }}>${Number(entry.amount).toFixed(2)}</span>
                <button onClick={() => handleDelete(entry)} className="rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100" style={{ padding: 8 }}><TrashIcon /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
