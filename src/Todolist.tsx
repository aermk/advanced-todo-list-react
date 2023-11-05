import React, { useState, ChangeEvent } from 'react';
import './App.css';
import { ValuesType } from './App'
import Input from './Input';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks?: TaskType[],
    removeTask(id: string): void;
    changeFilter(value: ValuesType, tasks?: TaskType[]): void;
    addName(task: string): void;
    changeCheckbox(event: ChangeEvent<HTMLInputElement>, id: string): void;
}

export function Todolist(props: PropsType) {

    const generateUniqKey = (i: number) => (Date.now() + i).toString();

    const onClickAllButton = (): void => {
        props.changeFilter("all", props.tasks);
    };

    const onClickActiveButton = (): void => {
        props.changeFilter('active', props.tasks);
    };

    const onClickComplitedButton = (): void => {
        props.changeFilter('complited', props.tasks);
    };


    return (
        <div>
            <h3>{props.title}</h3>
            <Input addName={props.addName} />
            <ul>
                {props.tasks && props.tasks.map((task, index) =>

                    <li key={generateUniqKey(index)}>
                        <input type="checkbox" checked={task.isDone} onChange={(e) => props.changeCheckbox(e, task.id)} />
                        {task.title}
                        <button onClick={() => props.removeTask(task.id)}>x</button>
                    </li>
                )}</ul>
            <div>
                <button onClick={onClickAllButton}>All</button>
                <button onClick={onClickActiveButton}>Active</button>
                <button onClick={onClickComplitedButton}>Complited</button>
            </div>
        </div>
    )
}

export default Todolist;