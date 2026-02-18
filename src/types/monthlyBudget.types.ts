export interface MonthlyBudget {
  id: number;
  user_id: number;
  month: number;
  year: number;
  total_planned_income: number;
  is_active: boolean;
  created_at: string;
  closed_at: string | null;
}

export interface MonthlyBudgetFormData {
  month: number;
  year: number;
  total_planned_income: number;
}
