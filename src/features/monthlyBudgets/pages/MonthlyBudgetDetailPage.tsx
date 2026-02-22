import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useMonthlyBudgetStore } from "../hooks/useMonthlyBudgetStore";
import { useBudgetCategoriesStore } from "../../budgetCategories/hooks/useBudgetCategoriesStore";
import { useAppSelector } from "../../../hooks/useAppDispatch";

const monthNames = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function MonthlyBudgetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    budgets,
    isLoadingBudgets,
    startLoadingMonthlyBudgets,
  } = useMonthlyBudgetStore();
  const {
    categories,
    startLoadingBudgetCategories,
  } = useBudgetCategoriesStore();
  const { incomes, totalIncome } = useAppSelector((state) => state.incomes);
  const { totalExpenses } = useAppSelector((state) => state.expenses);

  // Load budgets and categories on mount
  useEffect(() => {
    startLoadingMonthlyBudgets();
  }, [startLoadingMonthlyBudgets]);

  useEffect(() => {
    if (id) {
      startLoadingBudgetCategories(Number(id));
    }
  }, [id, startLoadingBudgetCategories]);

  const budget = budgets.find((b) => b.id === Number(id));

  if (isLoadingBudgets) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ padding: "100px 0" }}
      >
        <div
          className="w-10 h-10 rounded-full animate-spin"
          style={{
            border: "2px solid rgba(16,185,129,0.2)",
            borderTopColor: "#34d399",
          }}
        />
      </div>
    );
  }

  if (!budget) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center"
        style={{ padding: "100px 0" }}
      >
        <div
          className="rounded-2xl flex items-center justify-center"
          style={{
            width: 72,
            height: 72,
            backgroundColor: "rgba(100,116,139,0.08)",
            marginBottom: 20,
          }}
        >
          <svg
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            className="text-slate-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <p className="text-slate-400 font-medium" style={{ fontSize: 16 }}>
          Presupuesto no encontrado
        </p>
        <Link
          to="/budgets"
          className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center"
          style={{ fontSize: 14, marginTop: 16, gap: 6 }}
        >
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Volver a presupuestos
        </Link>
      </div>
    );
  }

  const budgetCategories = categories.filter(
    (c) => c.monthly_budget_id === budget.id,
  );
  const budgetIncomes = incomes.filter(
    (i) => i.monthly_budget_id === budget.id,
  );
  const balance = totalIncome - totalExpenses;
  const usagePercent = Math.min(
    (totalExpenses / budget.total_planned_income) * 100,
    100,
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Breadcrumb & Header */}
      <div className="animate-fade-in-up">
        <Link
          to="/budgets"
          className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center"
          style={{ fontSize: 14, gap: 6, marginBottom: 16 }}
        >
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Volver a presupuestos
        </Link>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div>
            <h1
              className="text-white tracking-tight"
              style={{ fontSize: 28, fontWeight: 700 }}
            >
              {monthNames[budget.month]} {budget.year}
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 10,
              }}
            >
              <span
                className="rounded-full text-xs font-medium"
                style={{
                  padding: "5px 14px",
                  backgroundColor: budget.is_active
                    ? "rgba(16,185,129,0.12)"
                    : "rgba(100,116,139,0.15)",
                  color: budget.is_active ? "#34d399" : "#94a3b8",
                  border: `1px solid ${budget.is_active ? "rgba(16,185,129,0.2)" : "rgba(100,116,139,0.2)"}`,
                }}
              >
                {budget.is_active ? "✓ Activo" : "Cerrado"}
              </span>
              {budget.closed_at && (
                <span className="text-slate-500" style={{ fontSize: 12 }}>
                  Cerrado:{" "}
                  {new Date(budget.closed_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div
        className="animate-fade-in-up-delay-1"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        <div
          className="rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.03) 100%)",
            border: "1px solid rgba(16,185,129,0.18)",
            padding: 24,
          }}
        >
          <div
            className="rounded-xl flex items-center justify-center"
            style={{
              width: 40,
              height: 40,
              backgroundColor: "rgba(16,185,129,0.15)",
              color: "#34d399",
              marginBottom: 14,
            }}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p
            className="text-slate-400"
            style={{ fontSize: 13, marginBottom: 4 }}
          >
            Ingreso Planificado
          </p>
          <p className="font-bold" style={{ fontSize: 24, color: "#34d399" }}>
            ${Number(budget.total_planned_income).toFixed(2)}
          </p>
        </div>
        <div
          className="rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(239,68,68,0.03) 100%)",
            border: "1px solid rgba(239,68,68,0.18)",
            padding: 24,
          }}
        >
          <div
            className="rounded-xl flex items-center justify-center"
            style={{
              width: 40,
              height: 40,
              backgroundColor: "rgba(239,68,68,0.15)",
              color: "#f87171",
              marginBottom: 14,
            }}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </div>
          <p
            className="text-slate-400"
            style={{ fontSize: 13, marginBottom: 4 }}
          >
            Total Gastado
          </p>
          <p className="font-bold" style={{ fontSize: 24, color: "#f87171" }}>
            ${totalExpenses.toFixed(2)}
          </p>
        </div>
        <div
          className="rounded-2xl"
          style={{
            background:
              balance >= 0
                ? "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.03) 100%)"
                : "linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0.03) 100%)",
            border: `1px solid ${balance >= 0 ? "rgba(6,182,212,0.18)" : "rgba(249,115,22,0.18)"}`,
            padding: 24,
          }}
        >
          <div
            className="rounded-xl flex items-center justify-center"
            style={{
              width: 40,
              height: 40,
              backgroundColor:
                balance >= 0
                  ? "rgba(6,182,212,0.15)"
                  : "rgba(249,115,22,0.15)",
              color: balance >= 0 ? "#22d3ee" : "#fb923c",
              marginBottom: 14,
            }}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
          </div>
          <p
            className="text-slate-400"
            style={{ fontSize: 13, marginBottom: 4 }}
          >
            Balance
          </p>
          <p
            className="font-bold"
            style={{
              fontSize: 24,
              color: balance >= 0 ? "#22d3ee" : "#fb923c",
            }}
          >
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="rounded-2xl animate-fade-in-up-delay-2"
        style={{
          backgroundColor: "rgba(15,23,42,0.6)",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span className="text-slate-400" style={{ fontSize: 14 }}>
            Uso del presupuesto
          </span>
          <span
            className="text-white font-medium"
            style={{ fontSize: 14 }}
          >
            {usagePercent.toFixed(1)}%
          </span>
        </div>
        <div
          className="rounded-full overflow-hidden"
          style={{ height: 10, backgroundColor: "rgba(30,41,59,0.8)" }}
        >
          <div
            className="rounded-full transition-all duration-700"
            style={{
              height: "100%",
              width: `${usagePercent}%`,
              background:
                usagePercent > 80
                  ? "linear-gradient(90deg, #f59e0b, #ef4444)"
                  : "linear-gradient(90deg, #34d399, #22d3ee)",
              boxShadow:
                usagePercent > 80
                  ? "0 0 12px rgba(239,68,68,0.4)"
                  : "0 0 12px rgba(16,185,129,0.4)",
            }}
          />
        </div>
      </div>

      {/* Categories & Incomes */}
      <div
        className="animate-fade-in-up-delay-3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        {/* Categories */}
        <div
          className="rounded-2xl backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(15,23,42,0.6)",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <div className="flex items-center" style={{ gap: 10 }}>
              <div
                className="rounded-lg flex items-center justify-center"
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: "rgba(6,182,212,0.12)",
                  color: "#22d3ee",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6z"
                  />
                </svg>
              </div>
              <h3
                className="text-white font-semibold"
                style={{ fontSize: 16 }}
              >
                Categorías
              </h3>
            </div>
            <Link
              to="/categories"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
              style={{ fontSize: 12 }}
            >
              Ver todas →
            </Link>
          </div>
          {budgetCategories.length === 0 ? (
            <div
              className="flex flex-col items-center text-center"
              style={{ padding: "32px 0" }}
            >
              <div
                className="rounded-xl flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: "rgba(100,116,139,0.08)",
                  marginBottom: 12,
                }}
              >
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </div>
              <p className="text-slate-500" style={{ fontSize: 13 }}>
                Sin categorías asignadas
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {budgetCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="rounded-xl flex items-center justify-between"
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "rgba(30,41,59,0.3)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <div>
                    <p
                      className="text-white font-medium"
                      style={{ fontSize: 14 }}
                    >
                      {cat.name}
                    </p>
                    <p
                      className="text-slate-500"
                      style={{ fontSize: 12, marginTop: 2 }}
                    >
                      {(Number(cat.target_percentage) * 100).toFixed(0)}%
                    </p>
                  </div>
                  <p
                    className="font-semibold"
                    style={{ color: "#34d399", fontSize: 14 }}
                  >
                    ${Number(cat.target_amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Incomes */}
        <div
          className="rounded-2xl backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(15,23,42,0.6)",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <div className="flex items-center" style={{ gap: 10 }}>
              <div
                className="rounded-lg flex items-center justify-center"
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: "rgba(16,185,129,0.12)",
                  color: "#34d399",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3
                className="text-white font-semibold"
                style={{ fontSize: 16 }}
              >
                Ingresos
              </h3>
            </div>
            <Link
              to="/incomes"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
              style={{ fontSize: 12 }}
            >
              Ver todos →
            </Link>
          </div>
          {budgetIncomes.length === 0 ? (
            <div
              className="flex flex-col items-center text-center"
              style={{ padding: "32px 0" }}
            >
              <div
                className="rounded-xl flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: "rgba(100,116,139,0.08)",
                  marginBottom: 12,
                }}
              >
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </div>
              <p className="text-slate-500" style={{ fontSize: 13 }}>
                Sin ingresos registrados
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {budgetIncomes.map((income) => (
                <div
                  key={income.id}
                  className="rounded-xl flex items-center justify-between"
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "rgba(30,41,59,0.3)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <div>
                    <p
                      className="text-white font-medium"
                      style={{ fontSize: 14 }}
                    >
                      {income.source}
                    </p>
                    <p
                      className="text-slate-500"
                      style={{ fontSize: 12, marginTop: 2 }}
                    >
                      {new Date(income.received_at).toLocaleDateString()}
                    </p>
                  </div>
                  <p
                    className="font-semibold"
                    style={{ color: "#34d399", fontSize: 14 }}
                  >
                    ${Number(income.amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
