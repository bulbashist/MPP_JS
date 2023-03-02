import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import { Category, ITask, SortVariant } from "./types";
import axios from "axios";

const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (): Promise<ITask[]> => {
    const res = await axios.get<ITask[]>("http://localhost:1337/api/tasks");
    return res.data;
  }
);

const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: Omit<ITask, "id">): Promise<ITask> => {
    const res = await axios.post<ITask>(
      "http://localhost:1337/api/tasks",
      {
        task: JSON.stringify(task),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

const changeTask = createAsyncThunk(
  "tasks/changeTask",
  async (data: Pick<ITask, "id" | "status">): Promise<ITask> => {
    const res = await axios.put<ITask>(
      `http://localhost:1337/api/tasks/${data.id}`,
      {
        status: JSON.stringify(data.status),
      }
    );
    return res.data;
  }
);

const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: number): Promise<number> => {
    const res = await axios.delete<number>(
      `http://localhost:1337/api/tasks/${id}`
    );
    return res.data;
  }
);

type TasksState = {
  tasks: ITask[];
  category: Category;
  order: SortVariant;
};

const tasksSlice: Slice<TasksState> = createSlice({
  name: "tasks",
  initialState: {
    tasks: [] as ITask[],
    category: Category.Date,
    order: SortVariant.Ascending,
  } as TasksState,
  reducers: {
    changeCategoryFilter: (
      state: TasksState,
      action: PayloadAction<Category>
    ) => {
      state.category = action.payload;
    },
    changeSortFilter: (
      state: TasksState,
      action: PayloadAction<SortVariant>
    ) => {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        getTasks.fulfilled,
        (state: TasksState, action: PayloadAction<ITask[]>) => {
          state.tasks = action.payload;
        }
      )
      .addCase(
        addTask.fulfilled,
        (state: TasksState, action: PayloadAction<ITask>) => {
          state.tasks.unshift(action.payload);
        }
      )
      .addCase(
        changeTask.fulfilled,
        (state: TasksState, action: PayloadAction<ITask>) => {
          const copy = [...state.tasks];
          const index = copy.findIndex((task) => task.id === action.payload.id);
          copy[index] = action.payload;
          return {
            ...state,
            tasks: copy,
          };
        }
      )
      .addCase(
        deleteTask.fulfilled,
        (state: TasksState, action: PayloadAction<number>) => {
          const index = state.tasks.findIndex(
            (task) => task.id === action.payload
          );
          state.tasks.splice(index, 1);
        }
      ),
});

export { getTasks, addTask, changeTask, deleteTask };
export const { changeCategoryFilter, changeSortFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
