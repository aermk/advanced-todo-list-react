import React, { ChangeEvent, useState } from "react";
import "./App.css";
import { Button, TextField } from "@mui/material";

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
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  };

  return (
    <div>
      <TextField
        variant='outlined'
        label='Type value'
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        error={!!error} //????
        helperText={error}
      ></TextField>
      <Button onClick={addTask} variant='contained' color='primary'>
        +
      </Button>
    </div>
  );
}

export default AddItemForm;
