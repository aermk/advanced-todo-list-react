import React, { ChangeEvent, useEffect, useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import Todolist, { TaskType } from "./Todolist";

export type ValuesType = "all" | "completed" | "active";
type TodoListType = {
  id: string;
  title: string;
  filter: ValuesType;
};

function App() {
  const addTask = (taskName: string, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    tasksObj[todolistId] = [
      { id: v1(), title: taskName, isDone: false },
      ...tasks,
    ];
    setTasksObj({ ...tasksObj });
  };

  const removeTask = (id: string, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasksObj({ ...tasksObj });
  };

  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasksObj({ ...tasksObj });
    }
  };

  const changeFilter = (
    value: ValuesType,
    todoListId: string,
    tasks: TaskType[]
  ) => {
    let todolist = todoLists.find((tl) => tl.id === todoListId);
    if (todolist) {
      todolist.filter = value;
      setTodoList([...todoLists]);
    }
  };

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todoLists, setTodoList] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "What to learn?", filter: "all" },
    { id: todolistId2, title: "What to buy?", filter: "all" },
  ]);

  let [tasksObj, setTasksObj] = useState({
    [todolistId1]: [
      { id: v1(), title: "html", isDone: false },
      { id: v1(), title: "css", isDone: true },
      { id: v1(), title: "react", isDone: false },
      { id: v1(), title: "mobx", isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: "banana", isDone: false },
      { id: v1(), title: "milk", isDone: true },
    ],
  });

  const removeTodoList = (todolistId: string) => {
    let filteredTodoList = todoLists.filter((tl) => tl.id !== todolistId);
    setTodoList(filteredTodoList);
    delete tasksObj[todolistId];
    setTasksObj({ ...tasksObj });
  };

  return (
    <div className="App">
      {todoLists &&
        todoLists.map((list, index) => {
          let filteredList = tasksObj[list.id];
          if (list.filter === "completed") {
            filteredList = filteredList.filter((task) => task.isDone === true);
          }
          if (list.filter === "active") {
            filteredList = filteredList.filter((task) => task.isDone === false);
          }
          return (
            <Todolist
              key={list.id}
              id={list.id}
              title={list.title}
              tasks={filteredList}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              filter={list.filter}
              changeTaskStatus={changeStatus}
              removeTodoList={removeTodoList}
            />
          );
        })}
    </div>
  );
}

export default App;
