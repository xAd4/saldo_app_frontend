export interface CategoryTemplate {
  id: number;
  user_id: number;
  name: string;
  default_percentage: number;
}

export interface CategoryTemplateFormData {
  name: string;
  default_percentage: number;
}
