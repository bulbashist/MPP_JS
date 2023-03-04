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

  addTask(taskInfo: Omit<ITask, "id">): ITask {
    const task = {
      id: this.currId,
      ...taskInfo,
    };

    this._data.push(task);

    this.currId++;
    return task;
  }

  changeTask(id: number, status: Status): ITask | null {
    const currTask = this.getTaskByID(id);
    if (currTask) {
      currTask.status = status;
    }
    return currTask;
  }

  deleteTask(id: number): boolean {
    const index = this._data.findIndex((task: ITask) => task.id === id);
    if (index === -1) return false;

    this._data.splice(index, 1);
    return true;
  }
}

export { TasksStorage };
