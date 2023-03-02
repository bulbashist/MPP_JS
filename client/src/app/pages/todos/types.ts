export enum Status {
  Queued,
  Processing,
  Completed,
}

export enum Category {
  Date,
  Status,
}

export enum SortVariant {
  Ascending,
  Descending,
}

export interface ITask {
  id: number;
  date: string;
  file: Array<number> | null;
  status: Status;
  description: string;
}
