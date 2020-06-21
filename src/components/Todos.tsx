import React, { useState } from "react";
import Todo from "./Todo";
import { StoreType } from "../redux";
import {
  cancelTodoAction,
  markAsDoneAction,
  saveTodoAction,
  TodoType,
} from "../redux/ReduxTodos";
import { ExtractConnect, useConnect } from "../redux/bothConnect";

type Props = { mainTitle: string } & ExtractConnect<typeof connectedTodos>;

type State = {
  tempTodoTitle: string;
};

class Todos extends React.Component<Props, State> {
  state: State = {
    tempTodoTitle: "",
  };

  saveTempTodo = () => {
    this.props.saveTodo(this.state.tempTodoTitle);

    this.setState({
      tempTodoTitle: "",
    });
  };

  onTempInputChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ tempTodoTitle: value.target.value });
  };

  render() {
    const { props } = this;

    return (
      <div>
        <h1>{props.mainTitle}</h1>
        {props.mainTodos.map((todo) => (
          <Todo
            todoName={todo.title}
            todoState={todo.state}
            markDone={() => props.markAsDone(todo.id)}
          />
        ))}

        <h2>Cancelled todos</h2>
        {props.cancelledTodos.map((todo) => (
          <Todo
            todoName={todo.title}
            todoState={todo.state}
            markDone={() => props.markAsDone(todo.id)}
          />
        ))}

        <input
          type="text"
          value={this.state.tempTodoTitle}
          onChange={this.onTempInputChange}
        />
        <button onClick={this.saveTempTodo}>Save todo</button>
      </div>
    );
  }
}

const connectedTodos = useConnect(
  ({ todos: { todos } }: StoreType) => ({
    mainTodos: todos.filter((todo) => todo.state !== "cancelled"),
    cancelledTodos: todos.filter((todo) => todo.state === "cancelled"),
  }),
  {
    markAsDone: markAsDoneAction,
    cancelTodo: cancelTodoAction,
    saveTodo: saveTodoAction,
  }
);

export default connectedTodos(Todos);
