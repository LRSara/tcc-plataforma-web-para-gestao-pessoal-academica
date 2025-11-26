export type Priority = "alta" | "media" | "baixa";
export type Status = "nao_concluida" | "em_andamento" | "concluida";

export interface TaskResponse {
  title: string;
  due_date: string;
  priority: Priority;
  status: Status;
  description: string;
};