import React, { useState, ChangeEvent } from "react";
import "./App.css";
import { ValuesType } from "./App";
import Input from "./Input";
import { timeLog } from "console";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks?: TaskType[];
  removeTask(id: string, todoListId: string): void;
  changeFilter(value: ValuesType, todoListId: string, tasks?: TaskType[]): void;
  addTask(task: string, todoListId: string): void;
  filter: ValuesType;
  changeTaskStatus(taskId: string, isDone: boolean, todolistId: string): void;
  removeTodoList(todoListId: string): void;
};

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(title.trim(), props.id);
      setTitle("");
    } else {
      setError("Field is required");
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyDownHandler = (e: any) => {
    if (e.charCode === 13) {
      addTask();
    }
  };
  const onClickAllButton = (): void => {
    props.changeFilter("all", props.id, props.tasks);
  };

  const onClickActiveButton = (): void => {
    props.changeFilter("active", props.id, props.tasks);
  };

  const onClickComplitedButton = (): void => {
    props.changeFilter("completed", props.id, props.tasks);
  };

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  return (
    <div>
      <h3>
        {props.title}
        <button onClick={removeTodoList}>x</button>
      </h3>
      <input
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={error ? "error" : ""}
      ></input>
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
      {/* <Input addTask={props.addTask} todolistId={props.id} /> */}

      <ul>
        {props.tasks &&
          props.tasks.map((task, index) => {
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(
                task.id,
                e.currentTarget.checked,
                props.id
              );
            };
            return (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={onChangeHandler}
                />
                {task.title}
                <button onClick={() => props.removeTask(task.id, props.id)}>
                  x
                </button>
              </li>
            );
          })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onClickAllButton}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onClickActiveButton}
        >
          Active
        </button>
        <button
          onClick={onClickComplitedButton}
          className={props.filter === "completed" ? "active-filter" : ""}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default Todolist;
