import React from "react";
import { TodoState } from "../redux/ReduxTodos";

type Props = {
  todoName: string;
  markDone: () => void;
  todoState: TodoState;
};

function Todo(props: Props) {
  return (
    <div style={{ display: "flex" }}>
      <span> {props.todoName}</span>

      {props.todoState === "todo" ? (
        <button onClick={props.markDone}>mark as done</button>
      ) : (
        <span>()</span>
      )}
    </div>
  );
}

export default Todo;
