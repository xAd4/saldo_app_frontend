# Features

Agrupado por feature (dominio de negocio). Cada feature contiene:

```
feature/
├── slices/       # Redux Toolkit slices
├── pages/        # Páginas/vistas del feature
└── components/   # Componentes específicos del feature (opcional)
```

## Features disponibles

| Feature             | Descripción               | Slice                          | Páginas                             |
| ------------------- | ------------------------- | ------------------------------ | ----------------------------------- |
| `auth`              | Autenticación             | `authSlice`                    | Login, Register                     |
| `dashboard`         | Panel principal           | _usa slices de otros features_ | Dashboard                           |
| `categoryTemplates` | Plantillas de categoría   | `categoryTemplateSlice`        | CategoryTemplates                   |
| `monthlyBudgets`    | Presupuestos mensuales    | `monthlyBudgetSlice`           | MonthlyBudgets, MonthlyBudgetDetail |
| `savingsEntries`    | Entradas de ahorro        | `savingsEntrySlice`            | SavingsEntries                      |
| `incomes`           | Ingresos                  | `incomeSlice`                  | Incomes                             |
| `budgetCategories`  | Categorías de presupuesto | `budgetCategorySlice`          | BudgetCategories                    |
| `expenses`          | Gastos                    | `expenseSlice`                 | Expenses                            |
