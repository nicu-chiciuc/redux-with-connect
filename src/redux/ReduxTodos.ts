import { randomId, unreachable } from "../utils";

export type TodosStore = {
  todos: TodoType[];
};

export type TodoState = "done" | "cancelled" | "todo";

export type TodoType = {
  id: string;
  state: TodoState;
  title: string;
};

export type TodoMessages =
  | {
      type: "TODOS/ADD_TODO";
      title: string;
    }
  | {
      type: "TODOS/MARK_AS_DONE";
      id: string;
    }
  | {
      type: "TODOS/CANCEL_TODO";
      id: string;
    };

const initialTodos: TodoType[] = [
  {
    id: randomId(),
    title: "Buy some bread",
    state: "todo",
  },
  {
    id: randomId(),
    title: "Buy some milk",
    state: "todo",
  },
  {
    id: randomId(),
    title: "Water the plants",
    state: "done",
  },
  {
    id: randomId(),
    title: "Take the dog for a walk",
    state: "done",
  },
  {
    id: randomId(),
    title: "Take the trash out",
    state: "cancelled",
  },
];

export function todosReducer(
  store: TodosStore = { todos: initialTodos },
  message: TodoMessages
): TodosStore {
  switch (message.type) {
    case "TODOS/ADD_TODO": {
      console.log(message);
      const newTodo: TodoType = {
        id: randomId(),
        state: "todo",
        title: message.title,
      };

      return {
        todos: [...store.todos, newTodo],
      };
    }

    case "TODOS/CANCEL_TODO": {
      const newTodos = store.todos.map(
        (todo): TodoType => {
          if (todo.id !== message.id) return todo;

          return {
            ...todo,
            state: "cancelled",
          };
        }
      );

      return {
        todos: newTodos,
      };
    }

    case "TODOS/MARK_AS_DONE": {
      const newTodos = store.todos.map(
        (todo): TodoType => {
          if (todo.id !== message.id) return todo;

          return {
            ...todo,
            state: "done",
          };
        }
      );

      return {
        todos: newTodos,
      };
    }

    default: {
      unreachable(message);
      return store;
    }
  }
}

// Actions
export function markAsDoneAction(id: string): TodoMessages {
  return {
    type: "TODOS/MARK_AS_DONE",
    id,
  };
}

export function saveTodoAction(title: string): TodoMessages {
  return {
    type: "TODOS/ADD_TODO",
    title,
  };
}

export function cancelTodoAction(id: string): TodoMessages {
  return {
    type: "TODOS/CANCEL_TODO",
    id,
  };
}
