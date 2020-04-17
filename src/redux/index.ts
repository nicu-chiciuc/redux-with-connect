import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { TodoMessages, todosReducer, TodosStore } from "./ReduxTodos";

export type StoreType = {
  todos: TodosStore;
};

export type MessageTypes = TodoMessages;

const rootReducer = combineReducers<StoreType>({ todos: todosReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk));
