import React from "react";
import Todo from "./Todo";
import { connect } from "react-redux";

type Props = {
  todoNames: string[];
};

function Todos(props: Props) {
  return (
    <div>
      {props.todoNames.map((todoName) => (
        <Todo todoName={todoName} />
      ))}
    </div>
  );
}

export default connect((state) => ({
  todoNames: ["something", "other thing"],
}))(Todos);
