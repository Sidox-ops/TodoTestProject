interface TodoModel {
  text: string;
  number: number;
  id: string;
  complete: boolean;
  createdAt?: string;
  code?: string;
}

export enum filter {
  all = "all",
  active = "active",
  completed = "completed",
}

export default TodoModel;
