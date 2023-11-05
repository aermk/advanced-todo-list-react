import React, { ChangeEvent, useEffect, useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import Todolist, { TaskType } from './Todolist';


export type ValuesType = 'all' | 'complited' | 'active';

function App() {

  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [filter, setFilter] = useState<ValuesType>('all');

  useEffect(() => {
    console.log('tasks after adding/editing', tasks);
  }, [tasks]);

  const addName = (taskName: string) => {
    setTasks([{ id: v1(), title: taskName, isDone: false }, ...tasks]);
  }

  const removeTask = (id: string) => {
    let filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks);
  };

  const getFilteredList = (tasks: TaskType[]) => {
    let filteredList = tasks;
    if (filter === 'complited') {
      filteredList = tasks.filter((task) => task.isDone === true)
    }
    if (filter === 'active') {
      filteredList = tasks.filter((task) => task.isDone === false)
    }
    return filteredList;
  };

  const changeFilter = (value: ValuesType, tasks: TaskType[]) => {
    getFilteredList(tasks);
    setFilter(value);
  };

  const onChangeCheckbox = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const isChecked = event.target.checked;
    console.log('event.target', event.target.checked)
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isDone: isChecked };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <Todolist
        title={'Tasks'}
        tasks={getFilteredList(tasks)}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addName={addName}
        changeCheckbox={onChangeCheckbox} />
    </div>
  );
}

export default App;
