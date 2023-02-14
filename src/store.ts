import { Category, ITask, SortVariant, Status } from "./types.js";

class TasksStorage {
  private _data: ITask[];
  private currId = 1;

  constructor() {
    this._data = [];
  }

  getTaskByID(id: number): ITask | null {
    return this._data.find((task) => task.id === id) ?? null;
  }

  getTasks(): ITask[] {
    return this._data;
  }

  addTask(taskInfo: Omit<ITask, "id">): boolean {
    this._data.push({
      id: this.currId,
      ...taskInfo,
    });

    this.currId++;
    return true;
  }

  changeTask(id: number, status: Status): boolean {
    const currTask = this.getTaskByID(id)!;
    currTask.status = status;
    return true;
  }

  deleteTask(id: number): boolean {
    this._data.splice(
      this._data.findIndex((task: ITask) => task.id === id),
      1
    );
    return this.getTaskByID(id) ? false : true;
  }

  sortTasks(category: Category, v: SortVariant): void {
    switch (v) {
      case SortVariant.Ascending: {
        switch (category) {
          case Category.Date: {
            this._data.sort((t1: ITask, t2: ITask) => {
              return (
                (t1.date ? t1.date.getTime() : Number.MAX_SAFE_INTEGER) -
                (t2.date ? t2.date.getTime() : Number.MAX_SAFE_INTEGER)
              );
            });
            break;
          }
          case Category.Status: {
            this._data.sort((t1: ITask, t2: ITask) => t1.status - t2.status);
            break;
          }
          default:
            break;
        }
        break;
      }
      case SortVariant.Descending: {
        switch (category) {
          case Category.Date: {
            this._data.sort(
              (t1: ITask, t2: ITask) =>
                (t2.date ? t2.date.getTime() : Number.MAX_SAFE_INTEGER) -
                (t1.date ? t1.date.getTime() : Number.MAX_SAFE_INTEGER)
            );
            break;
          }
          case Category.Status: {
            this._data.sort((t1: ITask, t2: ITask) => t2.status - t1.status);
            break;
          }
          default:
            break;
        }
        break;
      }
    }
  }
}

export { TasksStorage };
