export interface Income {
  id: number;
  monthly_budget_id: number;
  amount: number;
  source: string;
  received_at: string;
}

export interface IncomeFormData {
  monthly_budget_id: number;
  amount: number;
  source: string;
  received_at: string;
}
