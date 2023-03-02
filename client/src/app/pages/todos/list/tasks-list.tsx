import React, { MouseEvent } from "react";
import { useAppDispatch } from "../../../hooks";
import { changeTask, deleteTask } from "../slice";
import { ITask, Status } from "../types";
import { useFilteredTasks } from "./useFilteredTasks";

const TasksList = () => {
  const tasks = useFilteredTasks();
  const dispatch = useAppDispatch();

  const inputHandler = (e: MouseEvent<HTMLDivElement>, id: number) => {
    const name = (e.target as HTMLElement).tagName.toLowerCase();
    if (name !== "input") return;

    if ((e.target as HTMLInputElement).name.includes("status")) {
      dispatch(
        changeTask({
          id,
          status: Number((e.target as HTMLInputElement).value),
        })
      );
    }
  };

  const downloadHandler = (task: ITask) => {
    if (task.file) {
      const file = new Blob([new Uint8Array(task.file)], {
        type: "application/pdf",
      });
      return window.URL.createObjectURL(file);
    } else return "";
  };

  const deleteHandler = (id: number) => {
    dispatch(deleteTask(id));
  };

  return (
    <ul className="tasks">
      {tasks.map((task: ITask) => {
        return (
          <li
            id="status"
            className={`task task-status-${task.status}`}
            key={task.id}
          >
            <div>
              <h4>Description: {task.description}</h4>
              <p>Date: {task.date ? task.date : "No date"}</p>
              <div
                className="status-container"
                onClick={(e) => inputHandler(e, task.id)}
              >
                <label>
                  Queued:
                  <input type="radio" name="status" value={Status.Queued} />
                </label>
                <label>
                  Processing:
                  <input type="radio" name="status" value={Status.Processing} />
                </label>
                <label>
                  Completed:
                  <input type="radio" name="status" value={Status.Completed} />
                </label>
              </div>
              <div>
                <button className="dload-btn">
                  {task.file ? (
                    <a
                      href={downloadHandler(task)}
                      className="dload-file"
                      download="innocent-file"
                    >
                      Download PDF 🡇
                    </a>
                  ) : (
                    <p>No file</p>
                  )}
                </button>
              </div>
            </div>
            <div>
              <button
                className="delete-btn"
                onClick={(e) => deleteHandler(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TasksList;
