export interface BudgetCategory {
  id: number;
  monthly_budget_id: number;
  name: string;
  target_percentage: number;
  target_amount: number;
}

export interface BudgetCategoryFormData {
  monthly_budget_id: number;
  name: string;
  target_percentage: number;
}
