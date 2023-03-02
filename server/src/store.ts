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
    this._data.splice(
      this._data.findIndex((task: ITask) => task.id === id),
      1
    );
    return this.getTaskByID(id) ? false : true;
  }
}

export { TasksStorage };
