import React, { ChangeEvent } from "react";
import "./App.css";
import { FilterValuesType } from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

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
        <IconButton onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h3>

      <AddItemForm addItem={addTask} />

      <div>
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
              <div key={index}>
                <Checkbox
                  checked={task.isDone}
                  onChange={onChangeStatusHandler}
                />
                <EditableSpan
                  title={task.title}
                  onChange={onChangeTitleHandler}
                />
                <IconButton onClick={() => props.removeTask(task.id, props.id)}>
                  <Delete />
                </IconButton>
              </div>
            );
          })}
      </div>
      <div>
        <Button
          variant={props.filter === "all" ? "outlined" : "text"}
          onClick={onClickAllButton}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "outlined" : "text"}
          onClick={onClickActiveButton}
        >
          Active
        </Button>
        <Button
          onClick={onClickComplitedButton}
          variant={props.filter === "completed" ? "outlined" : "text"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}

export default Todolist;
