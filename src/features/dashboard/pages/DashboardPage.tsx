import { useAppSelector } from "../../../hooks/useAppDispatch";

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  const { activeBudget } = useAppSelector((state) => state.monthlyBudgets);
  const { totalIncome } = useAppSelector((state) => state.incomes);
  const { totalExpenses } = useAppSelector((state) => state.expenses);
  const { totalSavings } = useAppSelector((state) => state.savingsEntries);

  const balance = totalIncome - totalExpenses;

  const summaryCards = [
    {
      title: "Ingresos del Mes",
      value: `$${totalIncome.toFixed(2)}`,
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
      gradient: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.03) 100%)",
      borderColor: "rgba(16,185,129,0.2)",
      iconBg: "rgba(16,185,129,0.15)",
      iconColor: "#34d399",
      valueColor: "#34d399",
    },
    {
      title: "Gastos del Mes",
      value: `$${totalExpenses.toFixed(2)}`,
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      ),
      gradient: "linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.03) 100%)",
      borderColor: "rgba(239,68,68,0.2)",
      iconBg: "rgba(239,68,68,0.15)",
      iconColor: "#f87171",
      valueColor: "#f87171",
    },
    {
      title: "Balance",
      value: `$${balance.toFixed(2)}`,
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      gradient: balance >= 0
        ? "linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.03) 100%)"
        : "linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.03) 100%)",
      borderColor: balance >= 0 ? "rgba(6,182,212,0.2)" : "rgba(249,115,22,0.2)",
      iconBg: balance >= 0 ? "rgba(6,182,212,0.15)" : "rgba(249,115,22,0.15)",
      iconColor: balance >= 0 ? "#22d3ee" : "#fb923c",
      valueColor: balance >= 0 ? "#22d3ee" : "#fb923c",
    },
    {
      title: "Ahorros Totales",
      value: `$${totalSavings.toFixed(2)}`,
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
      ),
      gradient: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.03) 100%)",
      borderColor: "rgba(139,92,246,0.2)",
      iconBg: "rgba(139,92,246,0.15)",
      iconColor: "#a78bfa",
      valueColor: "#a78bfa",
    },
  ];

  const budgetPercentage = activeBudget
    ? Math.min((totalExpenses / activeBudget.total_planned_income) * 100, 100)
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div className="animate-fade-in-up">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 className="text-white tracking-tight" style={{ fontSize: 28, fontWeight: 700 }}>
              Dashboard
            </h1>
            {activeBudget && (
              <span
                className="rounded-full text-xs font-medium"
                style={{
                  padding: '4px 12px',
                  backgroundColor: 'rgba(16,185,129,0.15)',
                  color: '#34d399',
                  border: '1px solid rgba(16,185,129,0.2)',
                }}
              >
                {activeBudget.month}/{activeBudget.year}
              </span>
            )}
          </div>
          <p className="text-slate-400" style={{ fontSize: 15 }}>
            {activeBudget
              ? "Resumen de tu presupuesto activo"
              : "No hay presupuesto activo"}
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div
        className="animate-fade-in-up-delay-1"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
        }}
      >
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            style={{
              background: card.gradient,
              border: `1px solid ${card.borderColor}`,
              padding: 24,
              cursor: 'default',
            }}
          >
            {/* Icon */}
            <div
              className="rounded-xl flex items-center justify-center"
              style={{
                width: 44,
                height: 44,
                backgroundColor: card.iconBg,
                color: card.iconColor,
                marginBottom: 16,
              }}
            >
              {card.icon}
            </div>
            <p className="text-slate-400" style={{ fontSize: 13, marginBottom: 6 }}>
              {card.title}
            </p>
            <p className="font-bold" style={{ fontSize: 26, color: card.valueColor }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Two column section */}
      <div
        className="animate-fade-in-up-delay-2"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}
      >
        {/* Monthly Budget */}
        <div
          className="rounded-2xl backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: 32,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div
              className="rounded-lg flex items-center justify-center"
              style={{
                width: 36,
                height: 36,
                backgroundColor: 'rgba(16,185,129,0.12)',
                color: '#34d399',
              }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h3 className="text-white font-semibold" style={{ fontSize: 17 }}>
              Presupuesto Mensual
            </h3>
          </div>

          {activeBudget ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="flex justify-between items-center">
                <span className="text-slate-400" style={{ fontSize: 14 }}>Ingreso planificado</span>
                <span className="font-bold" style={{ fontSize: 20, color: '#34d399' }}>
                  ${activeBudget.total_planned_income.toFixed(2)}
                </span>
              </div>
              <div
                className="flex justify-between items-center"
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <span className="text-slate-400" style={{ fontSize: 14 }}>Estado</span>
                <span
                  className="rounded-full text-xs font-medium"
                  style={{
                    padding: '5px 14px',
                    backgroundColor: activeBudget.is_active ? 'rgba(16,185,129,0.15)' : 'rgba(100,116,139,0.2)',
                    color: activeBudget.is_active ? '#34d399' : '#94a3b8',
                    border: `1px solid ${activeBudget.is_active ? 'rgba(16,185,129,0.25)' : 'rgba(100,116,139,0.3)'}`,
                  }}
                >
                  {activeBudget.is_active ? "✓ Activo" : "Cerrado"}
                </span>
              </div>
              {/* Progress bar */}
              <div style={{ marginTop: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span className="text-slate-500" style={{ fontSize: 12 }}>Progreso de gasto</span>
                  <span className="text-slate-400 font-medium" style={{ fontSize: 12 }}>
                    {budgetPercentage.toFixed(1)}%
                  </span>
                </div>
                <div
                  className="rounded-full overflow-hidden"
                  style={{ height: 8, backgroundColor: 'rgba(30,41,59,0.8)' }}
                >
                  <div
                    className="rounded-full transition-all duration-700"
                    style={{
                      height: '100%',
                      width: `${budgetPercentage}%`,
                      background: budgetPercentage > 80
                        ? 'linear-gradient(90deg, #f59e0b, #ef4444)'
                        : 'linear-gradient(90deg, #34d399, #22d3ee)',
                      boxShadow: budgetPercentage > 80
                        ? '0 0 12px rgba(239,68,68,0.4)'
                        : '0 0 12px rgba(16,185,129,0.4)',
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center" style={{ padding: '40px 0' }}>
              <div
                className="rounded-2xl flex items-center justify-center"
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor: 'rgba(100,116,139,0.1)',
                  marginBottom: 16,
                }}
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-slate-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V21z" />
                </svg>
              </div>
              <p className="text-slate-400 font-medium" style={{ fontSize: 14 }}>
                No tienes un presupuesto activo
              </p>
              <p className="text-slate-600" style={{ fontSize: 13, marginTop: 6 }}>
                Crea uno para comenzar a gestionar tus finanzas.
              </p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div
          className="rounded-2xl backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: 32,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div
              className="rounded-lg flex items-center justify-center"
              style={{
                width: 36,
                height: 36,
                backgroundColor: 'rgba(6,182,212,0.12)',
                color: '#22d3ee',
              }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold" style={{ fontSize: 17 }}>
              Actividad Reciente
            </h3>
          </div>

          <div className="flex flex-col items-center justify-center text-center" style={{ padding: '40px 0' }}>
            <div
              className="rounded-2xl flex items-center justify-center"
              style={{
                width: 64,
                height: 64,
                backgroundColor: 'rgba(100,116,139,0.1)',
                marginBottom: 16,
              }}
            >
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-slate-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="text-slate-400 font-medium" style={{ fontSize: 14 }}>
              Sin actividad reciente
            </p>
            <p className="text-slate-600" style={{ fontSize: 13, marginTop: 6 }}>
              Las transacciones recientes aparecerán aquí
            </p>
          </div>
        </div>
      </div>

      {/* User info footer */}
      {user && (
        <div
          className="rounded-xl animate-fade-in-up-delay-3"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            border: '1px solid rgba(255,255,255,0.04)',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: 28,
              height: 28,
              backgroundColor: 'rgba(16,185,129,0.15)',
              color: '#34d399',
            }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <span className="text-slate-500" style={{ fontSize: 13 }}>
            Conectado como: <span className="text-slate-400">{user.email}</span>
          </span>
          <span className="text-slate-700" style={{ fontSize: 13 }}>·</span>
          <span className="text-slate-500" style={{ fontSize: 13 }}>
            Cuenta creada: <span className="text-slate-400">{user.created_at}</span>
          </span>
        </div>
      )}
    </div>
  );
}
