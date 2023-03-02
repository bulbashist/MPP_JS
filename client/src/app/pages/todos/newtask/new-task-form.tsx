import React from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { useAppDispatch } from "../../../hooks";
import { addTask } from "../slice";
import { Status } from "../types";

type TaskFormData = {
  description: string;
  date: string;
  file: FileList;
};

const NewTaskForm = () => {
  const { register, handleSubmit } = useForm<TaskFormData>();
  const dispatch = useAppDispatch();

  const addTaskHandler: SubmitHandler<TaskFormData> = (data) => {
    let fileData: Array<number> | null = null;
    const reader = new FileReader();

    reader.onload = () => {
      var arrayBuffer = reader.result as ArrayBuffer;
      fileData = Array.from(new Uint8Array(arrayBuffer));
      dispatch(
        addTask({
          ...data,
          file: fileData,
          status: Status.Queued,
        })
      );
    };

    if (data.file[0]) {
      reader.readAsArrayBuffer(data.file[0]);
    } else {
      dispatch(
        addTask({
          ...data,
          file: fileData,
          status: Status.Queued,
        })
      );
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit(addTaskHandler)}>
      <input type="text" className="input" {...register("description")} />
      <input type="date" className="input" {...register("date")} />
      <input type="file" {...register("file")} />
      <button type="submit">Create note</button>
    </form>
  );
};

export default NewTaskForm;

// form(action= "/" method="post" enctype="multipart/form-data" class="add-form")
//         input.input(type="text" name="description")
//         input.input(type="date" name="date")
//         input(type="file" name="file")
//         button(type="submit") Create note
