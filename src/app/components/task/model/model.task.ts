export interface Task {
  title: string;
  text: string;
  status: string;
  createdAt?: Date;
  statusMap?:{
    TODO: boolean;
    IN_PROGRESS: boolean;
    DONE: boolean;
  };
  [key: string]: any;
}
