import React, { ChangeEvent, useState } from "react";
import "./App.css";

type PropsType = {
  addTask(task: string, todolistId: string): void;
  todolistId: string;
};

export function Input(props: PropsType) {
  const [name, setName] = useState<string>("");
  const [isEmtyName, setEmptyMessage] = useState(false);

  const emptyMsg = <>{"This field is required"}</>;

  const buttonClick = (taskName: string) =>
    props.addTask(taskName, props.todolistId);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setName(e.target.value);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    e.key === "Enter" && onClick();
  };

  const onClick = (): void => {
    if (!!name) {
      buttonClick(name);
      isEmtyName && setEmptyMessage(false);
      setName("");
    } else {
      setEmptyMessage(true);
    }
  };

  return (
    <>
      <input value={name} onChange={onChange} onKeyDown={onKeyDown}></input>
      <button onClick={onClick}>+</button>
      {isEmtyName && emptyMsg}
    </>
  );
}

export default Input;
