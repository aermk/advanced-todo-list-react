import React, { ChangeEvent, useState } from "react";
import "./App.css";
import { TextField } from "@mui/material";

type PropsEditableSpanType = {
  title: string;
  onChange(newValue: string): void;
};

export function EditableSpan(props: PropsEditableSpanType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title); // outside
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      value={title}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
    ></TextField>
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}

export default EditableSpan;
