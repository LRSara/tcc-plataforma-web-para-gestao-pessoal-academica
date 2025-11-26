
export type Priority = "alta" | "media" | "baixa";
export type Status = "nao_concluida" | "em_andamento" | "concluida";

export interface Task {
  id: number;
  title: string;
  due_date: string; // vem como string do backend (ex: "2025-10-10")
  priority: Priority;
  status: Status;
  user_id: number;
  description: string;
  created_at: string;
  updated_at: string;
}

