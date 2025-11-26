import { Subject } from "./Subject";

export interface Note {
  id: number;
  title: string;
  content: string;
  subject: Subject;
  is_favorite: boolean; 
  user_id: string;
  created_at: string;
  updated_at: string;
}
