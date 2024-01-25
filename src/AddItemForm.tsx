import React, { ChangeEvent, useState } from "react";
import "./App.css";

type PropsType = {
  addItem(task: string): void;
};

export function AddItemForm(props: PropsType) {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim());
      setTitle("");
    } else {
      setError("Field is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyDownHandler = (e: any) => {
    if (e.charCode === 13) {
      addTask();
    }
  };

  return (
    <div>
      <input
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={error ? "error" : ""}
      ></input>
      <button onClick={addTask}>+</button>
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
}

export default AddItemForm;
