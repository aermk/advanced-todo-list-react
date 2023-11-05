import React, { ChangeEvent, useState } from 'react';
import './App.css';

// добавить styled components 
// модалка на удаление задачи ?? или
// задача не удаляется, а архивируется и хранится в специальном месте

// выполнено / не выполнено
// чекбокс дан или не дан - кнопка
// переместить add функцию на уровень ниже

type PropsType = {
    addName(task: string): void
}

export function Input(props: PropsType) {

    const [name, setName] = useState<string>('');
    const [isEmtyName, setEmptyMessage] = useState(false);


    const emptyMsg = (
        <>
            {('This field is required')}
        </>
    );

    const buttonClick = (taskName: string) => props.addName(taskName);

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => setName(e.target.value);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        e.key === 'Enter' && onClick();
    };

    const onClick = (): void => {
        if (!!name) {
            buttonClick(name);
            isEmtyName && setEmptyMessage(false);
            setName('');
        } else {
            setEmptyMessage(true);
        }
    };

    const handleTimeChange = (time: any) => {
        console.log('Выбранное время:', time);
    };

    return (
        <>
            <input value={name}
                onChange={onChange}
                onKeyDown={onKeyDown}
            >
            </input>
            <button onClick={onClick}>+</button>
            {isEmtyName && emptyMsg}
        </>
    );
}

export default Input;