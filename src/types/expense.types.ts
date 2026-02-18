export interface Expense {
  id: number;
  budget_category_id: number;
  amount: number;
  description: string;
  occurred_at: string;
}

export interface ExpenseFormData {
  budget_category_id: number;
  amount: number;
  description: string;
  occurred_at: string;
}
