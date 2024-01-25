import React, { useState, ChangeEvent } from "react";
import "./App.css";
import { FilterValuesType } from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
  changeFilter(
    value: FilterValuesType,
    todoListId: string,
    tasks?: TaskType[]
  ): void;
  addTask(task: string, todoListId: string): void;
  filter: FilterValuesType;
  changeTaskStatus(taskId: string, isDone: boolean, todolistId: string): void;
  changeTaskTitle(taskId: string, newTitle: string, todolistId: string): void;
  removeTodoList(todoListId: string): void;
  changeTodoListTitle(todoListId: string, newTitle: string): void;
};

export function Todolist(props: PropsType) {
  const onClickAllButton = (): void => {
    props.changeFilter("all", props.id, props.tasks); ///???? tasks
  };

  const onClickActiveButton = (): void => {
    props.changeFilter("active", props.id, props.tasks); ///???? tasks
  };

  const onClickComplitedButton = (): void => {
    props.changeFilter("completed", props.id, props.tasks); ///???? tasks
  };

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        <EditableSpan
          title={props.title}
          onChange={changeTodoListTitle}
        ></EditableSpan>
        <button onClick={removeTodoList}>x</button>
      </h3>

      <AddItemForm addItem={addTask} />

      <ul>
        {props.tasks &&
          props.tasks.map((task, index) => {
            const onChangeStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              props.changeTaskStatus(
                task.id,
                e.currentTarget.checked,
                props.id
              );
            };

            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(task.id, newValue, props.id);
            };
            return (
              <li key={index}>
                <input
                  type='checkbox'
                  checked={task.isDone}
                  onChange={onChangeStatusHandler}
                />
                <EditableSpan
                  title={task.title}
                  onChange={onChangeTitleHandler}
                />
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
