import React, { useState } from "react";
import Todo from "./Todo";
import {
  useConnectedTodos,
  withConnectedTodos,
  WithConnectedTodos,
} from "../redux/ReduxTodos";

/**
 * Props that will be received from the outside
 */
type OuterProps = { mainTitle: string };

/**
 * All the props that the component will have access to
 */
type Props = OuterProps & WithConnectedTodos;

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

export default withConnectedTodos(Todos);

// If we use a functional component

/**
 * It is very easy to switch the implementation from a class component that uses HOCs to a
 * functional component that uses hooks
 */
function TodosFn(props: OuterProps) {
  const [tempTodoTitle, setTodoTitle] = useState("");
  const todoProps = useConnectedTodos();

  const saveTempTodo = () => {
    todoProps.saveTodo(tempTodoTitle);

    setTodoTitle("");
  };

  const onTempInputChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(value.target.value);
  };

  return (
    <div>
      <h1>{props.mainTitle}</h1>
      {todoProps.mainTodos.map((todo) => (
        <Todo
          todoName={todo.title}
          todoState={todo.state}
          markDone={() => todoProps.markAsDone(todo.id)}
        />
      ))}
      <input type="text" value={tempTodoTitle} onChange={onTempInputChange} />
      <button onClick={saveTempTodo}>Save todo</button>
    </div>
  );
}
