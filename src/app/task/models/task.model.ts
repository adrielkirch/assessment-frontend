import { TaskStatus } from "./task-status.enum";

export interface Task {
  id: string;
  title: string;
  text: string;
  status: TaskStatus;
  createdAt: Date;
}