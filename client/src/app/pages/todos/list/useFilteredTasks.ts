import { useAppSelector } from "../../../hooks";
import { Category, SortVariant, ITask } from "../types";

export const useFilteredTasks = () => {
  const sortTasks = (
    tasks: ITask[],
    category: Category,
    v: SortVariant
  ): void => {
    switch (v) {
      case SortVariant.Ascending: {
        switch (category) {
          case Category.Date: {
            tasks.sort((t1: ITask, t2: ITask) => {
              return (
                (t1.date
                  ? new Date(t1.date).getTime()
                  : Number.MAX_SAFE_INTEGER) -
                (t2.date
                  ? new Date(t2.date).getTime()
                  : Number.MAX_SAFE_INTEGER)
              );
            });
            break;
          }
          case Category.Status: {
            tasks.sort((t1: ITask, t2: ITask) => t1.status - t2.status);
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
            tasks.sort(
              (t1: ITask, t2: ITask) =>
                (t2.date
                  ? new Date(t2.date).getTime()
                  : Number.MAX_SAFE_INTEGER) -
                (t1.date
                  ? new Date(t1.date).getTime()
                  : Number.MAX_SAFE_INTEGER)
            );
            break;
          }
          case Category.Status: {
            tasks.sort((t1: ITask, t2: ITask) => t2.status - t1.status);
            break;
          }
          default:
            break;
        }
        break;
      }
    }
  };

  let { tasks, category, order } = {
    ...useAppSelector((state) => state.tasks),
  };

  tasks = [...tasks];
  sortTasks(tasks, category, order);

  return tasks;
};
