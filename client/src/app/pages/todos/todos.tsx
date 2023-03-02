import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import TasksList from "./list/tasks-list";
import NewTaskForm from "./newtask/new-task-form";
import { getTasks } from "./slice";
import SortingForm from "./sort/sort";

export const Todos = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <>
      <NewTaskForm />
      <SortingForm />
      <TasksList />
    </>
  );
};
