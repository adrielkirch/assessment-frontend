export interface Task {
  title: string;
  text: string;
  status: string;
  createdAt?: Date | string;
  statusMap?: {
    TODO: boolean;
    IN_PROGRESS: boolean;
    DONE: boolean;
  }
  [key: string]: any;
}

export interface TaskUpdate {
  _id: string;
  [key: string]: any
}
