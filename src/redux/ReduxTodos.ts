export type TodosStore = {};

export type TodoMessages = {
  type: "TODOS/NOTHING";
};

export function todosReducer(
  store: TodosStore = {},
  message: TodoMessages
): TodosStore {
  switch (message.type) {
    case "TODOS/NOTHING":
      return {};
    default:
      return store;
  }
}
