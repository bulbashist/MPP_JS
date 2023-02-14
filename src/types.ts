import { UploadedFile } from "express-fileupload";

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
  date: Date | null;
  file?: Uint8Array | null | undefined;
  status: Status;
  description?: string;
}
