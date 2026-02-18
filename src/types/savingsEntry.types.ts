export interface SavingsEntry {
  id: number;
  user_id: number;
  monthly_budget_id: number | null;
  amount: number;
  description: string;
  created_at: string;
}

export interface SavingsEntryFormData {
  monthly_budget_id?: number | null;
  amount: number;
  description: string;
}
