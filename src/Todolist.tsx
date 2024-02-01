import React, { ChangeEvent } from "react";
import "./App.css";
import { FilterValuesType } from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import { AppRootState } from "./state/store";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  changeFilter(value: FilterValuesType, todoListId: string): void;
  filter: FilterValuesType;
  removeTodoList(todoListId: string): void;
  changeTodoListTitle(todoListId: string, newTitle: string): void;
};

export function Todolist(props: PropsType) {
  const dispatch = useDispatch();

  const tasks = useSelector<AppRootState, TaskType[]>(
    (state) => state.tasks[props.id]
  );

  console.log("tasks", tasks);

  const onClickAllButton = (): void => {
    props.changeFilter("all", props.id);
  };

  const onClickActiveButton = (): void => {
    props.changeFilter("active", props.id);
  };

  const onClickComplitedButton = (): void => {
    props.changeFilter("completed", props.id);
  };

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);
  };

  let filteredList = tasks;
  if (props.filter === "completed") {
    filteredList = filteredList.filter((task) => task.isDone === true);
  }
  if (props.filter === "active") {
    filteredList = filteredList.filter((task) => task.isDone === false);
  }

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

      <AddItemForm addItem={(title) => dispatch(addTaskAC(title, props.id))} />

      <div>
        {filteredList &&
          filteredList.map((task, index) => {
            const onChangeStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              dispatch(
                changeTaskStatusAC(task.id, e.currentTarget.checked, props.id)
              );
            };

            const onChangeTitleHandler = (newValue: string) => {
              dispatch(changeTaskTitleAC(task.id, newValue, props.id));
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
                <IconButton
                  onClick={() => dispatch(removeTaskAC(task.id, props.id))}
                >
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
