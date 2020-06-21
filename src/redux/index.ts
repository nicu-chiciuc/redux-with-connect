import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { TodoMessages, todosReducer, TodosStore } from "./ReduxTodos";
import {
  CheckboxesStore,
  checkboxReducer,
  CheckoxesMessages,
} from "./ReduxCheckboxes";

/**
 * The main type of the store
 */
export type StoreType = {
  todos: TodosStore;
  checkboxes: CheckboxesStore;
};

/**
 * A union type of all the possible messages
 */
export type MessageTypes = TodoMessages | CheckoxesMessages;

const rootReducer = combineReducers<StoreType>({
  todos: todosReducer,
  checkboxes: checkboxReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
