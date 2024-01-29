import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistsReducer,
} from "./todolists-reducer";
import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";

test("correct todolist should be removed", () => {
  let todolist1 = v1();
  let todolist2 = v1();

  const startState: Array<TodoListType> = [
    { id: todolist1, title: "What to learn", filter: "all" },
    { id: todolist2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(startState, RemoveTodolistAC(todolist1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolist2);
});

test("correct todolist should be added", () => {
  let todolist1 = v1();
  let todolist2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    { id: todolist1, title: "What to learn", filter: "all" },
    { id: todolist2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(
    startState,
    AddTodolistAC(newTodolistTitle)
  );

  expect(endState.length).toBe(3);
  expect(endState[2].id).toBeTruthy();
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  let todolist1 = v1();
  let todolist2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    { id: todolist1, title: "What to learn", filter: "all" },
    { id: todolist2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(
    startState,
    ChangeTodolistTitleAC(todolist2, newTodolistTitle)
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let todolist1 = v1();
  let todolist2 = v1();

  let newFilter: FilterValuesType = "completed";

  const startState: Array<TodoListType> = [
    { id: todolist1, title: "What to learn", filter: "all" },
    { id: todolist2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(
    startState,
    ChangeTodolistFilterAC(todolist2, newFilter)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
