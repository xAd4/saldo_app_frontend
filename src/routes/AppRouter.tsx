import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppDispatch";

// Layout
import MainLayout from "../components/layout/MainLayout";

// Auth Pages
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

// Feature Pages
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import CategoryTemplatesPage from "../features/categoryTemplates/pages/CategoryTemplatesPage";
import MonthlyBudgetsPage from "../features/monthlyBudgets/pages/MonthlyBudgetsPage";
import MonthlyBudgetDetailPage from "../features/monthlyBudgets/pages/MonthlyBudgetDetailPage";
import SavingsEntriesPage from "../features/savingsEntries/pages/SavingsEntriesPage";
import IncomesPage from "../features/incomes/pages/IncomesPage";
import BudgetCategoriesPage from "../features/budgetCategories/pages/BudgetCategoriesPage";
import ExpensesPage from "../features/expenses/pages/ExpensesPage";

// Componente para rutas protegidas
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    // return <Navigate to="/login" replace />;
    console.log("Registrate");
  }

  return <>{children}</>;
}

// Componente para rutas públicas (redirige si ya está autenticado)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas (Auth) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Rutas protegidas con Layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/budgets" element={<MonthlyBudgetsPage />} />
          <Route path="/budgets/:id" element={<MonthlyBudgetDetailPage />} />
          <Route path="/incomes" element={<IncomesPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/categories" element={<BudgetCategoriesPage />} />
          <Route path="/savings" element={<SavingsEntriesPage />} />
          <Route path="/templates" element={<CategoryTemplatesPage />} />
        </Route>

        {/* Redireccionamiento por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
