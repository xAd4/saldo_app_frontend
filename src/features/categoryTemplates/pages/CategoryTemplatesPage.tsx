import { useEffect, useState } from "react";
import { useCategoryTemplateStore } from "../hooks/useCategoryTemplateStore";
import { SwalCustom } from "../../../lib/utils/swal-custom";
import type { CategoryTemplate } from "../../../types";

export default function CategoryTemplatesPage() {
  const { templates, isLoadingTemplates, startLoadingCategoryTemplates, startSavingCategoryTemplate, startDeletingCategoryTemplate, setSelectedTemplate } = useCategoryTemplateStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", default_percentage: "" });

  useEffect(() => { startLoadingCategoryTemplates(); }, [startLoadingCategoryTemplates]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.default_percentage) { SwalCustom.error("Error", "Completa todos los campos requeridos."); return; }
    try {
      await startSavingCategoryTemplate({ name: formData.name.trim(), default_percentage: Number(formData.default_percentage) });
      setShowForm(false);
      setFormData({ name: "", default_percentage: "" });
      await startLoadingCategoryTemplates();
    } catch { /* handled in hook */ }
  };

  const handleDelete = async (template: CategoryTemplate) => {
    const result = await SwalCustom.confirm("¿Eliminar plantilla?", `Se eliminará la plantilla "${template.name}".`);
    if (result.isConfirmed) { try { await startDeletingCategoryTemplate(template); await startLoadingCategoryTemplates(); } catch { /* handled */ } }
  };

  const DocIcon = ({ size = 22 }: { size?: number }) => (<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>);
  const TrashIcon = () => (<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>);
  const EditIcon = () => (<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div className="animate-fade-in-up" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 className="text-white tracking-tight" style={{ fontSize: 28, fontWeight: 700 }}>Plantillas de Categoría</h1>
          <p className="text-slate-400" style={{ fontSize: 15, marginTop: 6 }}>Define las categorías por defecto para nuevos presupuestos</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0 group/btn relative overflow-hidden" style={{ gap: 8, padding: '12px 22px', fontSize: 14 }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-shimmer bg-[length:200%_100%] transition-opacity duration-300" />
          <span className="relative flex items-center" style={{ gap: 8 }}>
            {showForm ? (<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>) : (<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>)}
            {showForm ? "Cancelar" : "Nueva Plantilla"}
          </span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div className="rounded-lg flex items-center justify-center" style={{ width: 36, height: 36, backgroundColor: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}><DocIcon size={18} /></div>
            <h3 className="text-white font-semibold" style={{ fontSize: 17 }}>Nueva Plantilla</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            <div>
              <label htmlFor="tpl-name" className="block text-sm font-medium text-slate-300" style={{ marginBottom: 8 }}>Nombre de la categoría</label>
              <input id="tpl-name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Ej: Comida, Transporte..." className="w-full rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all" style={{ padding: '12px 16px', fontSize: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
            <div>
              <label htmlFor="default_percentage" className="block text-sm font-medium text-slate-300" style={{ marginBottom: 8 }}>Porcentaje por defecto (%)</label>
              <input id="default_percentage" name="default_percentage" type="number" step="0.01" min="0" max="1" value={formData.default_percentage} onChange={handleChange} placeholder="Ej: 0.30" className="w-full rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all" style={{ padding: '12px 16px', fontSize: 14, backgroundColor: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <button type="submit" className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg shadow-emerald-500/20" style={{ padding: '12px 28px', fontSize: 14 }}>Guardar Plantilla</button>
          </div>
        </form>
      )}

      {/* List */}
      {isLoadingTemplates ? (
        <div className="flex items-center justify-center" style={{ padding: '80px 0' }}><div className="w-10 h-10 rounded-full animate-spin" style={{ border: '2px solid rgba(139,92,246,0.2)', borderTopColor: '#a78bfa' }} /></div>
      ) : templates.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center animate-fade-in-up-delay-1" style={{ padding: '80px 0' }}>
          <div className="rounded-2xl flex items-center justify-center" style={{ width: 72, height: 72, backgroundColor: 'rgba(100,116,139,0.08)', marginBottom: 20 }}><span className="text-slate-500"><DocIcon size={32} /></span></div>
          <p className="text-slate-400 font-medium" style={{ fontSize: 15 }}>No tienes plantillas de categoría</p>
          <p className="text-slate-600" style={{ fontSize: 13, marginTop: 6 }}>Crea una para predefinir categorías en tus presupuestos</p>
        </div>
      ) : (
        <div className="animate-fade-in-up-delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {templates.map((template) => (
            <div key={template.id} className="rounded-2xl backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 group" style={{ backgroundColor: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div className="rounded-xl flex items-center justify-center" style={{ width: 44, height: 44, backgroundColor: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}><DocIcon /></div>
                <div className="flex opacity-0 group-hover:opacity-100 transition-opacity" style={{ gap: 4 }}>
                  <button onClick={() => setSelectedTemplate(template)} className="rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all" style={{ padding: 8 }}><EditIcon /></button>
                  <button onClick={() => handleDelete(template)} className="rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all" style={{ padding: 8 }}><TrashIcon /></button>
                </div>
              </div>
              <h3 className="text-white font-semibold" style={{ fontSize: 17 }}>{template.name}</h3>
              <span className="inline-block rounded-full text-xs font-medium" style={{ marginTop: 10, padding: '3px 10px', backgroundColor: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}>
                {(Number(template.default_percentage) * 100).toFixed(0)}% del ingreso
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
