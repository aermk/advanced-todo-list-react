import React from "react";
import "./App.css";
import Todolist, { TaskType } from "./Todolist";
import AddItemForm from "./AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todolists-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";

export type FilterValuesType = "all" | "completed" | "active";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodoListType>>(
    (state) => state.todolists
  );

  console.log("todoLists", todoLists);

  const changeFilter = (value: FilterValuesType, todoListId: string) => {
    const action = changeTodolistFilterAC(todoListId, value);
    dispatch(action);
  };

  const removeTodoList = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatch(action);
  };

  const changeTodoListTitle = (todoListId: string, newTitle: string) => {
    const action = changeTodolistTitleAC(todoListId, newTitle);
    dispatch(action);
  };

  const addTodoList = (title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  };

  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit'>
            <Menu />
          </IconButton>
          <Typography>News</Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={5}>
          {todoLists &&
            todoLists.map((list) => {
              return (
                <Grid item>
                  <Paper style={{ padding: "10px" }}>
                    <Todolist
                      key={list.id}
                      id={list.id}
                      title={list.title}
                      changeFilter={changeFilter}
                      filter={list.filter}
                      removeTodoList={removeTodoList}
                      changeTodoListTitle={changeTodoListTitle}
                    />
                  </Paper>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
