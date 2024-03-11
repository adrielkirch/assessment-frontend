export interface Task {
  title: string;
  text: string;
  status: string;
  createdAt?: Date;
  [key: string]: any;
}
