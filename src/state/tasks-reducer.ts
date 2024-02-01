import { v1 } from "uuid";
import { TaskStateType } from "../AppWithRedux";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  todolistId1,
  todolistId2,
} from "./todolists-reducer";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  taskId: string;
  todolistId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  title: string;
  todolistId: string;
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  isDone: boolean;
  todolistId: string;
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  title: string;
  todolistId: string;
};

export type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TaskStateType = {
  [todolistId1]: [
    // [todolistId1] тк используем v1
    { id: v1(), title: "html", isDone: false },
    { id: v1(), title: "css", isDone: true },
    { id: v1(), title: "react", isDone: false },
    { id: v1(), title: "mobx", isDone: true },
  ],
  [todolistId2]: [
    { id: v1(), title: "banana", isDone: false },
    { id: v1(), title: "milk", isDone: true },
  ],
};

export const tasksReducer = (
  state: TaskStateType = initialState,
  action: ActionsType
): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    }
    case "ADD-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTask = { id: v1(), title: action.title, isDone: false };
      const newTasks = [newTask, ...tasks];
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case "CHANGE-TASK-STATUS": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = tasks.map((task) =>
        task.id === action.taskId ? { ...task, isDone: action.isDone } : task
      );
      return stateCopy;
    }
    case "CHANGE-TASK-TITLE": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = tasks.map((task) =>
        task.id === action.taskId ? { ...task, title: action.title } : task
      );
      return stateCopy;
    }
    case "ADD-TODOLIST": {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = [];
      return stateCopy;
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }

    default:
      // throw new Error("Undefined action type");
      return state;
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return {
    type: "REMOVE-TASK",
    taskId: taskId,
    todolistId: todolistId,
  };
};

export const addTaskAC = (
  title: string,
  todolistId: string
): AddTaskActionType => {
  return {
    type: "ADD-TASK",
    title: title,
    todolistId: todolistId,
  };
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
): ChangeTaskStatusActionType => {
  return {
    type: "CHANGE-TASK-STATUS",
    taskId: taskId,
    isDone: isDone,
    todolistId: todolistId,
  };
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): ChangeTaskTitleActionType => {
  return {
    type: "CHANGE-TASK-TITLE",
    taskId: taskId,
    title: title,
    todolistId: todolistId,
  };
};
