import React from "react";
import { store } from "../redux";

type Props = {
  todoName: string;
};

function Todo(props: Props) {
  return <div>{props.todoName}</div>;
}

export default Todo;
